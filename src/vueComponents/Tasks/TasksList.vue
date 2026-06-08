<script setup lang="ts">
import { useTasksStore } from "../useTasksStore";
import TaskItem from "./TaskItem.vue";

const store = useTasksStore();
</script>

<template>
  <ul>
    <TaskItem v-for="task in store.tasks" :key="task.id" :task="task" />
  </ul>
</template>
