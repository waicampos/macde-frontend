export const SIMULATION_TYPES = [
    {name: 'green_demand', text: 'Demanda Verde'},
    {name: 'green_demand_plus_energy', text: 'Demanda + Energia Verde'},
    {name: 'blue_demand', text: 'Demanda Azul'},
    {name: 'blue_demand_plus_energy', text: 'Demanda + Energia Azul'}
]

export const TARIFF_MODALITY_TYPES = [
    {name: 'green', text: 'Verde'},
    {name: 'blue', text: 'Azul'}
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