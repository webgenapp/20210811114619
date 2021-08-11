import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { S } from '../types'

type CreateProps = {
  s?: S
  onSubmit: (values: S, helpers: FormikHelpers<S>) => void
}

function SForm({ s, onSubmit }: CreateProps) {
  const initialValues: S = {
    s: s ? s.s : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='s' placeholder='S' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default SForm
