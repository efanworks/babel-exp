<script setup lang="ts">
import { ref } from 'vue';
import { useTasksStore } from '../../store';

const newTaskText = ref("");
const store = useTasksStore();

const handleTextChange = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  newTaskText.value = target.value;
};

const handleAddTask = async () => {
  if (newTaskText.value.trim()) {
    await store.addTask(newTaskText.value);
    newTaskText.value = "";
  }
};
</script>

<template>
  <input type="text" :value="newTaskText" @input="handleTextChange" />
  <button @click="handleAddTask">add</button>
</template>
