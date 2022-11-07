/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const FetchData = () => {
  const urlGet = 'http://bot-habitat/wp-json/chatbot/data'
  const urlDelete = 'http://bot-habitat/wp-json/chatbot/delete?'
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery(
    ['message'],
    async () => await fetch(urlGet).then((res: any) => res.json())
  )

  const dataDelete = useMutation(
    (id: string) =>
      fetch(`${urlDelete}${new URLSearchParams({ id: id })}`, {
        method: 'DELETE',
      }),
    {
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
        <div
          key={message.id}
          id='message'
          style={{
            position: 'relative',
            border: '1px solid olive',
            width: 'fit-content',
            height: 'fit-content',
            padding: '10px 20px',
            marginBottom: 20,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: -20,
              color: 'goldenrod',
              cursor: 'pointer',
            }}
            onClick={() => dataDelete.mutate(message.id)}
          >
            X
          </span>
          <p
            style={{
              marginTop: 80,
            }}
          >
            {message.content}
          </p>
          <p>{message.type}</p>
          <p>{message.idParent}</p>
        </div>
      ))}
    </>
  )
}
