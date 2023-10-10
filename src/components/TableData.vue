<template>
  <v-data-table
    :headers="headers"
    :items="data_file"
    :sort-by="[{ key: 'date', order: 'asc' }]"
    :items-per-page-options="items_per_page"
    items-per-page=12
    items-per-page-text="Itens por Página:"
    class="elevation-4"
  >
    <template v-slot:[`item.date`]="{ item }">         
      <span :class="defineClassTextColor(item.columns.date)"> {{ date2string(item.columns.date) }} </span>
    </template>

    <template
      v-for="name in this.get_selected_simulation_type.meas" v-slot:[`item.${name}`]="{ item }" :key="name"
    >        

      <span :class="defineClassTextColor(item.columns.date)"> {{ new Intl.NumberFormat("pt-BR").format(item.columns[name]) }} </span>
    </template>	  

    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Histórico</v-toolbar-title>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="props"
            >
            <v-icon
              size="large"
              class="me-2"
              @click="editItem(item.raw)"
            >
              mdi-plus-circle
            </v-icon>
              Adicionar Item
            </v-btn>  
            <v-btn
              v-if="data_file.length"
              color="red"
              dark
              class="mb-2"
              @click="download_table_data()"
            >
            <v-icon
              size="large"
              class="me-2"
            >
              mdi-download-circle
            </v-icon>
              Baixar Tabela
            </v-btn>            
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>                  
                  <v-col v-for="(item, index) in editedItem" :key="index"
                    cols="12"
                    sm="6"
                  >
                    <InputNumberFormatted  
                      v-model="item.value"
                      v-if="item.name !== 'date'"                      
                      maxFractionDigits='12'
                      lang="pt-BR"
                      :label="item.label"
                      :suffix= "item.suffix"
                    />

                    <InputDatePicker 
                      v-else
                      v-model="item.value"
                      :label="item.label"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Tem certeza que deseja deletar este item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        size="small"
        class="me-2"
        color="green-darken-4"
        @click="editItem(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        color="red-accent-4"
        @click="deleteItem(item.raw)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        disabled
        size="small"
        class="ma-2"
        color="green-darken-2"
        icon="mdi-table-alert"
      ></v-btn>
      <p class="text-medium-emphasis">
        Nenhum dado disponível. Por favor, carregue um arquivo de dados ou preencha a tabela manualmente.
      </p>
    </template>
  </v-data-table>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { format as fns_format, isAfter as fns_isAfter } from 'date-fns'
  import fileDownload from 'js-file-download'
  import InputNumberFormatted from '@/components/InputNumberFormatted.vue'
  import InputDatePicker from '@/components/InputDatePicker.vue'
  import { TIME_SERIES_DATE_FORMAT, MEAS_INFO, change_names_en2pt, ITEMS_PER_PAGE_TABLE } from '@/assets/files/consts'

  export default {
    components: {InputNumberFormatted, InputDatePicker},
    data: () => ({
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: [],
      defaultItem: [], 
      items_per_page: ITEMS_PER_PAGE_TABLE  
    }),
    computed: {
      ...mapGetters('data_history', {
        data_file: 'get_user_data_history'
      }),

      ...mapGetters('data_parameters', {
          get_selected_simulation_type: 'get_selected_simulation_type',
          get_has_photovoltaic_system: 'get_has_photovoltaic_system',
          get_date_installation_photovoltaic_system: 'get_date_installation_photovoltaic_system',
      }),

      headers() {
        let opt = [{title: 'Data', align: 'start', sortable: true, key: 'date'}]
        this.get_selected_simulation_type.meas.forEach(key => opt.push(MEAS_INFO[key]))
        opt.push({title: 'Opções', key: 'actions', sortable: false })

        return opt
      },

      formTitle () {
        return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
      },
    },

    methods: {
      mountEditedItem() {
        const base = [
        {name: 'demand', value: 0, label: 'Demanda', suffix: "kW"},
        {name: 'peak_demand', value: 0, label: 'Demanda de Ponta', suffix: "kW"},
        {name: 'off_peak_demand', value: 0, label: 'Demanda de Fora Ponta', suffix: "kW"},
        {name: 'peak_energy', value: 0, label: 'Energia de Ponta', suffix: "kWh"},
        {name: 'off_peak_energy', value: 0, label: 'Energia Fora de Ponta', suffix: "kWh"}        
      ]
        let opt = [{name: 'date', value: '', label: 'Data', suffix: ""}]
        this.get_selected_simulation_type.meas.forEach(key => opt.push(base.filter(item => item.name === key)[0]))
        this.editedItem = opt
      },

      mountDefaultItem() {
        const base = [
          {name: 'date', value: '', label: 'Data', suffix: ""},
          {name: 'demand', value: 0, label: 'Demanda', suffix: "kW"},
          {name: 'peak_demand', value: 0, label: 'Demanda de Ponta', suffix: "kW"},
          {name: 'off_peak_demand', value: 0, label: 'Demanda de Fora Ponta', suffix: "kW"},
          {name: 'peak_energy', value: 0, label: 'Energia de Ponta', suffix: "kWh"},
          {name: 'off_peak_energy', value: 0, label: 'Energia Fora de Ponta', suffix: "kWh"}        
        ]
        let opt = [{name: 'date', value: '', label: 'Data', suffix: ""}]
        this.get_selected_simulation_type.meas.forEach(key => opt.push(base.filter(item => item.name === key)[0]))
        this.defaultItem = opt
      },

      download_table_data() {        
        let dt = this.data_file.map(item => {
          let new_obj = {}   
          Object.keys(item).forEach(key => {
            if(key != 'date') {
              Object.assign(new_obj, {[key]: item[key].toString().replace(/\./g, ",")})
            } else {            
              Object.assign(new_obj, {[key]: this.date2string(item.date)})
            }
          })      
          return new_obj    
        })                   
        fileDownload(this.$papa.unparse(change_names_en2pt(dt), {delimiter: ";",}), 'dados_tabela_historico_macde.csv')
      },

      defineClassTextColor(dt) {
        return this.get_has_photovoltaic_system && fns_isAfter(this.get_date_installation_photovoltaic_system, dt) ? 'text-disabled' : ''
      },

      date2string(dt) {
        return fns_format(dt, TIME_SERIES_DATE_FORMAT)
      },

      editItem (item) {
        this.editedIndex = this.data_file.indexOf(item)
        
        for(var i in this.editedItem){
          let name = this.editedItem[i].name
          this.editedItem[i].value = item[name]                
        }
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.data_file.indexOf(item)
        this.editedItem = {...item}
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.$store.dispatch('data_history/delete_item_user_data_history_by_id', this.editedIndex)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = JSON.parse(JSON.stringify(this.defaultItem))
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem =JSON.parse(JSON.stringify(this.defaultItem))      
          this.editedIndex = -1
        })
      },

      save () {
        let obj = {}
        for(var i in this.editedItem){
          let name = this.editedItem[i].name
          obj[name] = typeof this.editedItem[i].value === 'string' ? Number(this.editedItem[i].value.replace(',', '.')) : this.editedItem[i].value
        }
        if (this.editedIndex > -1) {
          let payload = {'index': this.editedIndex, 'value': obj}
          this.$store.dispatch('data_history/set_item_user_data_history', payload)
        } else {
            this.$store.dispatch('data_history/add_user_data_history', obj)
        }
        this.close()
      },
    },

    mounted() {
      this.mountEditedItem()
      this.mountDefaultItem()
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {''
        val || this.closeDelete()
      },
      get_selected_simulation_type: {
          handler() {                    
            this.mountEditedItem()
            this.mountDefaultItem()              
          },
          deep: true,
          imediate: true,
      },
    },
  }
</script>
