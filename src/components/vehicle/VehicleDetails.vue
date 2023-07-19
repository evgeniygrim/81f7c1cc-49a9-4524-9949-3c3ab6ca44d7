<template>
  <div>
    details!!1
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VehicleDetails',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup () {
    

    return {}
  },
  mounted() {
    console.warn(this.id);
  }
})
</script>

<style scoped>

</style>