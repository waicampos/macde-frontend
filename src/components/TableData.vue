<template>
  <v-data-table
    :headers="headers"
    :items="data_file"
    :sort-by="[{ key: 'date', order: 'asc' }]"
    class="elevation-4"
  >
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
                      :initial="item.value"
                      v-if="item.name !== 'date'"
                      input-placeholder='dd/mm/yyyy'
                      maxFractionDigits='12'
                      lang="pt-BR"
                      :label="item.label"
                      :suffix= "item.suffix"
                      @changedValue="changedInputNumberValue($event, item.value, index)"
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
  import InputNumberFormatted from '@/components/InputNumberFormatted.vue'
  import InputDatePicker from '@/components/InputDatePicker.vue'


  export default {
    components: {InputNumberFormatted, InputDatePicker},
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          title: 'Data',
          align: 'start',
          sortable: true,
          key: 'date',
        },
        { title: 'Demanda de Ponta', key: 'peak_demand' },
        { title: 'Demanda Fora de Ponta', key: 'off_peak_demand' },
        { title: 'Energia de Ponta', key: 'peak_energy' },
        { title: 'Energia Fora de Ponta', key: 'off_peak_energy' },
        { title: 'Opções', key: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: [
        {name: 'date', value: '', label: 'Data', suffix: ""},
        {name: 'peak_demand', value: 0, label: 'Demanda de Ponta', suffix: "kW"},
        {name: 'off_peak_demand', value: 0, label: 'Demanda de Fora Ponta', suffix: "kW"},
        {name: 'peak_energy', value: 0, label: 'Energia de Ponta', suffix: "kWh"},
        {name: 'off_peak_energy', value: 0, label: 'Energia Fora de Ponta', suffix: "kWh"}        
      ],
      defaultItem: [
        {name: 'date', value: '', label: 'Data', suffix: ""},
        {name: 'peak_demand', value: 0, label: 'Demanda de Ponta', suffix: "kW"},
        {name: 'off_peak_demand', value: 0, label: 'Demanda de Fora Ponta', suffix: "kW"},
        {name: 'peak_energy', value: 0, label: 'Energia de Ponta', suffix: "kWh"},
        {name: 'off_peak_energy', value: 0, label: 'Energia Fora de Ponta', suffix: "kWh"}        
      ],
    }),
    computed: {
      ...mapGetters('data_history', {
        data_file: 'get_user_data_history'
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
      },
    },

    methods: {
      changedInputNumberValue(e, param, index) {
        this.editedItem[index].value = e;
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
          obj[name] = this.editedItem[i].value     
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

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {''
        val || this.closeDelete()
      },
    },
  }
</script>
