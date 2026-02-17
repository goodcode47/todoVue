<script lang="ts" setup>
type FilterType = "all" | "complete" | "incomplete";

defineProps<{
  modelValue: FilterType;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: FilterType): void;
  (e: "change", value: FilterType): void;
}>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const value = target.value as FilterType;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>

<template>
  <select class="app__select" :value="modelValue" @change="handleChange">
    <option value="all">All</option>
    <option value="complete">Complete</option>
    <option value="incomplete">Incomplete</option>
  </select>
</template>

<style scoped lang="scss">
@use "@/sass/_variables.scss" as *;

.app__select {
  padding: 5px 10px;
  text-transform: uppercase;
  color: $default-white;
  background-color: $primary-purple;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
