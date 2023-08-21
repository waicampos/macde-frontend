<template>
  <v-text-field  
    v-model="convert_number"
    :label= "label"
    :suffix= "suffix"
    :prefix="prefix"
  ></v-text-field>
</template>

<script>
export default {
  name: 'InputNumberFormatted',
   data() {
      return {
        local_number: '',
        temp_string: '',
      }
   },

  props: {
    initial: {
      type: Number,
      default: 0
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

  computed: {
    convert_number: {
          get() {        
              return !this.local_number ? '' : new Intl.NumberFormat(this.lang, { maximumFractionDigits: this.maxFractionDigits }).format(this.local_number);
          },

          set(payload){ 
            const isComma = payload.slice(-1) === ',';
            const hasComma = this.temp_string.includes(',');
            payload = payload.replaceAll('.', '')            
            
            const isNumber = !Number.isNaN(parseFloat(payload.slice(-1)));            
            if(isNumber || (isComma && !hasComma && payload.length > 1)) {
              this.temp_string = payload
              this.local_number = payload.replace(',', '.')
            } 
            else{
              this.local_number = ' '
              this.temp_string = payload.slice(0, -1)
              this.$nextTick(() => {
                this.local_number = this.temp_string.replace(',', '.')
              })
            } 

            this.$nextTick(() => {
              this.$emit('changedValue', parseFloat(this.local_number))
            })
          }
        },
  },
  created() {
    this.local_number = this.initial
  },
  watch: {
      initial: {
        handler() {
          this.local_number = this.initial
        },
        deep: true,
        imediate: true,
      }
    },
}
</script>

