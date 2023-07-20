<template>
  <div class="nation-icon" v-if="nation">
    <div class="wrapper-icon">
      <img :src="src" :alt="nation.title">
    </div>

    <div v-if="withTitle"> {{ nation.title }}</div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { Nation, NationIcons } from '/@/stores/vehicle';
import { mapRepos } from 'pinia-orm';

export default defineComponent({
  props: {
    name: {
      type: String as PropType<Nation['name']>,
      required: true,
    },
    type: {
      type: String as PropType<keyof NationIcons>,
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
  computed: {
    ...mapRepos({
      nationRepo: Nation
    }),
    nation() {
      return this.nationRepo.find(this.name);
    },
    src() {
      return this.nation?.icons[this.type];
    },
    style() {
      return {
        size: this.size ? this.size + 'px' : '1em',
      }
    }
  }
})
</script>

<style scoped lang="scss">
  $icon-size: v-bind('style.size');
  .nation-icon {
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