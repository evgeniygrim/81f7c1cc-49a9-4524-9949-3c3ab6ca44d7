import { defineStore } from "pinia";

export interface ErrorsState {
  message: string | null,
  category: string | null,
  fields: any
}

export const useErrorsStore = defineStore("errors", {
  state: () => ({
    message: null,
    category: null,
    fields: { input: {} },
  } as ErrorsState),
});