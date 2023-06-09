<template>
    <div class="d-flex flex-column">
        <v-row>
            <v-col cols="12">
                <FileUploader store_dispatch_name="load_user_data_forecast"/>
            </v-col>
        </v-row>
        <v-row>
             <v-col cols="12" lg="6">
                <v-sheet rounded="lg" min-height="300">
                    <MyLine
                        id="my-optimization-chart-id"
                        :data="chartTimeSeriesData()"

                    />
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-select
                    v-model="selected_modality"
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
                <v-btn @click="this.loadExploratory()">Exploratória</v-btn>
                 <v-data-table
                    :headers="this.headers()"
                    :items="forecasted"
                    class="elevation-4"
                >
                </v-data-table>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
                has_demand_variation: "0",
                selected_modality: {name: 'Verde', value: '1'},
                tariff_modality:  [{name: 'Verde', value: '1'}, {name: 'Azul', value: '2'}],
                forecasted: []
            }
        },

        computed: {
            ...mapGetters({
                data_file: 'get_user_data_forecast',
            })
        },
        methods: {
            headers() {
                let arr = []
                arr.push(
                    {
                        title: 'Date',                       
                        align: 'start',
                        sortable: false,
                        key: 'date',
                    }
                )

                if(this.selected_modality.value == 1) {
                    arr.push({ title: 'Demanda', key: 'demand' })
                } 
                else {
                    arr.push(
                        { title: 'Demanda de Ponta', key: 'peak_demand' },
                        { title: 'Demanda Fora de Ponta', key: 'off_peak_demand' }
                    )
                }

                return arr
                
            },
                    
            chartTimeSeriesData() {
                if(this.selected_modality.value == '1') {
                    return createDataSetsTimeSeries(
                        ['demand'],
                        'date',
                        JSON.parse(JSON.stringify(this.forecasted))
                    )                    
                }
                else {
                    return createDataSetsTimeSeries(
                        ['peak_demand', 'off_peak_demand'],
                        'date',
                        JSON.parse(JSON.stringify(this.forecasted))
                    )
                }
            },
            convert2naive(key) {
                return this.data_file.map((curr) => {
                    return curr[key]
                })
            },
            create_dates(size, current_year) {
                let ans = []
                let range = [...Array(size).keys()]
                for(let i in range){
                    let date = new Date(current_year, i)
                    ans.push({
                        'date': `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
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

            maxDemand(arr1, arr2) {
                return arr1.map(
                    (curr, index) => (curr >= arr2[index]) ? curr : arr2[index]
                )
            },

            loadExploratory() {
                let peak_demand = this.convert2naive('peak_demand')
                let off_peak_demand = this.convert2naive('off_peak_demand')
                let green_demand = this.maxDemand(peak_demand, off_peak_demand)
                let blue_demand = [[...peak_demand], ...[off_peak_demand]]

                let arr_demand = [...green_demand]
                if(this.selected_modality.value == 2) {
                    arr_demand = [...blue_demand]
                }

                const addr = `https://gese.florianopolis.ifsc.edu.br/mcd/exploratory/${this.selected_modality.value}/${this.has_demand_variation}`
                axios
                .post(addr, {"data": arr_demand})
                .then(response => {
                    let ans = this.create_dates(12, '2022')
                    
                    if(this.selected_modality.value == 1) {
                        for(let i in ans) {
                            ans[i].demand = response.data[i]
                        }
                    }
                    else{
                        for(let i in ans) {
                            ans[i].peak_demand = response.data[0][i],
                            ans[i].off_peak_demand = response.data[1][i]                  
                        }
                    }
                    this.forecasted = ans;

                })
            },
        }
    }
</script>

<style>

</style>