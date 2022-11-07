import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FetchData } from './components/FetchData'
import { useStore } from './hooks/store'

const queryClient = new QueryClient()

export const App = () => {
  const { count, increment, decrement } = useStore()
  return (
    <>
      <h1>App</h1>
      <QueryClientProvider client={queryClient}>{/* <FetchData /> */}</QueryClientProvider>
      <hr />
      <h2>Store</h2>
      <p>Store count: {count}</p>
      <button onClick={() => increment(2)}>Increment By 2</button>
      <button onClick={() => decrement(2)}>Decrement By 2</button>
    </>
  )
}
