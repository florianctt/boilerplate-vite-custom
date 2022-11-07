/// <reference types="vite/client" />

interface Data {
  id: string
  content: string
  type: string
  idParent: string
}

interface Store {
  count: number
  increment: (by: number) => void
  decrement: (by: number) => void
}
