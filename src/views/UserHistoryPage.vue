<template>
 <v-sheet class="d-flex flex-column">
    <v-sheet class="flex-1-0 ma-2 pa-2">
      <FileUploader />
    </v-sheet>

    <v-sheet class="flex-1-0 ma-2 pa-2">
      <TableData />
    </v-sheet>
</v-sheet>
</template>

<script>
  import FileUploader from '@/components/FileUploader.vue'
  import TableData from '@/components/TableData.vue'


  export default {
    name: 'userHistoryPage',
    components: {FileUploader, TableData},
  }
</script>
