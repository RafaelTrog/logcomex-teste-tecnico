import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskCard from '../TaskCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { createPinia, setActivePinia } from 'pinia'
import { useTasksStore } from '@/store/tasks'
import { testTask } from './utils'

describe('TaskCard', () => {
  let store;

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    store = useTasksStore()
    store.addItem(testTask)
  })

  it('renders properly', () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: testTask
      }
    })

    expect(wrapper.exists()).toBe(true)

    expect(wrapper.text()).toContain(testTask.title)

    expect(wrapper.text()).toContain(testTask.description)
  })

  it('renders properly when task is set in the store', () => {
    const wrapper = mount(TaskCard, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn
          })
        ]
      },
      props: {
        task: store.tasks[0]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
