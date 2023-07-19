<template>
  <div class="vehicle">
    <div class="vehicle-card" v-if="vehicle">
      <div class="vehicle-holer">
        <div class="vehicle-icon">
          <img :src="vehicle.icons.medium">
        </div>
      </div>
      <div class="vehicle-footer">
        <div class="vehicle-footer-inner">
          <div>{{ vehicle.title }}</div>
          <el-button class="hidden" type="primary" @click="showDetails"> details </el-button>
        </div>
      </div>
    </div>
    <div v-else>undefined</div>
  </div>
</template>

<script lang="ts">
import { mapRepos } from 'pinia-orm';
import { defineComponent, h } from 'vue';
import { Vehicle } from '/@/stores/vehicle';
import { ElMessageBox } from 'element-plus'
import VehicleDetails from './VehicleDetails.vue';

export default defineComponent({
  props: {
    id: {
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
    }),
    vehicle() {
      return this.vehiclesRepo.find(this.id);
    },
  },
  methods: {
    showDetails() {
      const vehicle = this.vehicle;
      if (vehicle) {
        ElMessageBox({
          title: vehicle.title,
          message: () => h(VehicleDetails, {id: vehicle.id}),
          showConfirmButton: false,
          customClass: 'vehicle-details'
        })
      }
    },
  },
});
</script>

<style scoped lang="scss">
.vehicle {
  $vehicle-padding: 16px;

  padding: $vehicle-padding;
  overflow: hidden;
  box-sizing: border-box;
  .hidden {
    visibility: hidden;
  }
  
  &:hover {
    overflow: visible;

    .hidden {
      visibility: visible;
    }

    .vehicle-holer,
    .vehicle-footer {
      &::after {
        opacity: 1;
        border-color: rgba(255, 255, 255, 0.1);
        border-style: solid;
      }
    }
    .vehicle-holer {
      &::after {
        transform: translate(-50%, $vehicle-padding + 1px);
        border-width: 1px 1px 0 1px;
        background: linear-gradient(
          180deg,
          #0f0f0b 0%,
          rgba(15, 15, 11, 0.5) 100%
        );
      }
    }
    .vehicle-footer {
      &::after {
        transform: translate(-50%, 0);
        border-width: 0 1px 1px 1px;
        background: linear-gradient(
          0deg,
          #0f0f0b 0%,
          rgba(15, 15, 11, 0.5) 100%
        );
      }
    }
  }

  &-holer {
    position: relative;
  }

  &-footer {
    position: relative;
  }

  .vehicle-holer,
  .vehicle-footer {
    &::after {
      width: calc(100% + $vehicle-padding * 2);
      height: calc(100% + $vehicle-padding);
      opacity: 0;
      position: absolute;
      top: 0;
      left: 50%;
      content: "";
      transition: opacity 0.2s;
      z-index: 1;
    }

    &-inner {
      position: relative;
      z-index: 2;
    }

    .el-button {
      width: 50%;
    }
  }

  .vehicle-icon {
    height: 211px;
    &>img {
      width: 100%;
    }
  }
}
</style>
