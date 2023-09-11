<template>
  <v-text-field  
    v-model="v$.local_number.$model"
    :label= "label"
    :suffix= "suffix"
    :prefix="prefix"
    :error="v$.local_number.$error"        
    :error-messages="v$.local_number.$error ? v$.local_number.$errors[0].$message : ''"
  ></v-text-field>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { is_number_pt_br } from '@/assets/files/validators'
import { MSG_REQUIRED, MSG_INVALID_NUMBER } from '@/assets/files/validators_messages'


export default {
  name: 'InputNumberFormatted',

  computed: {
    local_number: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },

    setup: () => ({ v$: useVuelidate() }),

    validations () {
        return {
            local_number: { 
                required: helpers.withMessage(MSG_REQUIRED, required), 
                is_number_pt_br: helpers.withMessage(MSG_INVALID_NUMBER, is_number_pt_br)
            }
        }
    },

  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: 'Type a Number'
    },
    suffix: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    lang: {
      type: String,
      default: 'pt_BR'
    },
    maxFractionDigits: {
      type: String,
      default: '12'
    }
  },
}
</script>

