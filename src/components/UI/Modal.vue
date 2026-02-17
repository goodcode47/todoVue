<script lang="ts" setup>
import { ref, watch } from "vue";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const props = defineProps<{
  isOpen: boolean;
  mode?: "add" | "edit";
  todo?: TodoItem | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "add", title: string): void;
  (e: "edit", title: string): void;
}>();

const todoTitle = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      if (props.mode === "edit" && props.todo) {
        todoTitle.value = props.todo.title;
      } else {
        todoTitle.value = "";
      }
      setTimeout(() => {
        inputRef.value?.focus();
      }, 100);
    }
  },
);

watch(
  () => props.todo,
  (newTodo) => {
    if (newTodo && props.mode === "edit") {
      todoTitle.value = newTodo.title;
    }
  },
);

const handleClose = () => {
  emit("close");
  todoTitle.value = "";
};

const handleSubmit = () => {
  const trimmedTitle = todoTitle.value.trim();

  if (trimmedTitle) {
    if (props.mode === "edit") {
      emit("edit", trimmedTitle);
    } else {
      emit("add", trimmedTitle);
    }
    handleClose();
  } else {
    alert("Please enter a note title");
  }
};
</script>

<template>
  <div
    class="app__modal"
    :class="{ 'app__modal--open': isOpen }"
    @click.self="handleClose"
  >
    <form class="app__form form" @submit.prevent="handleSubmit">
      <h2 class="form__heading">
        {{ mode === "edit" ? "Edit Note" : "New Note" }}
      </h2>
      <input
        class="form__input"
        :placeholder="
          mode === 'edit' ? 'Edit your note...' : 'Input your note...'
        "
        type="text"
        v-model="todoTitle"
        ref="inputRef"
      />
      <div class="form__controls">
        <button class="form__cancel" type="button" @click="handleClose">
          Cancel
        </button>
        <button class="form__submit" type="submit">
          {{ mode === "edit" ? "Save" : "Add" }}
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "@/sass/_variables.scss" as *;

.app__modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: #00000080;
  z-index: 1000;

  &--open {
    display: flex;
  }
}

.form {
  display: flex;
  flex-direction: column;
  position: relative;
  background: $default-white;
  width: 500px;
  height: 280px;
  padding: 18px 30px;
  box-sizing: border-box;
  border-radius: 16px;
}

.form__heading {
  margin: 0 0 25px;
  text-align: center;
  text-transform: uppercase;
}

.form__input {
  width: 440px;
  height: 39px;
  box-sizing: border-box;
  border: 1px solid $default-purple;
  border-radius: 5px;
  outline: none;
  padding: 2px 10px;
}

.form__controls {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.form__cancel,
.form__submit {
  display: block;
  width: 107px;
  height: 38px;
  box-sizing: border-box;
  background: none;
  border: none;
  border: 1px solid $default-purple;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 500;
}

.form__cancel {
  color: $default-purple;
}

.form__submit {
  color: $default-white;
  background-color: $default-purple;
}

.dark-theme .form {
  background-color: $default-black;
  border: 1px solid $default-white;
}

.dark-theme .form__heading {
  color: $default-white;
}

.dark-theme .form__input {
  color: $default-white;
  background-color: $default-black;
  border-color: $default-white;
}
</style>
