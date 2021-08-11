import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { S, SError } from '../types'
import SForm from './SForm'
import { useHistory } from 'react-router-dom'

function CreateS() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createS = useMutation<S, SError, S>(
    (values) => {
      return client.post('/api/v1/ss', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ss')
      },
    }
  )

  const handleSubmit = (values: S, { setSubmitting }: FormikHelpers<S>) => {
    createS.mutate(values)
    setSubmitting?.(false)
    history.push('/ss')
  }

  return <SForm onSubmit={handleSubmit} />
}

export default CreateS
