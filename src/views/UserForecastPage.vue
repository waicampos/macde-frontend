<template>
    <v-app>
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


    </v-app>
</template>
<script>
import axios from 'axios';

    export default {
        name: "user-forecast_page",
        data() {
            return {
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
        methods: {
            loadNaive() {
                axios
                .post('http://localhost:5010/naive', this.dados)
                .then(response => {
                    this.forecast.naive = response.data;
                })
            },
            loadDoubleMean() {
                axios
                .post('http://localhost:5010/doublemean', this.dados2)
                .then(response => {
                    this.forecast.double_mean = response.data;
                })
            },
        }
    }
</script>

<style>

</style>