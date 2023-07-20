<template>
  <div
    v-if="vehicleType"
    class="vehicle-type-icon"
  >
    <div class="wrapper-icon">
      <img
        :src="src"
        :alt="vehicleType.title"
      >
    </div>

    <div v-if="withTitle">
      {{ vehicleType.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { type PropType, defineComponent } from 'vue'
import { VehicleType, type VehicleTypeIcons } from '/@/stores/vehicle'
import { mapRepos } from 'pinia-orm'

export default defineComponent({
  props: {
    name: {
      type: String as PropType<VehicleType['name']>,
      required: true,
    },
    type: {
      type: String as PropType<keyof VehicleTypeIcons>,
      default: 'default',
    },
    withTitle: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: null,
    }
  },
  setup () {
    return {}
  },
  computed: {
    ...mapRepos({
      vehicleTypesRepo: VehicleType
    }),
    vehicleType () {
      return this.vehicleTypesRepo.find(this.name)
    },
    src () {
      return this.vehicleType?.icons[this.type]
    },
    style () {
      return {
        size: (this.size !== null || this.size === 0) ? `${this.size}px` : '1em',
      }
    }
  }
})
</script>

<style scoped lang="scss">
  $icon-size: v-bind('style.size');
  .vehicle-type-icon{
    height: $icon-size;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 0.7em;
  }
  .wrapper-icon {
    position: relative;
    height: $icon-size;
    width: $icon-size;
  }
  img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    width: $icon-size;
  }
</style>
