<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'data', order: 'asc' }]"
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
                  >
                    <v-text-field
                      v-model="editedItem.data"
                      label="Data"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.demanda_ponta"
                      label="Demanda de Ponta (kW)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.demanda_fora_ponta"
                      label="Demanda Fora de Ponta (kW)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.energia_ponta"
                      label="Energia de Ponta (kWh)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.energia_fora_ponta"
                      label="Energia Fora de Ponta (kWh)"
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
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          title: 'Data',
          align: 'start',
          sortable: true,
          key: 'data',
        },
        { title: 'Demanda de Ponta', key: 'demanda_ponta' },
        { title: 'Demanda Fora de Ponta', key: 'demanda_fora_ponta' },
        { title: 'Energia de Ponta', key: 'energia_ponta' },
        { title: 'Energia Fora de Ponta', key: 'energia_fora_ponta' },
        { title: 'Opções', key: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        data: '',
        demanda_ponta: 0,
        demanda_fora_ponta: 0,
        energia_ponta: 0,
        energia_fora_ponta: 0,
      },
      defaultItem: {
        data: '',
        demanda_ponta: 0,
        demanda_fora_ponta: 0,
        energia_ponta: 0,
        energia_fora_ponta: 0,
      },
    }),

    computed: {
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

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            data: '01/01/2019',
            demanda_ponta: 100.8,
            demanda_fora_ponta: 254.52,
            energia_ponta:4989,
            energia_fora_ponta: 59163,
          },
          {
            data: '01/02/2019',
            demanda_ponta: 537.6,
            demanda_fora_ponta: 624.12,
            energia_ponta: 8206,
            energia_fora_ponta: 118769,
          },
          {
            data: '01/03/2019',
            demanda_ponta: 620.76,
            demanda_fora_ponta: 784.44,
            energia_ponta: 26654,
            energia_fora_ponta:137737,
          },
          {
            data: '01/04/2019',
            demanda_ponta: 624.96,
            demanda_fora_ponta: 719.88,
            energia_ponta: 25065,
            energia_fora_ponta: 133994,
          },
          {
            data: '01/05/2019',
            demanda_ponta: 383.88,
            demanda_fora_ponta: 624.68,
            energia_ponta: 17033,
            energia_fora_ponta: 102337,
          },
           {
            data: '01/06/2019',
            demanda_ponta: 100.8,
            demanda_fora_ponta: 254.52,
            energia_ponta:4989,
            energia_fora_ponta: 59163,
          },
          {
            data: '01/07/2019',
            demanda_ponta: 537.6,
            demanda_fora_ponta: 624.12,
            energia_ponta: 8206,
            energia_fora_ponta: 118769,
          },
          {
            data: '01/08/2019',
            demanda_ponta: 620.76,
            demanda_fora_ponta: 784.44,
            energia_ponta: 26654,
            energia_fora_ponta:137737,
          },
          {
            data: '01/09/2019',
            demanda_ponta: 624.96,
            demanda_fora_ponta: 719.88,
            energia_ponta: 25065,
            energia_fora_ponta: 133994,
          },
          {
            data: '01/10/2019',
            demanda_ponta: 383.88,
            demanda_fora_ponta: 624.68,
            energia_ponta: 17033,
            energia_fora_ponta: 102337,
          },
           {
            data: '01/11/2019',
            demanda_ponta: 100.8,
            demanda_fora_ponta: 254.52,
            energia_ponta:4989,
            energia_fora_ponta: 59163,
          },
          {
            data: '01/12/2019',
            demanda_ponta: 537.6,
            demanda_fora_ponta: 624.12,
            energia_ponta: 8206,
            energia_fora_ponta: 118769,
          },
          {
            data: '01/01/2020',
            demanda_ponta: 100.8,
            demanda_fora_ponta: 254.52,
            energia_ponta:4989,
            energia_fora_ponta: 59163,
          },
          {
            data: '01/02/2020',
            demanda_ponta: 537.6,
            demanda_fora_ponta: 624.12,
            energia_ponta: 8206,
            energia_fora_ponta: 118769,
          },
          {
            data: '01/03/2020',
            demanda_ponta: 620.76,
            demanda_fora_ponta: 784.44,
            energia_ponta: 26654,
            energia_fora_ponta:137737,
          },
          {
            data: '01/04/2020',
            demanda_ponta: 624.96,
            demanda_fora_ponta: 719.88,
            energia_ponta: 25065,
            energia_fora_ponta: 133994,
          },
          {
            data: '01/05/2020',
            demanda_ponta: 383.88,
            demanda_fora_ponta: 624.68,
            energia_ponta: 17033,
            energia_fora_ponta: 102337,
          },
           {
            data: '01/06/2020',
            demanda_ponta: 100.8,
            demanda_fora_ponta: 254.52,
            energia_ponta:4989,
            energia_fora_ponta: 59163,
          },
          {
            data: '01/07/2020',
            demanda_ponta: 537.6,
            demanda_fora_ponta: 624.12,
            energia_ponta: 8206,
            energia_fora_ponta: 118769,
          },
          {
            data: '01/08/2020',
            demanda_ponta: 620.76,
            demanda_fora_ponta: 784.44,
            energia_ponta: 26654,
            energia_fora_ponta:137737,
          },
          {
            data: '01/09/2020',
            demanda_ponta: 624.96,
            demanda_fora_ponta: 719.88,
            energia_ponta: 25065,
            energia_fora_ponta: 133994,
          },
          {
            data: '01/10/2020',
            demanda_ponta: 383.88,
            demanda_fora_ponta: 624.68,
            energia_ponta: 17033,
            energia_fora_ponta: 102337,
          },
           {
            data: '01/11/2020',
            demanda_ponta: 100.8,
            demanda_fora_ponta: 254.52,
            energia_ponta:4989,
            energia_fora_ponta: 59163,
          },
          {
            data: '01/12/2020',
            demanda_ponta: 537.6,
            demanda_fora_ponta: 624.12,
            energia_ponta: 8206,
            energia_fora_ponta: 118769,
          },
          {
            data: '01/01/2021',
            demanda_ponta: 100.8,
            demanda_fora_ponta: 254.52,
            energia_ponta:4989,
            energia_fora_ponta: 59163,
          },
          {
            data: '01/02/2021',
            demanda_ponta: 537.6,
            demanda_fora_ponta: 624.12,
            energia_ponta: 8206,
            energia_fora_ponta: 118769,
          },
          {
            data: '01/03/2021',
            demanda_ponta: 620.76,
            demanda_fora_ponta: 784.44,
            energia_ponta: 26654,
            energia_fora_ponta:137737,
          },
          {
            data: '01/04/2021',
            demanda_ponta: 624.96,
            demanda_fora_ponta: 719.88,
            energia_ponta: 25065,
            energia_fora_ponta: 133994,
          },
          {
            data: '01/05/2021',
            demanda_ponta: 383.88,
            demanda_fora_ponta: 624.68,
            energia_ponta: 17033,
            energia_fora_ponta: 102337,
          },
           {
            data: '01/06/2021',
            demanda_ponta: 100.8,
            demanda_fora_ponta: 254.52,
            energia_ponta:4989,
            energia_fora_ponta: 59163,
          },
          {
            data: '01/07/2021',
            demanda_ponta: 537.6,
            demanda_fora_ponta: 624.12,
            energia_ponta: 8206,
            energia_fora_ponta: 118769,
          },
          {
            data: '01/08/2021',
            demanda_ponta: 620.76,
            demanda_fora_ponta: 784.44,
            energia_ponta: 26654,
            energia_fora_ponta:137737,
          },
          {
            data: '01/09/2021',
            demanda_ponta: 624.96,
            demanda_fora_ponta: 719.88,
            energia_ponta: 25065,
            energia_fora_ponta: 133994,
          },
          {
            data: '01/10/2021',
            demanda_ponta: 383.88,
            demanda_fora_ponta: 624.68,
            energia_ponta: 17033,
            energia_fora_ponta: 102337,
          },
           {
            data: '01/11/2021',
            demanda_ponta: 100.8,
            demanda_fora_ponta: 254.52,
            energia_ponta:4989,
            energia_fora_ponta: 59163,
          },
          {
            data: '01/12/2021',
            demanda_ponta: 537.6,
            demanda_fora_ponta: 624.12,
            energia_ponta: 8206,
            energia_fora_ponta: 118769,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
