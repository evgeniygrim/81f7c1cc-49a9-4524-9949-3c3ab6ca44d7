<template>
  <div class="vehicle-filters">
    <el-form>
      <el-select v-model="filters.nation">
        <template #prefix>
          <nation-icon
            :name="filters.nation"
            :type="'small'"
            :size="size"
          />
        </template>
        <template #default>
          <el-option
            v-for="item in nations"
            :key="item.name"
            :label="item.title"
            :value="item.name"
          >
            <div class="option-wrapper">
              <nation-icon
                :name="item.name"
                :type="'small'"
                :size="size"
              />
              {{ item.title }}
            </div>
          </el-option>
        </template>
      </el-select>
      <el-select v-model="filters.type">
        <template #prefix>
          <vehicle-type-icon
            :name="filters.type"
            :size="size"
          />
        </template>
        <template #default>
          <el-option
            v-for="item in vehicleTypes"
            :key="item.name"
            :label="item.title"
            :value="item.name"
          >
            <div class="option-wrapper">
              <vehicle-type-icon
                :name="item.name"
                :size="size"
              />
              {{ item.title }}
            </div>
          </el-option>
        </template>
      </el-select>
      <el-select v-model="filters.level">
        <template #default>
          <el-option
            v-for="item in levels"
            :key="item.value"
            :label="item.title"
            :value="item.value"
          />
        </template>
      </el-select>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useVehicleQuery, Nation, VehicleType } from '/@/stores/vehicle'
import { loadVehicleTypesList } from '/@/api/vehiclesTypes'
import { loadNationsList } from '/@/api/nations'
import { mapRepos } from 'pinia-orm'
import nomar from 'nomar'
import { AnyNation, AnyVehicleLevel, AnyVehicleType } from '/@/const/vehicles'
import VehicleTypeIcon from './VehicleTypeIcon.vue'
import { NationIcon } from '/@/components/nation'

export default defineComponent({
  components: {
    VehicleTypeIcon,
    NationIcon,
  },
  setup () {
    const filters = useVehicleQuery()

    return {
      size: ref(24),
      filters,
    }
  },
  data () {
    const levels = Array.from({ length: 10 }, (_, index) => ({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      title: `Уровень ${nomar(index + 1)}`,
      value: index + 1,
    }))
    return {
      levels: [AnyVehicleLevel, ...levels],
    }
  },
  computed: {
    ...mapRepos({
      nationRepo: Nation,
      vehicleTypeRepo: VehicleType,
    }),
    nations () {
      return [...this.nationRepo.all()]
    },
    vehicleTypes () {
      return [...this.vehicleTypeRepo.all()]
    },
  },
  beforeMount () {
    loadVehicleTypesList()
    loadNationsList()

    this.nationRepo.save({
      ...AnyNation,
    })
    this.vehicleTypeRepo.save({
      ...AnyVehicleType,
    })
  },
})
</script>

<style scoped lang="scss">
.vehicle-filters {
  padding: 30px 0;
}

:deep(.el-select .el-input .el-input__wrapper),
:deep(.el-select .el-input .el-input__wrapper.is-focus) {
  box-shadow: none !important;
}

.el-form,
.option-wrapper {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7em;
}
</style>
