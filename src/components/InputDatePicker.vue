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
          :disabled="disabled"
          v-bind="props"
          :modelValue="valueStr"    
          readonly              
          append-inner-icon="mdi-calendar"
          :label="label"
          variant="outlined"
        ></v-text-field>
      </template>
      <v-locale-provider locale="pt-BR">
        <VDatePicker
          v-model="value"
          show-adjacent-months
          color="primary"
          title=""
          cancel-text="Cancelar"
          ok-text="Ok"          
          @click:cancel="menu = false"
          @click:save="menu = false"
        >
          <template v-slot:header>
          </template>
        </VDatePicker>
      </v-locale-provider>
    </v-menu>
</template>

<script>
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { format as fns_format } from 'date-fns'
import { TIME_SERIES_DATE_FORMAT } from '@/assets/files/consts'

export default {
  components: {VDatePicker},  
  data() {
    return {
      menu: false,
      localValue: null,
    };
  },

  computed: {
    value: {
      get() {
        return this.localValue
      },
      set(val) {        
        this.$emit('update:modelValue', val)
      }
    },

    valueStr() {
      if(typeof this.value !== 'string') {
        return fns_format(this.value, TIME_SERIES_DATE_FORMAT)
      }
      return this.value
    },
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {      
      default: new Date()
    },
    label: {
      type: String,
      default: 'Data'
    },
  },
  
  created() {    
    this.localValue = this.modelValue || new Date()
    this.value = this.modelValue || new Date()
  },

  watch: {
      modelValue: {
        handler() {
          this.localValue = this.modelValue
        },
        imediate: true,
      }
    },
};
</script>