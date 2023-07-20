import { defineStore } from 'pinia'

export interface ErrorsState {
  message: string | null
  category: string | null
  fields: unknown
}

const initial: ErrorsState = {
  message: null,
  category: null,
  fields: { input: {} }
}

export const useErrorsStore = defineStore('errors', {
  state: () => initial,
})
