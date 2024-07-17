import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'

export type TaskType = {
  title: string
  description: string
  done?: boolean
  tags: string[]
}

export const useTasksStore = defineStore({
  id: 'tasks',
  state: () => ({
    tasks: useStorage('tasks', [] as TaskType[])
  }),
  getters: {
    // tasksCount(state) {
    //   return state.tasks.length
    // }
  },
  actions: {
    addItem(newTask: TaskType) {
      const taskIndex = this.tasks.findIndex(task => task.title === newTask.title || task.description === newTask.description)
      if (taskIndex < 0 ) {
        this.tasks.push(newTask)
      }
    },
    editItem(taskToEdit: TaskType, newTask: TaskType) {
      const taskIndex = this.tasks.findIndex(task => task === taskToEdit)
      if (taskIndex > -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...newTask }
      }
    },
    toggleTaskCompletion(taskToUpdate: TaskType) {
      const taskIndex = this.tasks.findIndex(task => task === taskToUpdate)
      if (taskIndex > -1) this.tasks[taskIndex].done = !this.tasks[taskIndex].done
    },
    removeItem(taskToRemove: TaskType) {
      const taskIndex = this.tasks.findIndex(task => task === taskToRemove)
      if (taskIndex > -1) this.tasks.splice(taskIndex, 1)
    }
  }
})