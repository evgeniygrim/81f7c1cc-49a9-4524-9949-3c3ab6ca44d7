<template>
  <div class="main-layout">
    <header class="main-header">
      <MainHeader />
    </header>
    <main class="main-content">
      <router-view />
    </main>
    <footer>
      <MainFooter />
    </footer>
  </div>
</template>

<script lang="ts">
import MainHeader from './MainHeader.vue'
import MainFooter from './MainFooter.vue'
export default {
  components: {
    MainHeader,
    MainFooter,
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  $bg: #{var(--el-bg-color-page)};
  .main-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 600px) {
      padding: 0;
    }
  }
  .main-header {
    background-color: $bg
  }
  .main-content {
    flex: 1;
    max-width: 1600px;
    width: 100%;
    margin: 0 auto;
  }
</style>
