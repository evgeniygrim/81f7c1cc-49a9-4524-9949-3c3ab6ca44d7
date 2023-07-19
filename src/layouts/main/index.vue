<template>
  <div class="main-layout">
    <header class="main-header">
      <Header></Header>
    </header>
    <main class="main-content">
      <router-view></router-view>
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script lang="ts">
import Header from './header.vue'
import Footer from './footer.vue'
export default {
  components: {
    Header,
    Footer,
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  $bg: #{var(--el-bg-color-overlay)};
  .main-layout {
    min-height: 100vh;
    display: flex;
  }
  .main-header {
    background-color: $bg
  }
  .main-content {
    flex: 1;
  }
</style>