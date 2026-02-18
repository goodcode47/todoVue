<script lang="ts" setup></script>

<template>
  <header class="app__header">Todo list</header>
</template>

<style scoped lang="scss">
@use "@/sass/_variables.scss" as *;

.app__header {
  padding: 20px 40px;
  font-size: 26px;
  line-height: 34px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}

.dark-theme .app__header {
  color: $default-white;
  transition: color 0.3s ease;
}
</style>
