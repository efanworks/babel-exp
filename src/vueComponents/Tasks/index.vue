<script setup lang="ts">
import { onMounted } from "vue";
import { useTasksStore } from "../useTasksStore";
import AddTask from "./AddTask.vue";
import TasksList from "./TasksList.vue";

const store = useTasksStore();

onMounted(() => {
  store.fetchTasks();
});
</script>

<template>
  <div>
    <AddTask />
    <TasksList />
  </div>
</template>
