export const INFO_DELETED_DATA = () => {
    return {
        code: 'INFO_DELETED_DATA',
        message: `Dados apagados com sucesso.`,
        type: 'info'
    }
}

export const SUCCESS_UPLOAD_FILE = () => {
    return {
        code: 'SUCCESS_UPLOAD_FILE',
        message: `Arquivo carregado com sucesso.`,
        type: 'success'
    }
}

export const ERROR_FAIL_UPLOAD_FILE = () => {
    return {
        code: 'ERROR_FAIL_UPLOAD_FILE',
        message: `Não foi possível carregar o arquivo.`,
        type: 'error'
    }
}

export const ERROR_REQ_KEYS = (keys) => {
    return {
        code: 'ERROR_REQ_KEYS',
        message: `O arquivo não possui um ou mais propriedades obrigatórias (${keys.join(', ')}) em todas as amostras.`,
        type: 'error'
    }
}

export const ERROR_TS_IS_NUMBER = () => {
    return {
        code: 'ERROR_TS_IS_NUMBER', 
        message: 'Algumas amostras não possuem números válidos.', 
        type: 'error'
    }
}

export const ERROR_TS_INVALID_DATE = () => {
    return {
        code: 'ERROR_TS_INVALID_DATE',
        message: 'Série Temporal possui uma ou mais datas inválidas',
        type: 'error'
    }
}

export const ERROR_AT_LEAST_ONE_MONTH = () => {
    return {
        code: 'ERROR_AT_LEAST_ONE_MONTH',
        message: 'A Série deve ter pelo menos uma amostra para cada mês.',
        type: 'error'
    }
}

export const ERROR_TS_MISSING_KEY_DATE = () => {
    return {
        code: 'ERROR_TS_MISSING_KEY_DATE',
        message: 'Série Temporal possui uma ou mais amostras sem informação de data.',
        type: 'error'
    }
}

export const ERROR_TS_MIN_SIZE = (ts) => {
    return {
        code: 'ERROR_TS_MIN_SIZE',
        message: `A série informada possui um tamanho de ${ts.size()} amostras, sendo que o tamanho mínimo aceitável é de ${ts.get_frequency()} amostras.`,
        type: 'error'
    }
}

export const ERROR_TS_MAX_SIZE = (ts) => {
    return {
        code: 'ERROR_TS_MAX_SIZE',
        message: `A série informada possui um tamanho de ${ts.size()} amostras, sendo que o tamanho máximo aceitável é de ${ts.get_frequency()} amostras.`,
        type: 'error'
    }
}

export const ERROR_TS_IDEAL_SIZE = (ts) => {
    return {
        code: 'ERROR_TS_IDEAL_SIZE',
        message: `A série deve ter um tamanho múltiplo de ${ts.get_frequency()} amostras. O tamanho atual é de ${ts.size()} amostras.`,
        type: 'error'
    }
}

export const ERROR_TS_DATE_SEQ = () => {
    return {
        code: 'ERROR_TS_DATE_SEQ',
        message: `A série deve ter uma sequência cronológica.`,
        type: 'error'
    }
}

export const ERROR_TS_DUPLICATED_VALUE = () => {
    return {
        code: 'ERROR_TS_DUPLICATED_VALUE',
        message: `A série não deve ter valores repetidos.`,
        type: 'error'
    }
}
