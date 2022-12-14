import create from 'zustand'

export const useStore = create<Store>(set => ({
  count: 1,
  increment: by => set(state => ({ count: state.count + by })),
  decrement: by => set(state => ({ count: state.count - by })),
}))
