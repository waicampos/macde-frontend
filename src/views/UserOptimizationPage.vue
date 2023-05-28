<template>
    <v-sheet class="flex-1-0 ma-2 pa-2">
        <FileUploader />
    </v-sheet>

    <v-sheet>
        <LineChart />
    </v-sheet>
    <v-container>
        <v-select
            v-model="select"
            label="Modalidade tarifária"
            :items="tariff_modality"
            item-title="name"
            item-value="value"
            variant="outlined"
        ></v-select>
    
        <v-select
            v-model="selected_variation"
            label="Variação de demanda"
            :items="demand_variation"
            item-title="name"
            item-value="value"
            variant="outlined"
        ></v-select>
    </v-container>       

    <h1>Dados entrada</h1>
    
    <v-table theme="dark">
    <tbody>
    <tr>
        <td
            v-for="(i, idx) in dados.data"
            :key="idx"
        >
            {{ i }}
        </td> 
    </tr>
    </tbody>
</v-table>

<v-btn @click="this.loadExploratory()">Exploratória</v-btn>
<v-table theme="dark">
    <tbody>
    <tr>
        <td
            v-for="item in forecast.exploratory"
            :key="item"
        >
            {{ item}}
        </td> 
    </tr>
    </tbody>
</v-table>
</template>
<script>
import axios from 'axios';
import FileUploader from '@/components/FileUploader.vue';
import LineChart from '@/components/charts/LineChart.vue';

    export default {
        name: "user-forecast_page",
        components: {FileUploader, LineChart},
        data() {
            return {
                selected_variation: {name: 'True', value: '1'},
                demand_variation: [{name: 'False', value: '0'}, {name: 'True', value: '1'}],
                select: {name: 'Verde', value: '1'},
                tariff_modality:  [{name: 'Verde', value: '1'}, {name: 'Azul', value: '2'}],
                forecast: {},
                dados: {"data": [392, 810, 844, 793, 653, 469, 287, 324, 566, 567, 729, 697]}
            }
        },
        methods: {
            loadExploratory() {
                console.log(this.selected_variation)
                console.log(this.select)
                console.log(`http://localhost:5010/exploratory/${this.select.value}/${this.selected_variation.value}`)
                
                axios
                .post(`http://localhost:5010/exploratory/${this.select.value}/${this.selected_variation.value}`, this.dados)
                .then(response => {
                    this.forecast.exploratory = response.data;
                })
            },
        }
    }
</script>

<style>

</style>