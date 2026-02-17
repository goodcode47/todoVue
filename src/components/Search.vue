<script lang="ts" setup>
const emit = defineEmits<{
  (e: "search", value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("search", target.value);
};
</script>

<template>
  <input
    class="app__search"
    type="text"
    @input="handleInput"
    placeholder="Search note..."
  />
</template>

<style scoped lang="scss">
@use "@/sass/_variables.scss" as *;

.app__search {
  width: 560px;
  height: 38px;
  padding: 11px 400px 11px 16px;
  font-family: inherit;
  font-size: 16px;
  line-height: 20px;
  border: 1px solid $default-purple;
  border-radius: 5px;
  box-sizing: border-box;
  background-image: url("/images/search.svg");
  background-position: 97% 50%;
  background-repeat: no-repeat;
  outline: none;
}

.dark-theme .app__search {
  color: $default-white;
  background-color: $default-black;
  border-color: $default-white;
}
</style>
