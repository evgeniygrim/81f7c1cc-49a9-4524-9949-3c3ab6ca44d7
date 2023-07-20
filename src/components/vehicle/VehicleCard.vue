<template>
  <div class="vehicle-card" v-if="vehicle">
    <div class="vehicle-content">
      <vehicle-icon :source="vehicle.icons"></vehicle-icon>
      <vehicle-info class="hidden upper" :vehicle-id="vehicleId"></vehicle-info>
      <div class="title upper">{{ vehicle.title }}</div>
      <div class="footer">
        <el-button class="hidden upper" type="primary" @click="showDetails">
          Подробнее
        </el-button>
      </div>
    </div>
  </div>
  <div v-else>undefined</div>
</template>

<script lang="ts">
import { mapRepos } from "pinia-orm";
import { defineComponent, h } from "vue";
import { Nation, Vehicle } from "/@/stores/vehicle";
import { ElMessageBox } from "element-plus";
import VehicleDetails from "./VehicleDetails.vue";
import VehicleIcon from "./VehicleIcon.vue";
import VehicleInfo from "./VehicleInfo.vue";

export default defineComponent({
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
  setup() {
    return {};
  },
  computed: {
    ...mapRepos({
      vehiclesRepo: Vehicle,
      nationRepo: Nation,
    }),
    vehicle() {
      return this.vehiclesRepo.find(this.vehicleId);
    },
    nationColor() {
      const name = this.vehicle?.nationName
      const nation = this.nationRepo.find(name || '');
      
      if (nation?.color) {
        return nation.color;
      } else {
        return '#fff'
      }
    }
  },
  methods: {
    showDetails() {
      ElMessageBox({
        title: this.vehicle?.title,
        message: () => h(VehicleDetails, { vehicleId: this.vehicleId }),
        showConfirmButton: false,
        customClass: "vehicle-details",
      });
    },
  },
});
</script>

<style scoped lang="scss">
.vehicle-content {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: var(--el-menu-base-level-padding);

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    border-color: rgba(255, 255, 255, 0.1);
    border-style: solid;
    border-width: 1px;
    background: linear-gradient(45deg, var(--el-bg-color-page), transparent);
    transition: opacity 0.3s;
    height: calc(100% + var(--el-menu-base-level-padding) * 2);
    width: calc(100% + var(--el-menu-base-level-padding) * 2);
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-65%, -50%) rotate(-15deg);
    // background: linear-gradient(225deg, var(--45be57b0-nationColor), transparent);
    background: linear-gradient(90deg, rgba(2,0,36,0) 15%, v-bind('nationColor') 100%);
    height: calc(60% - var(--el-menu-base-level-padding) * 2);
    width: calc(80% - var(--el-menu-base-level-padding) * 2);
    z-index: -1;
    border-radius: 20px;
    opacity: 0.5;
  }
}
.title {
  text-shadow: 0 0 2px var(--el-bg-color-page);
}
.vehicle-info {
  flex: 1,
}

.vehicle-icon {
    position: absolute;
    height: calc(100% - 60px);
    width: calc(100% - (var(--el-menu-base-level-padding) * 2));
    top: 0;
  }
.vehicle-card {
  height: 100%;
  padding: var(--el-menu-base-level-padding);
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  .upper {
    position: relative;
    z-index: 2;
  }
  .hidden {
    visibility: hidden;
  }

  .el-button {
    width: 50%;
  }

  &:hover {
    overflow: visible;
    .hidden {
      visibility: visible;
    }
    .vehicle-content::after {
      opacity: 1;
      transition: opacity 0.3s;
    }
  }
}
</style>
