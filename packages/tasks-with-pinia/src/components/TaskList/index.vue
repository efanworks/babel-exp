<script setup lang="ts">
import { useTasksStore } from "../../store";
import TaskItem from "../TaskItem/index.vue";

const store = useTasksStore();
</script>

<template>
  <ul>
    <TaskItem v-for="task in store.tasks" :key="task.id" :task="task" />
  </ul>
</template>
