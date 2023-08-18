<template>
    <Transition                               
        name="fade"
    >
        <v-alert      
            v-if="show"       
            density="compact"
            :type="msg.type"
            :title="msg.message"
            :text="msg.code"
        ></v-alert>
    </Transition>  
</template>

<script>

    export default {
        name: "MessageViewer",
        data() {
            return {
                show: false,
            }
        },

        emits: {
            msg_shown: null,
        },
        
        props: {
            msg: Object
        },

        mounted() {
            this.show = true
            setTimeout(() => this.show = false, 3000)
            setTimeout(() => this.$emit('msg_shown'), 3700)

        }
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