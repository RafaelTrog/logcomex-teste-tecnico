<template>
  <TaskModal v-model="showEditModal" :task="task" />
  <div class="mg bg-yellow px-5 py-3 flex flex-col gap-3 shadow rounded-md text-darkGray w-full h-fit">
    <div class="flex justify-between items-center">
      <span :class="{ 'line-through': task.done }" class="font-bold text-xl max-w-[80%] truncate">
        {{ task.title }}
      </span>
      <DropdownMenu>
        <template #trigger>
          <button class="-mr-2">
            <DotsIcon color="#B2AFA1" />
          </button>
        </template>
        <template #options>
          <button @click="showEditModal = true" class="w-full rounded-none px-6 text-lightGray">Edit...</button>
          <button class="w-full rounded-none px-6 text-lightGray" @click="deleteTask">Delete...</button>
        </template>
      </DropdownMenu>
    </div>
    <p :class="{ 'line-through': task.done }">
      {{ task.description }}
    </p>
    <div class="flex items-center justify-between">
      <div class="flex gap-2 items-center">
        <div v-for="tag in task.tags" :key="tag" :class="['w-8 h-8 rounded-full', tagsConfig[tag as TagType]]"></div>
      </div>
      <div class="flex gap-2 items-center">
        <input type="checkbox" :id="`done-${task.title}`" :checked="task.done" @change="toggleCompletion" />
        <label :for="`done-${task.title}`" class="font-bold cursor-pointer">Done</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw, ref, reactive } from 'vue';
import type { PropType } from 'vue';
import { useTasksStore } from '../store/tasks';
import type { TaskType } from '../store/tasks'
import DotsIcon from './icons/DotsIcon.vue'
import { tagsConfig } from './utils/tagsConfig';
import TaskModal from '../components/TaskModal.vue';
import DropdownMenu from './DropdownMenu.vue'
import type { TagType } from './Tag.vue';

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<TaskType>,
      required: true
    }
  },
  components: {
    DotsIcon,
    TaskModal,
    DropdownMenu
  },
  setup(props) {
    const showEditModal = ref(false)
    const tasksStore = useTasksStore()

    const rawTags = reactive(toRaw(props.task.tags));

    const toggleCompletion = () => {
      tasksStore.toggleTaskCompletion(props.task)
    }

    const deleteTask = () => {
      tasksStore.removeItem(props.task)
    }

    return { showEditModal, toggleCompletion, rawTags, tagsConfig, deleteTask }
  }
})
</script>