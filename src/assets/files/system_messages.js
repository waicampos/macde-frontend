export class MessageManager{  
    constructor(message_info = null) {      
        this.messages = []
        message_info && this.add(message_info)        
    }

    get_messages() {
        return Object.assign({}, this.messages)
    }

    add(msg) {
        this.messages.every(item => item.code != msg.code) &&
        this.messages.push(Object.assign({}, msg))
    }

    delete(msg_code) {
        const index = this.messages.findIndex(item => item.code == msg_code)
        this.messages.splice(index, 1)
    }

    clear() {
        this.messages = []
    }

    length() {
        return this.messages.length
    }
  }

export class MessageInfo{  
    constructor(
        code = 'NO_CODE', 
        message = 'Mensagem não disponível.',
        type = 'error',
        icon = 'mdi-alert-outline',
        hold = false
    ) {      
        this.code = code
        this.message = message,
        this.type = type,
        this.icon = icon,
        this.hold = hold
    }

    set_code(value) {
        this.code = value
    }

    set_message(value) {
        this.message = value
    }

    set_type(value) {
        this.type = value
    }

    set_icon(value) {
        this.icon = value
    }
    
    set_hold(value) {
        this.hold = value
    }

    code() {
        return this.code
    }

    message() {
        return this.message
    }

    type() {
        return this.type
    }

    icon() {
        return this.icon
    }
    
    hold() {
        return this.hold
    }
}

export const BASIC_KEYS_REQUIRED = ['peak_demand', 'off_peak_demand', 'peak_energy', 'off_peak_energy']

export const INFO_DELETED_DATA = () => {
    return new MessageInfo(
       'INFO_DELETED_DATA',
       `Dados apagados com sucesso.`,
       'info',
       'mdi-information-outline',
       false
    )
}

export const SUCCESS_UPLOAD_FILE = () => {
    return new MessageInfo(
       'SUCCESS_UPLOAD_FILE',
       `Arquivo carregado com sucesso.`,
       'success',
       'mdi-check-circle-outline',
       false
    )
}

export const ERROR_FAIL_UPLOAD_FILE = () => {
    return new MessageInfo(
       'ERROR_FAIL_UPLOAD_FILE',
       `Não foi possível carregar o arquivo.`,
       'error',
       "mdi-alert-outline",
       true
    )
}

export const ERROR_REQ_KEYS = (keys) => {
    return new MessageInfo(
       'ERROR_REQ_KEYS',
       `O arquivo não possui um ou mais propriedades obrigatórias (${keys.join(', ')}) em todas as amostras.`,
       'error',
       "mdi-alert-outline",
       true
    )
}

export const ERROR_TS_IS_NUMBER = () => {
    return new MessageInfo(
       'ERROR_TS_IS_NUMBER', 
       'Algumas amostras não possuem números válidos.', 
       'error',
       "mdi-alert-outline",
       true
    )
}

export const ERROR_TS_INVALID_DATE = () => {
    return new MessageInfo(
       'ERROR_TS_INVALID_DATE',
       'Série Temporal possui uma ou mais datas inválidas (valores em branco ou fora do padrão dd/MM/yyyy).',
       'error',
       "mdi-alert-outline",
       true
    )
}

export const ERROR_AT_LEAST_ONE_MONTH = () => {
    return new MessageInfo(
       'ERROR_AT_LEAST_ONE_MONTH',
       'A série deve ter pelo menos uma amostra para cada mês.',
       'error',
       "mdi-alert-outline",
       true
    )
}

export const ERROR_TS_MISSING_KEY_DATE = () => {
    return new MessageInfo(
       'ERROR_TS_MISSING_KEY_DATE',
       'Série Temporal possui uma ou mais amostras sem informação de data.',
       'error',
       "mdi-alert-outline",
       true
    )
}

export const ERROR_TS_MIN_SIZE = (size, minimum_size) => {
    return new MessageInfo(
       'ERROR_TS_MIN_SIZE',
       `A série informada possui um tamanho de ${size} amostras, sendo que o tamanho mínimo aceitável é de ${minimum_size} amostras.`,
       'error',
       "mdi-alert-outline",
       true
    )
}

export const ERROR_TS_MAX_SIZE = (size, maximum_size) => {
    return new MessageInfo(
       'ERROR_TS_MAX_SIZE',
       `A série informada possui um tamanho de ${size} amostras, sendo que o tamanho máximo aceitável é de ${maximum_size} amostras.`,
       'error',
       "mdi-alert-outline",
       true
    )
}

export const ERROR_TS_IDEAL_SIZE = (ts) => {
    return new MessageInfo(
       'ERROR_TS_IDEAL_SIZE',
       `A série deve ter um tamanho múltiplo de ${ts.get_frequency()} amostras. O tamanho atual é de ${ts.size()} amostras.`,
       'error',
       "mdi-alert-outline",
       true
    )
}

export const ERROR_TS_DATE_SEQ = () => {
    return new MessageInfo(
       'ERROR_TS_DATE_SEQ',
       `A série deve ter uma sequência cronológica.`,
       'error',
       "mdi-alert-outline",
       true
    )
}

export const ERROR_TS_DUPLICATED_VALUE = () => {
    return new MessageInfo(
       'ERROR_TS_DUPLICATED_VALUE',
       `A série não deve ter valores repetidos.`,
       'error',
       "mdi-alert-outline",
       true
    )
}
