<!-- <style>
  #link{
    color: #4EBFFF;
  }
  #link:hover{
    color: #a354fe;
    text-decoration: none;
  }
  #title-link{
    color: #ffbe0e;
  }
  #title-link:hover{
    color: #a354fe;
    text-decoration: none;
  }
</style> -->

<p align="center" style="text-align: center;">
<img src='./markdown/vitejs.png' height="160" />
</p>
<br>

<h1 style="text-align: center;"> BoilerPlate Vite React TypeScript</h1>
<p style="text-align: center; font-weight: 600;">with <a id="link" href="https://eslint.org/" target="_blank">EsLint</a>, <a id="link" href="https://vitest.dev/" target="_blank">Vitest</a>, <a id="link" href="https://sass-lang.com/" target="_blank">SASS</a>, <a id="link" href="https://tanstack.com/query/v4" target="_blank">TanStack Query</a>, <a id="link" href="https://github.com/pmndrs/zustand" target="_blank">Zustand</a>, <a id="link" href="https://typicode.github.io/husky/#/" target="_blank">Husky</a>, <a id="link" href="https://commitlint.js.org/#/" target="_blank">Commitlint</a></p>
<br>
<p style="text-align: center;">
<!-- Linter -->
<a href="https://eslint.org/" target="_blank">
<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
</a>
<a href="https://prettier.io/" target="_blank">
<img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />
</a>
<!-- Frameworks & Library -->
<a href="https://reactjs.org/" target="_blank">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
</a>
<a href="https://reactrouter.com/en/main" target="_blank">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
</a>
<a href="https://sass-lang.com/" target="_blank">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
</a>
<a href="https://vitejs.dev/" target="_blank">
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
</a>
<!-- Languages  -->
<a href="https://www.typescriptlang.org/" target="_blank">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
</a>
</p>
<br>

<h2 style="color: #ffbe0e; text-align: center">
Table of contents
<br>
<br>
<img src="./markdown/menu.svg" height="24" />
</h2>
<p style="text-align: center;">
Use the "Table of Contents" menu on the top-left corner to explore the list.
</p>

<br>
<br>
<h2 id="getting-started" style="color: #ffbe0e; text-align: center">Getting Started</h2>


***Install***
```
pnpm i
```

***Dev***
```
pnpm dev
```

***Build***
```
pnpm build
```

***Test***
```
pnpm test
```


<br>
<br>
<h2 id="tanstack" style="color: #ffbe0e; text-align: center"><a id="title-link" href="https://tanstack.com/query/v4" target="_blank">TanStack Query</a></h2>

<h3 style="text-align: center">Example</h3>
<br>
<br>

***Query***
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

<br>
<br>

***Mutation***
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

<br>
<br>
<h2 id="zustand" style="color: #ffbe0e; text-align: center"><a id="title-link" href="https://github.com/pmndrs/zustand" target="_blank">Zustand</a></h2>


<h3 style="text-align: center">Example</h3>
<br>
<br>

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

<br>
<br>
<h2 id="commit" style="color: #ffbe0e; text-align: center">Commit</h2>
<br>

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

<br>
<br>
<h2 id="absolute-path" style="color: #ffbe0e; text-align: center">Absolute Path</h2>
<br>

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
<br>
<br>

For changed or add new absolute path you have to modify 2 files:
<br>
<br>

> *vite.config.ts*
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

> *tsconfig.json*
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


<br>
<br>
<br>
<br>

### TODO
- [x] [Lint Staged](https://www.youtube.com/watch?v=oWty0Nw1ydk&ab_channel=LeighHalliday) 
- [x] Config Commitlint for fonctionnal Prompt
- [x] Absolute Path
- [] React Router Dom
- [] Axios
