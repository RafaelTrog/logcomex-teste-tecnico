import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Sidebar from '../Sidebar.vue'

describe('Sidebar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Sidebar, {
      props: {
        tags: ['work', 'study', 'entertainment', 'family'],
        hideDoneTasks: false
      }
    })
  })

  it('renders tag buttons', () => {
    const tagButtons = wrapper.findAll('button')
    expect(tagButtons.length).toBe(4)

    wrapper.props().tags.forEach((tag, index) => {
      expect(tagButtons[index].text()).toBe(tag)
    })
  })

  it('renders done checkbox with its label', () => {
    const checkbox = wrapper.find('input[type="checkbox"]')
    const label = wrapper.find('label')

    expect(checkbox.exists()).toBe(true)
    expect(checkbox.element.checked).toBe(false)
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Hide Done Tasks')
  })

})