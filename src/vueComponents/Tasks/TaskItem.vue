<script setup lang="ts">
import { ref } from "vue";
import { useTasksStore, type Task } from "../useTasksStore";

const { task } = defineProps<{
  task: Task;
}>();
const editing = ref(false);
const value = ref(task.text);
const { changeTask, deleteTask } = useTasksStore();

const handleSave = async () => {
  await changeTask(task.id, value.value);
  editing.value = !editing.value;
};
</script>

<template>
  <li>
    <template v-if="editing">
      <input
        type="text"
        :value="value"
        @input="(e) => (value = (e.target as HTMLInputElement).value)"
      />
      <button @click="handleSave">save</button>
    </template>
    <template v-else>
      {{ task.text }} - {{ task.done ? "done" : "undo" }}
      <button @click="() => (editing = !editing)">edit</button>
    </template>
    <button @click="() => deleteTask(task.id)">delete</button>
  </li>
</template>
