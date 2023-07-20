<template>
  <div
    v-if="vehicle"
    class="vehicle-info"
  >
    <div
      v-if="vehicle.level"
      class="vehicle-level"
    >
      <span class="roman">{{ nomar(vehicle.level) }}</span>
      <span>Уровень</span>
    </div>
    <div>
      <vehicle-type-icon
        :name="vehicle?.typeName"
        :with-title="true"
        :size="size"
      />
    </div>
    <div>
      <nation-icon
        :name="vehicle?.nationName"
        :type="'small'"
        :with-title="true"
        :size="size"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { type PropType, defineComponent, ref } from 'vue'
import { Vehicle } from '/@/stores/vehicle'
import { mapRepos } from 'pinia-orm'
import VehicleTypeIcon from './VehicleTypeIcon.vue'
import { NationIcon } from '/@/components/nation'
import nomar from 'nomar'

export enum VehicleInfoTypes {
  full = 'full',
  short = 'short'
}

export default defineComponent({
  components: {
    VehicleTypeIcon,
    NationIcon
  },
  props: {
    vehicleId: {
      type: String as PropType<Vehicle['id']>,
      required: true,
    },
    type: {
      type: String as PropType<VehicleInfoTypes>,
      default: VehicleInfoTypes.short,
    }
  },
  setup () {
    return {
      VehicleInfoTypes,
      nomar,
      size: ref(24),
    }
  },
  computed: {
    ...mapRepos({
      vehicleRepo: Vehicle
    }),
    vehicle () {
      return this.vehicleRepo.find(this.vehicleId)
    },
    styles () {
      return {
        size: `${this.size}px`,
      }
    }
  }
})
</script>

<style scoped>
  .vehicle-level {
    height: 24px;
    display: flex;
    flex-direction: row;
    gap: 0.7em;
  }

  .roman {
    text-align: center;
    display: inline-block;
    width: v-bind('styles.size');
  }

</style>
