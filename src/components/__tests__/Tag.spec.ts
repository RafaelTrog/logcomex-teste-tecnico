import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Tag from '../Tag.vue'

describe('Tag', () => {

  it('renders properly', () => {
    const wrapper = mount(Tag, {
      props: {
        type: "study"
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('selects tag when clicked', async () => {
    const wrapper = mount(Tag, {
      props: {
        type: "work"
      }
    })

    expect(wrapper.vm.selected).toBe(false)

    await wrapper.trigger('click')

    expect(wrapper.vm.selected).toBe(true)
  })
})