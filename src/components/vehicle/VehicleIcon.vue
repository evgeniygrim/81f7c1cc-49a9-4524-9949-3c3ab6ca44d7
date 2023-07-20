<template>
  <div class="vehicle-icon">
    <img
      ref="img"
      :src="src"
      loading="lazy"
      @load="onLoad"
    >
  </div>
</template>

<script lang="ts">
import { type PropType, defineComponent, ref } from 'vue'
import { type VehicleIcons } from '/@/stores/vehicle'

export default defineComponent({
  props: {
    source: {
      type: Object as PropType<VehicleIcons>,
      required: true,
    },
    type: {
      type: String as PropType<keyof VehicleIcons>,
      default: 'medium',
    },
  },
  setup () {
    const height = ref<number>()
    const width = ref<number>()

    return {
      height,
      width
    }
  },
  computed: {
    src () {
      return this.source[this.type]
    },
    style () {
      const { height, width } = this.normalizeImageSize()
      return {
        height,
        width
      }
    }
  },
  methods: {
    onLoad (e: Event) {
      if (e.target != null) {
        const img = e.target as HTMLImageElement
        this.height = img.naturalHeight
        this.width = img.naturalWidth
      }
    },
    normalizeImageSize () {
      if (Number.isInteger(this.height) && Number.isInteger(this.width)) {
        const height = this.$el.offsetHeight
        const width = this.$el.offsetWidth
        const naturalHeight = this.height as number
        const naturalWidth = this.width as number

        const ratio = height / width
        const naturalRatio = naturalHeight / naturalWidth

        if (ratio >= naturalRatio) {
          return {
            height: 'auto',
            width: '100%'
          }
        } else {
          return {
            height: '100%',
            width: 'auto',
          }
        }
      } else {
        return {
          height: '100%',
          width: 'auto',
        }
      }
    }
  }
})
</script>

<style scoped lang="scss">
  .vehicle-icon {
    display: inline-flex;
    align-content: center;
    justify-content: center;
  }
  img {
    height: v-bind('style.height');
    width: v-bind('style.width');
  }
</style>
