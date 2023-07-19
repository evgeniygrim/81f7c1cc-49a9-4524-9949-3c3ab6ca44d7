<template>
  <div>
    <el-form>
      <el-select v-model="filters.level">
        <el-option
          v-for="item in levels"
          :key="item.value"
          :label="item.title"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="filters.nation">
        <el-option
          v-for="item in nations"
          :key="item.name"
          :label="item.title"
          :value="item.name"
        />
      </el-select>
      <el-select v-model="filters.type">
        <el-option
          v-for="item in vehicleTypes"
          :key="item.name"
          :label="item.title"
          :value="item.name"
        />
      </el-select>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useVehicleFilters, Nation, VehicleType } from '/@/stores/vehicle';
import { loadVehicleTypesList } from '/@/api/vehiclesTypes';
import { loadNationsList } from '/@/api/nations';
import { mapRepos } from 'pinia-orm';
import nomar from 'nomar';
import { AnyNation, AnyVehicleLevel, AnyVehicleType } from '/@/const/vehicles';

export default defineComponent({
  setup() {
    const filters = useVehicleFilters();

    return {
      filters,
    };
  },
  data() {
    const levels = Array.from({ length: 9 }, (_, index) => ({
      title: 'Уровень ' + nomar(index + 1),
      value: index + 1,
    }));
    return {
      levels: [AnyVehicleLevel, ...levels],
    };
  },
  beforeMount() {
    loadVehicleTypesList();
    loadNationsList();
  },
  computed: {
    ...mapRepos({
      nationRepo: Nation,
      vehicleTypeRepo: VehicleType,
    }),
    nations() {
      return [AnyNation, ...this.nationRepo.all()];
    },
    vehicleTypes() {
      return [AnyVehicleType, ...this.vehicleTypeRepo.all()];
    },
  },
});
</script>

<style scoped></style>
