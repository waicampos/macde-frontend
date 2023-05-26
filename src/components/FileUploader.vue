<template>
    <v-container>
        <h1>FILE UPLOADER</h1>
        <div v-if="!file">
            <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                <div class="dropZone-info" @drag="onChange">
                    <span class="fa fa-cloud-upload dropZone-title"></span>
                    <span class="dropZone-title">Arraste e solte ou clique para enviar um arquivo</span>
                    <div class="dropZone-upload-limit-info">               
                    <div> Os arquivos devem ter o formato CSV e ter no máximo 5 KB de tamanho</div>
                    </div>
                </div>
                <input type="file" @change="onChange" accept=".csv">
            </div>
        </div>
        <div v-else class="dropZone-uploaded">
            <div class="dropZone-uploaded-info">
            <span class="dropZone-title">Uploaded</span>
            <button type="button" class="btn btn-primary removeFile" @click="removeFile">Remover Arquivo</button>
            </div>
        </div>
        
        <div class="uploadedFile-info">
            <div>Nome do Arquivo: {{ file.name }}</div>
            <div>Tamanho: {{ file.size }} (bytes)</div>
            <div>Extension: {{ extension }}</div>
        </div>    
    </v-container>
</template>

<script>
export default {
    data() {
        return {            
            file: '',
            dragging: false
        }
    },    
    computed: {     
        userFileData: {
            get() {
                return this.$store.state.userFileData
            },

            set(payload) {
                this.$store.commit('userFileData', payload)
            }
        },
        extension() {
            return (this.file) ? this.file.name.split('.').pop() : '';
        }
    },
    methods: {
        onChange(e) {
            var files = e.target.files || e.dataTransfer.files;
        
            if (!files.length) {
                this.dragging = false;
                return;
            }

            this.createFile(files[0])
            
            const reader = new FileReader();
            reader.onload = () => this.readCSV(reader.result, ';', 1, false);
            reader.readAsText(files[0])
        },

        readCSV(filepath_or_buffer, separator=';', columns=0, index=true) {
            const lines = filepath_or_buffer.split(/\r?\n|\r/);                          
            const result = lines.map((line) => line.toString().split(separator).filter(l => l.length != 0))

            let csv = {}
            if(columns) {   
                csv.columns = result.slice(0, columns)
            }

            if(index) {
                csv.index = result.slice(columns).map(el => el.shift())
            }

            csv.data = result.slice(columns)
            
            console.log(csv)
            this.userFileData = csv
        },
        createFile(file) {
            if (!file.type.match('text.*')) {
                alert('Por favor, selecione um arquivo do tipo .csv');
                this.dragging = false;
                return;
            }
            
            if (file.size > 5000) {
                alert('Tamanho máximo excedido.')
                this.dragging = false;
                return;
            }
            
            this.file = file;
            this.dragging = false;
        },
        removeFile() {
            this.file = '';
        }
    }  
}
</script>

<style>
    .dropZone {
        width: 80%;
        height: 200px;
        position: relative;
        border: 2px dashed #000;
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
        width: 80%;
        height: 200px;
        position: relative;
        border: 2px dashed #eee;
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