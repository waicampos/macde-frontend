<template>
    <v-sheet>
        <v-sheet>
            <MyLine
                id="my-line-forecast-chart-id"
                :data="chartDataTimeSeries"
            />
            <MyLine
                id="my-line-forecast-chart-id"
                :data="chartDataByMonth"
            />
        </v-sheet>

        <h1>Dados entrada</h1>
        
        <v-table theme="dark">
        <tbody>
        <tr 
            v-for="(item, idx) in dados2.data"
            :key=idx
        >
            <td
                v-for=" (i, idx) in item"
                     :key="idx"
            >
                {{ i }}
            </td> 
        </tr>
        </tbody>
    </v-table>

    <v-btn @click="this.loadNaive()">NAIVE</v-btn>
    <v-table theme="dark">
        <tbody>
        <tr>
            <td
                v-for="item in forecast.naive"
                :key="item"
            >
                {{ item}}
            </td> 
        </tr>
        </tbody>
    </v-table>

    <v-btn @click="this.loadDoubleMean()">Double Mean</v-btn>
    <v-table theme="dark">
        <tbody>
        <tr>            
            <td
                v-for="item in forecast.double_mean"
                :key="item"
            >
                {{ item}}
            </td>
        </tr>
        </tbody>
    </v-table>


</v-sheet>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
import { Line as MyLine} from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

    export default {
        name: "user-forecast_page",
        components: {MyLine},
        data() {
            return {
                chartDataByMonth: {datasets: []},
                chartDataTimeSeries: {datasets: []},
                dados2: {"data":  [
		[
			159.60,
			547.68,
			633.78,
			449.68,
			374.64,
			204.96,
			298.48,
			273.28,
			249.76,
			371.28,
			487.76,
			478.24
		],
		[
			90.16,
			712.88,
			706.72,
			556.08,
			393.12,
			351.12,
			160.44,
			316.68,
			442.68,
			427.56,
			479.64,
			432.60
		],
		[
			100.8,
			537.60,
			620.76,
			624.96,
			383.88,
			291.48,
			278.04,
			284.76,
			422.52,
			482.16,
			517.44,
			480.48
		]
	]},
                dados: {"data": [
                    159.60,
                    547.68,
                    633.78,
                    449.68,
                    374.64,
                    204.96,
                    298.48,
                    273.28,
                    249.76,
                    371.28,
                    487.76,
                    478.24,
                    90.16,
                    712.88,
                    706.72,
                    556.08,
                    393.12,
                    351.12,
                    160.44,
                    316.68,
                    442.68,
                    427.56,
                    479.64,
                    432.60,
                    100.8,
                    537.60,
                    620.76,
                    624.96,
                    383.88,
                    291.48,
                    278.04,
                    284.76,
                    422.52,
                    482.16,
                    517.44,
                    480.48
                ]},
                forecast: {}
            }
        },
        computed: {
            ...mapGetters({
                data_file: 'get_user_data_history',
            })
        },
        methods: {
            loadNaive() {
                axios
                .post('https://gese.florianopolis.ifsc.edu.br/mcd/naive', this.dados)
                .then(response => {
                    this.forecast.naive = response.data;
                })
            },
            loadDoubleMean() {
                axios
                .post('https://gese.florianopolis.ifsc.edu.br/mcd/doublemean', this.dados2)
                .then(response => {
                    this.forecast.double_mean = response.data;
                })
            },
            str2date(dt) {
                let curr = dt.split('/')
                
                // Função Date o mês inicia em 0
                return new Date(curr[2], curr[1] - 1, curr[0])
            },
            date2str(dt) {
                return `${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()}`
            },
            groupBy(array, key) {
                return array.reduce((hash, obj) => {
                    if(obj[key] === undefined) return hash; 
                    return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
                }, {})
            },
            
            create_datasets_time_series() {
                this.chartDataTimeSeries = {datasets: []}
                this.chartDataTimeSeries.datasets.push({
                    label: 'Histórico',
                    data: this.data_file,
                    parsing: {
                        xAxisKey: 'date',
                        yAxisKey: 'peak_demand',
                    },
                    borderColor: '#36A2EB',
                    backgroundColor: '#9BD0F5'
                })
            },

            create_datasets_by_month() {
                this.chartDataByMonth = {datasets: []}
                let mod_data = JSON.parse(JSON.stringify(this.data_file))
                mod_data.forEach((curr, i, arr) => {
                    let dt = this.str2date(curr.date)
                    arr[i]['month'] = dt.getMonth().toString()
                    arr[i]['year'] = dt.getFullYear().toString()         

                })
                let agrouped_data = this.groupBy(mod_data, 'year')
                for(var dt_name in agrouped_data) {
                    this.chartDataByMonth.datasets.push({
                        label: dt_name,
                        data: agrouped_data[dt_name],
                        parsing: {
                        xAxisKey: 'month',
                        yAxisKey: 'peak_demand',
                        },
                        borderColor: '#36A2EB',
                        backgroundColor: '#9BD0F5'
                    })
                }
            },
        },
        watch: {
            data_file: function() {
                this.create_datasets_time_series()
                this.create_datasets_by_month()
            }
        },
        mounted() {
            this.create_datasets_time_series()
            this.create_datasets_by_month()
        },
    }
</script>

<style>

</style>