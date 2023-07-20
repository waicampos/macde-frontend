export const MEAS_INFO = {
    "demand":{key:"demand", "title": "Demanda", "prefix":"R$", "suffix":"por kW", "type":"number"},
    "peak_demand": {key: "peak_demand", title: "Demanda de Ponta", prefix:"R$", suffix:"por kW", type:"number"},
    "off_peak_demand": {key: "off_peak_demand", title: "Demanda Fora de Ponta", prefix:"R$", suffix:"por kW", type:"number"},
    "peak_energy": {key: "peak_energy", title:"Energia de Ponta", prefix:"R$", suffix:"por kW/h", type:"number"},
    "off_peak_energy": {key: 'off_peak_energy', title:"Energia Fora de Ponta", prefix:"R$", suffix:"por kW/h", type:"number"},
}

export const SIMULATION_TYPES = [
    {name: 'green_demand', text: 'Demanda Verde'},
    {name: 'green_demand_plus_energy', text: 'Demanda + Energia Verde'},
    {name: 'blue_demand', text: 'Demanda Azul'},
    {name: 'blue_demand_plus_energy', text: 'Demanda + Energia Azul'}
]

export const TARIFF_MODALITY_TYPES = [
    {name: 'green', text: 'Verde', value: 1},
    {name: 'blue', text: 'Azul', value: 2}
]

export const GROUP_CLASSIFICATION_TYPES = [
    {name: 'a', text: 'Groupo A'},
    {name: 'b', text: 'Groupo B'},
]

export const CLASS_CLASSIFICATION_UNITY_CONSUMER = [
    {name: 'residential', text: 'Residencial'},
    {name: 'industrial', text: 'Industrial'},
    {name: 'commercial', text: 'Comercial'},
    {name: 'rural', text: 'Rural'},
    {name: 'state', text: 'Poder Público'},
]

export const SUBGROUP_CLASSIFICATION_TYPES = [
        {name: 'a1', text: 'A1', group: 'A'},
        {name: 'a2', text: 'A2', group: 'A'},
        {name: 'a3', text: 'A3', group: 'A'},
        {name: 'a3a', text: 'A3a', group: 'A'},
        {name: 'a4', text: 'A4', group: 'A'},
        {name: 'as', text: 'AS', group: 'A'},
        {name: 'b1', text: 'B1', group: 'B'},
        {name: 'b2', text: 'B2', group: 'B'},
        {name: 'b3', text: 'B3', group: 'B'},
        {name: 'b4', text: 'B4', group: 'B'},
]

export function groupBy(array, key){
    return array.reduce((hash, obj) => {
        if(obj[key] === undefined) return hash; 
        return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
    }, {})
}

export function str2date(dt){
    let curr = dt.split('/')
    
    //The Date function the month starts at 0
    return new Date(curr[2], curr[1] - 1, curr[0])
}

export function get_serie_by_key(data, key){
    if(!key) {
      return data
    }

    if(data.length) {
      if(Object.keys(data[0]).includes(key)) {
        return data.map(item => item[key])
      }
    }
    return []
}

export function get_demand_measurements_names(tariff_modality) {
    return tariff_modality == 'green' ? ['demand'] : ['peak_demand', 'off_peak_demand']
}

export function get_energy_measurements_names() {
    return ['peak_energy', 'off_peak_energy']
}

export function get_all_measurements_names() {
    return ['demand', 'peak_demand', 'off_peak_demand', 'peak_energy', 'off_peak_energy']
}

export function get_measurements_names(tariff_modality) {
    let names = get_demand_measurements_names(tariff_modality)
    names.push('peak_energy', 'off_peak_energy')
    return names
}

export const sum = (acc, cur) => acc + cur;