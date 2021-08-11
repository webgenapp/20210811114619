import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { S } from '../types'
import { useHistory } from 'react-router-dom'

type SPreviewProps = {
  s: S
  handleEdit: (s: S) => void
  handleDelete: (s: S) => void
  handleDetail: (s: S) => void
}

function SPreview({
  s,
  handleEdit,
  handleDelete,
  handleDetail,
}: SPreviewProps) {
  return (
    <>
      {s.s}
      <br />
      <button type='button' onClick={() => handleDetail(s)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(s)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(s)}>
        delete
      </button>
    </>
  )
}

function ListSs() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const ssQuery = useQuery<S[]>('ss', () => {
    return client
      .get('/api/v1/ss')
      .then((response) => response.data) as Promise<S[]>
  })

  const deleteS = useMutation<any, any, Partial<S>>(
    ({ id }) => {
      return client.delete(`/api/v1/ss/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ss')
      },
    }
  )

  const handleEdit = ({ id }: S) => {
    history.push(`/ss/update/${id}`)
  }

  const handleDelete = ({ id }: S) => {
    deleteS.mutate({ id })
  }

  const handleDetail = ({ id }: S) => {
    history.push(`/ss/detail/${id}`)
  }

  return (
    <>
      <p>{ssQuery.data?.length} ss</p>
      <ul>
        {ssQuery.data?.map((s) => (
          <li key={s.id}>
            <SPreview
              s={s}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListSs
