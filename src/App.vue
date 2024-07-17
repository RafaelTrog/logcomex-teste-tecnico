<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { useTasksStore } from './store/tasks';
import type { TaskType } from './store/tasks';
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import TaskList from './components/TaskList.vue'
import TaskModal from './components/TaskModal.vue'

export default defineComponent({
  components: {
    Header,
    Sidebar,
    TaskList,
    TaskModal
  },
  setup() {
    const showModal: Ref<boolean> = ref(false)
    const tasksStore = useTasksStore()
    const hideDoneTasks: Ref<boolean> = ref(false)
    const selectedTags = reactive<Set<string>>(new Set<string>)

    const toggleTag = (tag: string): void => {
      if (selectedTags.has(tag)) {
        selectedTags.delete(tag)
      } else {
        selectedTags.add(tag)
      }
    }

    const filteredTasks: ComputedRef<TaskType[]> = computed(() => {
      return tasksStore.tasks.filter(task => {
        const matchesTags = Array.from(selectedTags).every(tag => task.tags.includes(tag))
        return (!hideDoneTasks.value || !task.done) && matchesTags
      })
    });

    return { showModal, hideDoneTasks, filteredTasks, toggleTag }
  }
})
</script>

<template>
  <Header @show-modal="showModal = true" />
  <div class="flex gap-10 lg:gap-20 h-full flex-col lg:flex-row">
    <Sidebar :tags="['work', 'study', 'entertainment', 'family']" :hide-done-tasks="hideDoneTasks"
      @toggle-tag="toggleTag" @update:hideDoneTasks="hideDoneTasks = $event" />
    <TaskList :tasks="filteredTasks" />
    <TaskModal v-model="showModal" />
  </div>
</template>
