<template>
  <div class="header">
    <a
      href="/"
      class="logo"
    >
      <img
        src="/@/assets/logo.svg"
        alt="warships"
      >
    </a>
    <el-button
      :type="'primary'"
      :size="'large'"
      @click="() => reg()"
    >
      Регистрация
    </el-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { REG_URL } from '/@/const/registration.ts'

export default defineComponent({
  methods: {
    reg () {
      window.open(REG_URL, '_blank')
    }
  }
})
</script>

<style lang="scss" scoped>
  .logo {
    display: block
  }
  .header {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    max-width: 1600px;
    margin: 0 auto;
    padding: 20px 50px;
    justify-content: space-between;
    align-items: center;
  }
</style>
