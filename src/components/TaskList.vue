<template>
  <div :class="['tasks-container flex-none lg:flex-1 flex gap-5 flex-wrap md:grid grid-cols-2 xl:grid-cols-3 h-fit md:pr-5', {
    'items-center justify-center': tasks.length === 0
  }]">
    <TaskCard v-for="task in tasks" :key="task.title" :task="task" />
    <span v-if="tasks.length === 0">There are no tasks</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import TaskCard from './TaskCard.vue';
import type { TaskType } from '../store/tasks';

export default defineComponent({
  components: {
    TaskCard
  },
  props: {
    tasks: {
      type: Array as PropType<TaskType[]>,
      required: true
    }
  }
});
</script>
