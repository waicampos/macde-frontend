<template>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ props }">
        <v-text-field
          v-bind="props"
          :modelValue="dateFormatted"    
          readonly              
          append-inner-icon="mdi-calendar"
          :label="label"
          variant="outlined"
        ></v-text-field>
      </template>
      <v-locale-provider locale="pt-BR">
        <VDatePicker
          :modelValue="getDate"
          show-adjacent-months
          input-placeholder="MM/dd/yyyy"
          color="primary"
          title="Selecione uma data"
          cancel-text="Cancel"
          ok-text="Ok"
          input-text="Digite uma data"
          @click:cancel="closeMenu"
          @click:save="closeMenu"
          @update:modelValue="updateDate"
          @update:inputMode="updateInputMode"
        ></VDatePicker>
      </v-locale-provider>
    </v-menu>
</template>

<script>
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { format as fns_format, parse as fns_parse } from 'date-fns'
import { TIME_SERIES_DATE_FORMAT } from '@/assets/files/consts'

export default {
  components: {VDatePicker},  
  data() {
    return {
      menu: false,
      input: null,
      inputMode: 'calendar',
    };
  },

  computed: {
    dateFormatted() {  
      const date = this.input ? new Date(this.input) : new Date();      
      
      return fns_format(date, this.inputMode == 'keyboard' ? 'MM/dd/yyyy': TIME_SERIES_DATE_FORMAT)
    },

    getDate() {
      return this.input ? new Date(this.input) : new Date();
    },
  },

  methods: {
    updateDate(val) {
      this.input = val      
    },
    updateInputMode(val) {
      this.inputMode = val
    },

    closeMenu() {
      this.menu = false;
    },
  },

  props: {
    value: {
      type: String,
      default() {
        return Date()
      },
    },
    label: {
      type: String,
      default: 'Data'
    },
  },

  watch: {
    value: {
      handler(val) {
        const formatted = fns_parse(val, TIME_SERIES_DATE_FORMAT, new Date());
        this.input = formatted == 'Invalid Date' ? null : formatted;
      },
      immediate: true,
    },
  },
};
</script>