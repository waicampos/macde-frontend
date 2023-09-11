import { helpers } from '@vuelidate/validators'

export const is_number_pt_br = helpers.regex(/^(-|\+)?([0-9]*(,?[0-9]*))$/)
