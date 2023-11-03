<template>
    <Transition                               
        name="fade"
    >
        <v-alert      
            v-model="alert"
            closable
            v-if="show"       
            density="compact"
            :type="msg.type"            
            :text="msg.message"
            :icon="msg.icon"
            variant="tonal"
        ></v-alert>
    </Transition>  
</template>

<script>

    export default {
        name: "MessageViewer",
        data() {
            return {
                show: false,
                alert: true,
            }
        },

        emits: {
            msg_shown: null,
        },
        
        props: {
            msg: Object
        },

        watch: {
            alert: {
                handler() {                        
                    !this.alert && this.$emit('msg_shown')
                },
                imediate: true,
            }
        },

        mounted() {
            this.show = true
            if(!this.msg.hold) {
                setTimeout(() => this.show = false, 3000)
                setTimeout(() => this.$emit('msg_shown'), 3700)
            }
        },
    }
</script>

<style>
    .fade-enter-from,
    .fade-leave-to{
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active{
        transition: opacity 2s;
    }
</style>