<script setup lang="ts">
import { onMounted } from "vue";
import { useTasksStore } from "../../store";
import AddTask from "../AddTask/index.vue";
import TasksList from "../TaskList/index.vue";

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
