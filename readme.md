# BoilerPlate Vite
With EsLint, Vitest, React, Typescript, SCSS, TanStack Query, Zustand and Husky

### TODO
- [x] [Lint Staged](https://www.youtube.com/watch?v=oWty0Nw1ydk&ab_channel=LeighHalliday) 
- [] Config Commitlint for fonctionnal Prompt 'Desc ok but no enum'
- [] Absolute Path ???
- [] React Router Dom ???

## Getting Started
___

**Install**
```
pnpm i
```

**Dev**
```
pnpm dev
```

**Build**
```
pnpm build
```

**Test**
```
pnpm test
```


## TanStack Query
___
[Docs v4](https://tanstack.com/query/v4)
### Example

**Query**
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FetchData } from './components/FetchData'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <>
      <h1>App</h1>
      <QueryClientProvider client={queryClient}>
        <FetchData />
      </QueryClientProvider>
    </>
  )
}
```
```tsx
import { useQuery } from '@tanstack/react-query'


export const FetchData = () => {
  const urlGet = 'http://bot-habitat/wp-json/chatbot/data'
  const { isLoading, error, data } = useQuery(
    ['message'],
    async () => await fetch(urlGet).then((res: any) => res.json())
  )

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>An error has occurred: {(error as any).message}</p>

  return (
    <>
      {data.map((message: Data) => (
        <div key={message.id} id='message'>
          <p>{message.content}</p>
          <p>{message.type}</p>
          <p>{message.idParent}</p>
        </div>
      ))}
    </>
  )
}
```

**Mutation**
```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const FetchData = () => {
  const urlDelete = 'http://bot-habitat/wp-json/chatbot/delete?'
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    (id: string) =>
      fetch(`${urlDelete}${new URLSearchParams({ id: id })}`, {
        method: 'DELETE',
      }),
    {
      onMutate: () => {
        console.log('onMutate')
        console.log(queryClient.invalidateQueries(['message']))
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['message'])
      },
    }
  )

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>An error has occurred: {(error as any).message}</p>

  return (
    <>
      {data.map((message: Data) => (
        <div key={message.id} id='message'>
          <span onClick={() => mutate(message.id)}>
            X
          </span>
          <p>{message.content}</p>
          <p>{message.type}</p>
          <p>{message.idParent}</p>
        </div>
      ))}
    </>
  )
}

```

## Zustand
___
[Doc](https://github.com/pmndrs/zustand)

**Example**

> *store.ts*
```ts
import create from 'zustand'

interface Store {
  count: number
  increment: (by: number) => void
  decrement: (by: number) => void
}

export const useStore = create<Store>(set => ({
  count: 0,
  increment: by => set(state => ({ count: state.count + by })),
  decrement: by => set(state => ({ count: state.count - by })),
}))

```

> *App.tsx*
```ts
import { useStore } from './hooks/store'

export const App = () => {
  const { count, increment, decrement } = useStore()
  return (
    <>
      <h2>Store</h2>
      <p>Store count: {count}</p>
      <button onClick={() => increment(2)}>Increment By 2</button>
      <button onClick={() => decrement(2)}>Decrement By 2</button>
    </>
  )
}
```