import LTextVue from "@/components/LText/LText.vue"
import { textDefaultProps } from "@/defaultProps"
import {shallowMount} from '@vue/test-utils'

describe("LText.vue", () => {
  const {location} = window
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {href: ''}
    })
  })
  afterEach(() => {
    window.location = location
  })
  it('default LText render', () => {
    const msg = 'test'
    const props = {
      ...textDefaultProps,
      text: msg
    }
    const wrapper = shallowMount(LTextVue, {props})

    // should have the right text
    expect(wrapper.text()).toBe(msg)
    // should be default div tag
    expect(wrapper.element.tagName).toBe("DIV")
    // should have certain css attr
    const style = wrapper.attributes().style
    console.log(style)
    expect(style.includes('font-size')).toBeTruthy()
    // should not have prop has been filtered
    expect(style.includes('actionType')).toBeFalsy()
  })
  it('LText with actionType and URL should trigger location href change', async () => {
    const props = {
      ...textDefaultProps,
      actionType: 'url',
      url: 'http://dummy.url',
      tag: 'h2'
    }
    const wrapper = shallowMount(LTextVue, { props })
    expect(wrapper.element.tagName).toBe('H2')
    await wrapper.trigger('click')
    expect(window.location.href).toBe(props.url)
  })
  it('LText with isEditing should not trigger location href change', async () => {
    const props = {
      ...textDefaultProps,
      actionType: 'url',
      url: 'http://dummy.url',
      tag: 'h2',
      isEditing: true
    }
    const wrapper = shallowMount(LTextVue, {props})
    await wrapper.trigger('click')
    expect(window.location.href).not.toBe(props.url)
  })
})

