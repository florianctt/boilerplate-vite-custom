# BoilerPlate Vite
With EsLint, Vitest, React, Typescript, SCSS, TanStack Query, Zustand and Husky

### TODO
- [x] [Lint Staged](https://www.youtube.com/watch?v=oWty0Nw1ydk&ab_channel=LeighHalliday) 
- [x] Config Commitlint for fonctionnal Prompt
- [x] Absolute Path
- [] React Router Dom


<h2 style="color: #7743DB">Menu</h2>
<ul>
  <li><a href="#getting-started" style="color: olive;">Getting Started</a></li>
  <li><a href="#tanstack" style="color: olive;">TanStack Query</a></li>
  <li><a href="#zustand" style="color: olive;">Zustand</a></li>
  <li><a href="#commit" style="color: olive;">Commit</a></li>
  <li><a href="#absolute-path" style="color: olive;">Absolute Path</a></li>
</ul>

<h2 id="getting-started" style="color: #7743DB">Getting Started</h2>


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


<h2 id="tanstack" style="color: #7743DB">TanStack Query</h2>
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

<h2 id="zustand" style="color: #7743DB">Zustand</h2>
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

<h2 id="commit" style="color: #7743DB">Commit</h2>

For commit in one command use:
```bash
pnpm commit
```

This command do:
- **git add .**
- **git cz** *(launch prompt for easy commit)*
- **husky pre-commit**
  - **pnpm tsc** *check typescript*
  - **pnpm test:run** *launch all test*
  - **pnpm lint-staged** *lint-staged config at lint-staged.config.js*

<h2 id="absolute-path" style="color: #7743DB">Absolute Path</h2>

Actually 3 absolute path are configured:

```ts
// Before
import xx from './src' 
import xx from './src/hooks' 
import xx from './src/components' 

// After
import xx from '@' 
import xx from '@hooks' 
import xx from '@components' 
```

For changed or add new absolute path you have to modify 2 files:

*vite.config.ts*
```ts
export default defineConfig({
  /* Some config before */
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
    ],
  },
})
```

*tsconfig.json*
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"]
    }
  }
}
```