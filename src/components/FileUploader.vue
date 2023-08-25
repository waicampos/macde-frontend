<template>
    <div>
        <div v-if="!file">
            <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                <div class="dropZone-info" @drag="onChange">
                    <v-btn
                        size="large"
                        class="ma-2"
                        color="indigo"
                        icon="mdi-cloud-upload"
                    ></v-btn>
                    <span class="fa fa-cloud-upload dropZone-title"></span>
                    <p class="dropZone-title">Arraste e solte ou clique para enviar um arquivo.</p>
                    <div class="dropZone-upload-limit-info">               
                    <div> Os arquivos devem ter o formato .csv (max. {{ max_size / 1000 }} kb)</div>
                    </div>
                </div>
                <input type="file" @change="onChange" accept=".csv">
            </div>
        </div>
        <div v-else class="dropZone-uploaded">
            <div class="dropZone-uploaded-info">
                <span v-if="!max_exceded" class="dropZone-title text-caption text-green">
                    Enviado Arquivo 
                    <span class="font-weight-bold">
                        {{ file.name }} 
                        <span class="text-caption">
                            ({{ file.size }} bytes)
                        </span>
                    </span>
                </span>
                <span v-else class="dropZone-title text-caption text-red">
                    <p>ARQUIVO NÃO ENVIADO.</p> 
                    <p>O arquivo {{ file.name }} excede o limite de {{ max_size/1000 }} kb.</p>
                </span>
                <button type="button" class="btn btn-primary removeFile" @click="removeFile">Clique para Enviar um Novo Arquivo</button>
            </div>
        </div>            
    </div>
</template>

<script>
import { csv2Json } from '@/assets/files/consts'

export default {
    data() {
        return {          
            file: '',
            dragging: false,
            max_exceded: false,
        }
    },   
    
    props: {
        max_size: {
            default: 15000
        }
    },

    emits: {
        newFileUploaded: null,
    },

    computed: {     
        extension() {
            return (this.file) ? this.file.name.split('.').pop() : '';
        }
    },
    
    methods: {
        onChange(e) {
            this.file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsText(this.file);                         
            reader.onload = (e) => {
                try{                      
                    if(this.file.size > this.max_size) {
                        this.max_exceded = true
                    } else {
                        this.max_exceded = false
                        this.$emit("newFileUploaded", csv2Json(e.target.result))
                    }                
                } catch(err) {
                    this.$emit("newFileUploaded", null)
                } 
            };                     
        },
        removeFile() {
            this.file = '';
        }
    }  
}
</script>

<style>
    .dropZone {
        width: 100%;
        height: 150px;
        position: relative;
        border: 2px dashed #535050;
    }

    .dropZone:hover {
        border: 2px solid #2e94c4;
    }

    .dropZone:hover .dropZone-title {
        color: #1975A0;
    }

    .dropZone-info {
        color: #A8A8A8;
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translate(0, -50%);
        text-align: center;
    }

    .dropZone-title {
        color: #787878;
    }

    .dropZone input {
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    .dropZone-upload-limit-info {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }

    .dropZone-over {
        background: #5C5C5C;
        opacity: 0.8;
    }

    .dropZone-uploaded {
        width: 100%;
        height: 150px;
        position: relative;
        border: 2px solid #1975A0;
    }

    .dropZone-uploaded-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #A8A8A8;
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translate(0, -50%);
        text-align: center;
    }

    .removeFile {
        width: 200px;
    }
</style>