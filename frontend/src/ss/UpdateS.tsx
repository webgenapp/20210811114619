import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import SForm from './SForm'
import { S } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateS() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<S>(['ss', id], () =>
    client.get(`/api/v1/ss/${id}`).then((response) => response.data)
  )

  const updateS = useMutation<S, any, S>(
    (values: S) =>
      client.put(`/api/v1/ss/${id}`, values).then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ss')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const s = data as S
  return (
    <SForm
      s={s}
      onSubmit={(values, { setSubmitting }) => {
        updateS.mutate(values)
        setSubmitting?.(false)
        history.push('/ss')
      }}
    />
  )
}

export default UpdateS
