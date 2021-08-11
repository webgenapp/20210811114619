import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { S } from '../types'

function DetailS() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<S>(['ss', id], () =>
    client.get(`/api/v1/ss/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const s = data as S

  return (
    <div>
      <label>{s.s}</label>
      <br />
    </div>
  )
}

export default DetailS
