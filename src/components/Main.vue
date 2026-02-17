<script lang="ts" setup>
import Button from "./Button.vue";
import Search from "./Search.vue";
import Select from "./Select.vue";
import Modal from "./UI/Modal.vue";
import Todo from "./Todo.vue";
import { ref, computed, watch } from "vue";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

type FilterType = "all" | "complete" | "incomplete";
type ModalMode = "add" | "edit";

const todos = ref<TodoItem[]>([
  {
    id: 1,
    title: "Go for a walk",
    completed: false,
  },
  {
    id: 2,
    title: "Buy milk",
    completed: true,
  },
]);

const searchQuery = ref("");
const filterType = ref<FilterType>("all");
const modalOpen = ref(false);
const modalMode = ref<ModalMode>("add");
const editingTodo = ref<TodoItem | null>(null);
const isDarkTheme = ref(false);

watch(isDarkTheme, (newValue) => {
  if (newValue) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
});

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
};

const filteredTodos = computed(() => {
  let filtered = todos.value;

  if (searchQuery.value) {
    filtered = filtered.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }

  switch (filterType.value) {
    case "complete":
      return filtered.filter((todo) => todo.completed);
    case "incomplete":
      return filtered.filter((todo) => !todo.completed);
    default:
      return filtered;
  }
});

const handleModalOpen = (mode: ModalMode = "add", todo?: TodoItem) => {
  modalMode.value = mode;
  if (mode === "edit" && todo) {
    editingTodo.value = { ...todo };
  } else {
    editingTodo.value = null;
  }
  modalOpen.value = true;
};

const handleModalClose = () => {
  modalOpen.value = false;
  editingTodo.value = null;
};

const handleAddTodo = (title: string) => {
  const newTodo: TodoItem = {
    id: Date.now(),
    title: title,
    completed: false,
  };

  todos.value = [newTodo, ...todos.value];
};

const handleEditTodo = (title: string) => {
  if (editingTodo.value) {
    todos.value = todos.value.map((todo) =>
      todo.id === editingTodo.value?.id ? { ...todo, title } : todo,
    );
  }
};

const handleDeleteTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
};

const handleFilterChange = (filter: FilterType) => {
  filterType.value = filter;
};

const handleToggleTodo = (id: number) => {
  todos.value = todos.value.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
};
</script>

<template>
  <main>
    <nav class="app__nav nav">
      <Search @search="handleSearch" />
      <Select
        :modelValue="filterType"
        @update:modelValue="handleFilterChange"
        @change="handleFilterChange"
      />
      <Button class="app__themeChange" @click="toggleTheme" />
    </nav>

    <Todo
      :todos="filteredTodos"
      @toggle="handleToggleTodo"
      @edit="handleModalOpen('edit', $event)"
      @delete="handleDeleteTodo"
    />

    <button class="app__add" @click="handleModalOpen('add')"></button>
  </main>

  <Modal
    :isOpen="modalOpen"
    :mode="modalMode"
    :todo="editingTodo"
    @close="handleModalClose"
    @add="handleAddTodo"
    @edit="handleEditTodo"
  />
</template>

<style scoped lang="scss">
@use "@/sass/_variables.scss" as *;

.app__nav {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.app__themeChange {
  display: block;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 5px;
  background-color: $default-purple;
  background-image: url("/images/moon.svg");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover {
    background-color: $primary-purple;
  }
}

.dark-theme .app__themeChange {
  background-image: url("/images/light.svg");
}

.app__add {
  display: block;
  width: 50px;
  height: 50px;
  background-color: $default-purple;
  border: none;
  border-radius: 50%;
  background-image: url("/images/plus.svg");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover {
    background-color: $primary-purple;
  }
}
</style>
