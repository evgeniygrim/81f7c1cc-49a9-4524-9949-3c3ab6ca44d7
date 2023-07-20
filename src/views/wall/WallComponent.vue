<template>
  <div class="wall">
    <div class="wrapper">
      <div class="filter-container">
        <VehicleFilters></VehicleFilters>
      </div>
      <RecycleScroller
        :class="'scroller'"
        :page-mode="true"
        :items="vehicleIds"
        :grid-items="gridItems"
        :item-size="itemSize"
        :item-secondary-size="itemSecondarySize"
        :buffer="itemSize * 2"
        v-slot="{ item }"
        @resize="resizeHandler"
      >
      <article class="item">
        <vehicle-card :vehicle-id="item.id"></vehicle-card>
      </article>
      </RecycleScroller>
      <el-button :icon="Top" class="scroll-to" :class="showToTop ? 'show' : 'hide'" @click="handleToTop"></el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useVehicleQuery } from '/@/stores/vehicle';
import { VehicleCard, VehicleFilters } from '/@/components/vehicle'
import { DynamicSizeList } from 'element-plus';
import { Top } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    VehicleCard,
    VehicleFilters,
    DynamicSizeList,
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  setup() {
    const vehicleQuery = useVehicleQuery();
    const gridItems = ref<number>(1);
    const itemSize = ref<number>(360);
    const itemSecondarySize = ref<number>(480);
    const showToTop = ref(false);

    return {
      itemSize,
      itemSecondarySize,
      gridItems,
      showToTop,
      vehicleQuery,
      Top,
    }
  },
  beforeMount() {
    this.vehicleQuery.loadVehicles();
  },
  computed: {
    vehicleIds() {
      return  this.vehicleQuery.ids;
    },
    styles() {
      return {
        itemWidth: this.itemSecondarySize + 'px',
        itemHeight: this.itemSize + 'px',
        wrapperWidth: (this.itemSecondarySize * this.gridItems) + 'px',
      }
    }
  },
  mounted() {
    this.resizeHandler()
  },
  methods: {
    handleScroll() {
      this.showToTop = window.scrollY > document.documentElement.clientHeight
    },
    handleToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    resizeHandler() {
      const el: HTMLElement = this.$el;
      const width = el.offsetWidth;

      switch (true) {
        case width / 3 > this.itemSecondarySize: {
          this.gridItems = 3
          break;
        }
        case width / 2 > this.itemSecondarySize: {
          this.gridItems = 2
          break;
        }
        default: {
          this.gridItems = 1;
        }
      }
    }
  }
});
</script>

<style scoped lang="scss">
:deep(.vue-recycle-scroller__item-wrapper) {
  overflow: visible;
}
:deep(.vue-recycle-scroller__item-view.hover) {
  z-index: 1000;
}
.item {
  box-sizing: border-box;
  width: v-bind('styles.itemWidth');
  height: v-bind('styles.itemHeight');
}
.wrapper {
  margin: 0 auto;
  width: v-bind('styles.wrapperWidth');
}
.wrapper,
.scroller {
  height: 100%;
}
.scroller {
  flex: 1;
  padding-top: 30px;
}

.scroll-to {
  position: fixed;
  right: 0;
  bottom: 40px;
  opacity: 0;
  &.show {
    transition: opacity 0.2s;
    opacity: 1;
  }
  &.hide {
    transition: opacity 0.2s;
  }
  
}
</style>
