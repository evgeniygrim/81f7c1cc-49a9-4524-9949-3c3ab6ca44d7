<template>
  <div class="header">
    <a href="/" class="logo">
      <img src="/@/assets/logo.svg" alt="warships">
    </a>
    <el-button @click="reg" :type="'primary'" :size="'large'">Регистрация</el-button>
  </div>
</template>

<script setup>
import {REG_URL} from '/@/const/registration.ts'

  const reg = () => {
    window.open(REG_URL,'_blank');
  }
</script>

<style lang="scss" scoped>
  .logo {
    display: block; 
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