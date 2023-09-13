<template>
    <div>
        <v-card class="elevation-0">
            <v-card-item>
                <v-card-title>
                    <slot name="title">                        
                        {{ title }}
                    </slot>
                </v-card-title>
                <v-card-subtitle>                    
                    <slot name="subtitle">
                        {{ subtitle }}
                    </slot>                    
                </v-card-subtitle>
            </v-card-item>

            <v-card-text>                
                <slot name="message">{{ message }}</slot>                    
                
                <slot name="default"></slot>                        
                    
            </v-card-text>

            <v-card-actions v-if="!hide_actions">
                <v-btn 
                    prepend-icon="mdi-content-save"
                    class="text-none"
                    color="grey-lighten-2"
                    variant="flat"
                    :disabled="disabled_save_btn"
                    @click="$emit('save')"
                >
                    Salvar
                </v-btn>
                <v-btn 
                    class="text-none"
                    color="grey-lighten-2"
                    variant="flat"
                    @click="$emit('cancel')"
                    prepend-icon="mdi-cancel"
                >
                    Cancelar
                </v-btn>                
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        props: {
            disabled_save_btn: {
                type: Boolean,
                default: false
            },
            hide_actions: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '',
            },
            subtitle: {
                type: String,
                default: '',
            },
            message: {
                type: String,
                default: '',
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>