import axios from 'axios'

export const TIME_SERIES_DATE_FORMAT = 'dd/MM/yyyy'

export const sum = (acc, cur) => acc + cur;

export const sequence_headers_input_data_file = ['date', 'off_peak_demand', 'peak_demand', 'off_peak_energy', 'peak_energy']

export const translated_input_file_keys = {
  'data': 'date',
  'demanda ou demanda fora de ponta' : 'off_peak_demand',
  'demanda de ponta' : 'peak_demand',
  'energia fora de ponta' : 'off_peak_energy',
  'energia de ponta' : 'peak_energy'
}

export function change_names_en2pt(val) {
  return val.map(item => {  
    let new_obj = {}         
    Object.keys(translated_input_file_keys).forEach(key => Object.assign(new_obj, {[key]: item[translated_input_file_keys[key]]}))          
    return {...new_obj}
  })
}
export const MEAS_INFO = {
    "demand":{key:"demand", "title": "Demanda", "prefix":"R$", "suffix":"kW", "type":"number"},
    "peak_demand": {key: "peak_demand", title: "Demanda de Ponta", prefix:"R$", suffix:"kW", type:"number"},
    "off_peak_demand": {key: "off_peak_demand", title: "Demanda Fora de Ponta", prefix:"R$", suffix:"kW", type:"number"},
    "peak_energy": {key: "peak_energy", title:"Energia de Ponta", prefix:"R$", suffix:"kWh", type:"number"},
    "off_peak_energy": {key: 'off_peak_energy', title:"Energia Fora de Ponta", prefix:"R$", suffix:"kWh", type:"number"},
}

export const SIMULATION_TYPES = [
  {name: 'green_demand', text: 'Demanda Verde', meas: ['demand']},
  {name: 'green_demand_plus_energy', text: 'Demanda + Energia Verde', meas: ['demand', 'peak_energy', 'off_peak_energy']},
  {name: 'blue_demand', text: 'Demanda Azul', meas: ['peak_demand', 'off_peak_demand']},
  {name: 'blue_demand_plus_energy', text: 'Demanda + Energia Azul', meas: ['peak_demand', 'off_peak_demand', 'peak_energy', 'off_peak_energy']}
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

export function demand_cost_assembly_request(data, contracted, tariff, demand_names) {
    let arr_req = []
    demand_names.forEach(key => {
      arr_req.push(
        axios.post('https://gese.florianopolis.ifsc.edu.br/mcd/demand_cost', {
          'data': data.map(item => item[key]),
          'contracted': contracted.map(item => item[key]),
          'tariff': tariff.find(i => i.name == key).value
        })            
      )
    })

    return arr_req
}

export function demand_cost_response_disassembly(contracted, response) {
    let lentgh_res = response[0].data.length
    let demand_costs = []
    for(let i in [...Array(lentgh_res).keys()]){
      let prov = {}
      Object.keys(contracted[0]).forEach((key, index) => {
        if(key !== 'date') prov[key] = response[index].data[i]
      })
      demand_costs.push(prov)
    }
    return demand_costs
}

export const ITEMS_PER_PAGE_TABLE = [
  {value: 12, title: '12'},
  {value: 24, title: '24'},
  {value: 36, title: '36'},
  {value: 48, title: '48'},
  {value: -1, title: 'Todos'}
]