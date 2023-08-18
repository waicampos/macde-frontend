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
                    <div> Os arquivos devem ter o formato JSON</div>
                    </div>
                </div>
                <input type="file" @change="onChange" accept=".csv, application/JSON">
            </div>
        </div>
        <div v-else class="dropZone-uploaded">
            <div class="dropZone-uploaded-info">
            <span class="dropZone-title">Uploaded</span>
            <button type="button" class="btn btn-primary removeFile" @click="removeFile">Clique para Enviar um Novo Arquivo</button>
            </div>
        </div>
        
        <div class="uploadedFile-info">
            <div>Nome do Arquivo: {{ file.name }}</div>
            <div>Tamanho: {{ file.size }} (bytes)</div>
            <div>Extension: {{ extension }}</div>
        </div>    
    </div>
</template>

<script>

export default {
    data() {
        return {          
            file: '',
            dragging: false,
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
                    this.$emit("newFileUploaded", JSON.parse(e.target.result))                    
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