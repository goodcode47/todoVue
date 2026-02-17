<script lang="ts" setup>
interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

defineProps<{
  todos: TodoItem[];
}>();

const emit = defineEmits<{
  (e: "toggle", id: number): void;
  (e: "edit", todo: TodoItem): void;
  (e: "delete", id: number): void;
}>();
</script>

<template>
  <ul class="app__todo">
    <li class="app__item" v-for="todo in todos" :key="todo.id">
      <label class="app__label">
        <input
          class="app__checkbox"
          type="checkbox"
          :checked="todo.completed"
          @change="emit('toggle', todo.id)"
        />
        <span
          class="app__text"
          :class="{ 'app__text--completed': todo.completed }"
        >
          {{ todo.title }}
        </span>
      </label>
      <div class="app__controls">
        <button
          class="app__editTodo"
          type="button"
          @click="emit('edit', todo)"
        ></button>
        <button
          class="app__deleteTodo"
          type="button"
          @click="emit('delete', todo.id)"
        ></button>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use "@/sass/_variables.scss" as *;

.app__todo {
  margin: 0 0 60px;
  padding: 0;
  list-style: none;
}

.app__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 20px 10px 0;
  border-bottom: 1px solid $default-purple;
}

.app__label {
  width: 400px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
}

.app__checkbox {
  appearance: none;
  width: 26px;
  height: 26px;
  border: 2px solid $default-purple;
  border-radius: 2px;
  cursor: pointer;

  &:checked {
    background-color: $default-purple;
    background-image: url("/images/check.svg");
    background-position: 50% 30%;
    background-repeat: no-repeat;
  }
}

.app__text {
  transition: all 0.2s ease;

  &--completed {
    text-decoration: line-through;
    color: $light-gray;
  }
}

.app__controls {
  display: flex;
  gap: 20px;
}

.app__editTodo,
.app__deleteTodo {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #cdcdcd;
  mask-position: 50% 50%;
  mask-repeat: no-repeat;
  mask-size: contain;
  cursor: pointer;
}

.app__editTodo {
  mask-image: url("/images/pencil.svg");

  &:hover {
    background-color: $default-purple;
  }
}

.app__deleteTodo {
  mask-image: url("/images/trash.svg");

  &:hover {
    background-color: $default-red;
  }
}

.dark-theme .app__text {
  color: $default-white;
  transition: color 0.3s ease;
}
</style>
