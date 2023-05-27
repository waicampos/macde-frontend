<template>
<ul v-for="(item, index) in editedItem" :key="index">
  <li>{{item.label}}</li>
  <li>{{item.name}}</li>
  <li>{{item.value}}</li>
  <li>"---------------------"</li>
</ul>
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
                  <v-col
                    cols="12"
                    sm="6"
                    v-for="(item, index) in editedItem" :key="index"
                  >
                    <v-text-field
                      v-model="item.value"
                      :label="item.label"
                    ></v-text-field>
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
    <!-- <template v-slot:[`item.actions`]="{ item }"> -->
    <template v-slot:item.action="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editItem(item.raw)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
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
  export default {
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
        { title: 'Opções', key: 'action', sortable: false },
      ],
      editedIndex: -1,
      editedItem: [
        {name: 'date', value: '', label: 'Data'},
        {name: 'peak_demand', value: 0, label: 'Demanda de Ponta'},
        {name: 'off_peak_demand', value: 0, label: 'Demanda de Fora Ponta'},
        {name: 'peak_energy', value: 0, label: 'Energia de Ponta'},
        {name: 'off_peak_energy', value: 0, label: 'Energia Fora de Ponta'}        
      ],
      defaultItem: [
        {name: 'date', value: '', label: 'Data'},
        {name: 'peak_demand', value: 0, label: 'Demanda de Ponta'},
        {name: 'off_peak_demand', value: 0, label: 'Demanda de Fora Ponta'},
        {name: 'peak_energy', value: 0, label: 'Energia de Ponta'},
        {name: 'off_peak_energy', value: 0, label: 'Energia Fora de Ponta'}        
      ],
    }),
    computed: {
      ...mapGetters({
        data_file: 'get_user_data_history'
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.data_file.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.data_file.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.data_file.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.data_file[this.editedIndex], this.editedItem)
        } else {
          this.data_file.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
