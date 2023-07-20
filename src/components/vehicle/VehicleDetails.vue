<template>
  <div
    v-if="vehicle"
    class="wrapper"
  >
    <div class="info">
      <vehicle-info :vehicle-id="vehicleId" />
    </div>
    <div class="image">
      <vehicle-icon
        :source="vehicle.icons"
        :type="'large'"
      />
    </div>
    <div class="title">
      {{ vehicle.title }}
    </div>
    <div class="caption">
      {{ vehicle.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Nation, Vehicle } from '/@/stores/vehicle'
import { mapRepos } from 'pinia-orm'
import VehicleIcon from './VehicleIcon.vue'
import VehicleInfo from './VehicleInfo.vue'

export default defineComponent({
  name: 'VehicleDetails',
  components: {
    VehicleIcon,
    VehicleInfo,
  },
  props: {
    vehicleId: {
      type: String,
      required: true,
    },
  },
  setup () {
    return {}
  },
  computed: {
    ...mapRepos({
      vehiclesRepo: Vehicle,
      nationRepo: Nation,
    }),
    vehicle () {
      return this.vehiclesRepo.find(this.vehicleId)
    },
  },
})
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.image {
  text-align: center;
  background-color: #090b14;
}
.info {
  position: absolute;
  top: 20px;
  left: 20px;
}
.title {
  font-size: 32px;
  line-height: 1.2em;
}
.caption {
  font-size: 16px;
  line-height: 1.2em;
}
.vehicle-icon {
  height: 400px;
}
</style>
