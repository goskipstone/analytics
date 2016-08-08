import { default as React } from 'react'
import { Input as RebassInput, Text } from 'rebass'

const Input = (props, error) => {
  return (
    <span>
      <RebassInput {...props} />
      {error && <Text small>Yup</Text>}
    </span>
  )
}

export default Input
