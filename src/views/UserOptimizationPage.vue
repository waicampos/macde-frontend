<template>
    <div class="d-flex flex-column">
        <v-row>
            <v-col cols="12">
                <FileUploader />
            </v-col>
        </v-row>
        <v-row>
             <v-col cols="12" lg="6">
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-optimization-chart-id"
                        :data="chartTimeSeriesData(['peak_demand'])"
                        
                    />
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-select
                    v-model="select_modality"
                    label="Modalidade tarifária"
                    :items="tariff_modality"
                    item-title="name"
                    item-value="value"
                    variant="outlined"
                    return-object
                ></v-select>
            </v-col>
            <v-col cols="8">            
                <v-switch
                    v-model="has_demand_variation"
                    label="Aumento ou Redução de Demanda (1x)"
                    color="orange"           
                    true-value="1"
                    false-value="0"         
                    hide-details
                ></v-switch>
            </v-col>
        </v-row>
    <v-row>
            <v-col cols="12">
                <h1>Dados entrada</h1>
    
                <v-table theme="dark">
                <tbody>
                <tr>
                    <td
                        v-for="(i, idx) in dataIn"
                        :key="idx"
                    >
                        {{ i }}
                    </td> 
                </tr>
                </tbody>
            </v-table>
        </v-col>
    </v-row>

      <v-row>
            <v-col cols="12">
                <v-btn @click="this.loadExploratory()">Exploratória</v-btn>
                 <v-data-table                     
                    :headers="headers"
                    :items="optimized"
                    class="elevation-4"                    
                >
                </v-data-table>
            </v-col>
        </v-row>    
    </div>
</template>

<script>
import axios from 'axios';
import FileUploader from '@/components/FileUploader.vue';
import { Line as MyLine} from 'vue-chartjs'
import { createDataSetsTimeSeries, chartOptionsConfig } from '@/components/config/chartConfig'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


    export default {
        name: "userOptimizationPage",
        components: {FileUploader, MyLine},
        data() {
            return {
                headers: [
                    {
                        title: 'Date',
                        align: 'start',
                        sortable: false,
                        key: 'date',
                    },
                    { title: 'Demanda de Ponta', key: 'peak_demand' }
                ],
                has_demand_variation: "0", 
                select_modality: {name: 'Verde', value: '1'},
                tariff_modality:  [{name: 'Verde', value: '1'}, {name: 'Azul', value: '2'}],
                optimized: [],
                dataIn:[
                        {
                            "data": [392, 810, 844, 793, 653, 469, 287, 324, 566, 567, 729, 697]
                        },
                        {
                            "data": [[392, 810, 844, 793, 653, 469, 287, 324, 566, 567, 729, 697], [392, 810, 844, 793, 653, 469, 287, 324, 566, 567, 729, 697]]
                        }
                ]                
            }
        },
        methods: {        
            chartTimeSeriesData(keys) {
                let dt_series = createDataSetsTimeSeries( 
                    keys, 
                    'date',
                    JSON.parse(JSON.stringify(this.optimized))
                )
                return dt_series
            },
            join_date_arr(arr) {            
                let current_year = '2022'
                let ans = []
                let range = [...Array(12).keys()]
                for(let i in range){
                    let date = new Date(current_year, i)
                    ans.push({                    
                        'date': `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
                        'peak_demand':  arr[i],           
                        // 'off_peak_demand':  arr[1].data[i]           
                    })
                }
                return ans
            },
            get_bigger_date_forecast() {
                let mod_data = JSON.parse(JSON.stringify(this.data_file));
                mod_data.forEach((curr, i, arr) => {
                    let dt = this.str2date(curr.date)
                    arr[i]['year'] = dt.getFullYear()
                })

                let all_date = mod_data.map(curr => {
                    return curr['year']
                })
                return Math.max(...all_date)
            },
            loadExploratory() {               
                const addr = `https://gese.florianopolis.ifsc.edu.br/mcd/exploratory/${this.select_modality.value}/${this.has_demand_variation}`
                
                Promise.all([
                    axios.post(addr, this.dataIn[this.select_modality.value-1])
                ])
                
                
                
                
                axios
                .post(addr, this.dataIn[this.select_modality.value-1])
                .then(response => {
                    this.optimized = this.join_date_arr(response.data);
                    console.log(this.optimized)
                })
            },
        }
    }
</script>

<style>

</style>