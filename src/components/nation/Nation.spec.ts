import { createPinia, setActivePinia } from 'pinia'
import NationIcon from './NationIcon.vue'
import {mount, shallowMount} from '@vue/test-utils'
import {createORM, useRepo} from 'pinia-orm';
import {Nation} from '/@/stores/vehicle';
import { createApp } from 'vue';
import { get } from 'lodash';

const initial = {
  name: 'japan',
  title: 'Japan',
  color: '#fff',
  icons: {
    default: '//test_url'
  }
}

const props = {
  name: initial.name,
  type: 'default',
  size: 24
}

const app = createApp({})
const pinia = createPinia().use(createORM())
const repo = useRepo(Nation)

app.use(pinia)
repo.save([initial])
  
describe('NationIcon', () => {
  beforeEach(() => {
    setActivePinia(pinia)
  })
  it('renders nation icon without title', () => {
    const wrapper = shallowMount(NationIcon, {
      props: {...props, withTitle: false} as any, 
    })
    // Проверяем наличие элементов в компоненте
    expect(wrapper.find('.nation-icon').exists()).toBe(true)
    expect(wrapper.find('.wrapper-icon').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)

    // Проверяем значения атрибутов
    expect(wrapper.find('img').attributes('src')).toBe(initial.icons.default)
    expect(wrapper.find('img').attributes('alt')).toBe(initial.title)

    // Проверяем верность расчета стиля
    expect(get(wrapper.vm, 'style')).toEqual({size: `${props.size}px`});
  })
})

describe('NationIcon', () => {
  beforeEach(() => {
    setActivePinia(pinia)
  })
  it('renders nation icon with title', () => {
    const wrapper = mount(NationIcon, {
      props: {...props, withTitle: true} as any, 
    })

    // Проверяем наличие элементов в компоненте
    expect(wrapper.find('.nation-icon').exists()).toBe(true)
    expect(wrapper.find('.wrapper-icon').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('.nation-icon div').exists()).toBe(true)

    // Проверяем значения атрибутов
    expect(wrapper.find('img').attributes('src')).toBe(initial.icons.default)
    expect(wrapper.find('img').attributes('alt')).toBe(initial.title)

    // Проверяем верность расчета стиля
    expect(get(wrapper.vm, 'style')).toEqual({size: `${props.size}px`});
  })
})

describe('NationIcon', () => {
  beforeEach(() => {
    setActivePinia(pinia)
  })
  it('renders nation icon without specified size', () => {
    const wrapper = mount(NationIcon, {
      props: {...props, size: undefined} as any, 
    })

    // Проверяем значения стилей по умолчанию
    expect(get(wrapper.vm, 'style')).toEqual({size: '1em'});
  })
})
