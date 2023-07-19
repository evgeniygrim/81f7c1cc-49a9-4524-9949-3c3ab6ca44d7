<template>
  <div class="scroll-container">
    <VehicleFilters></VehicleFilters>
    <RecycleScroller
      :page-mode="true"
      class="scroller"
      :items="vehicleIds"
      :gridItems="3"
      :item-size="300"
      :item-secondary-size="400"
      :buffer="400"
      v-slot="{ item }"
      @resize="(e:any) => console.log('resize', e)"
    >
    <article style="padding: 8px;">
      <vehicle-card :id="item.id"></vehicle-card>
    </article>
    </RecycleScroller>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVehicleFilters } from '/@/stores/vehicle';
import { VehicleCard, VehicleFilters } from '/@/components/vehicle'

export default defineComponent({
  components: {
    VehicleCard,
    VehicleFilters,
  },
  setup() {
    const vehicles = useVehicleFilters();
    return {
      vehicles,
    }
  },
  beforeMount() {
    this.vehicles.loadVehicles()
  },
  computed: {
    vehicleIds() {
      return this.vehicles.ids;
    }
  },
});
</script>

<style scoped>
.wrapper,
.scroller {
  height: 100%;
}

.scroller {
  flex: 1;
}
</style>
