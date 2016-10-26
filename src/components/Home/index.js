
import React from 'react'
import { BarChart } from 'charts'
import { Container } from 'rebass'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { asyncConnect } from 'redux-connect'
import { PARENT_MEDIA_REPORT, parentMediaReport } from 'redux/modules/analytics'
// Order of Questions Asked in a Session
// Number of times multiple results/no results/single result is shown per session
// 'Average # of Questions Per Session'
// 'Average # of Questions before Ask Expert Appears'
// 'Average # of Questions before Ask Expert Appears'
// 'Multiple Results Frequency'
// 'Single Results Frequency'
// 'Zero Results Frequency'

const enhance = compose(
  asyncConnect([{ key: PARENT_MEDIA_REPORT, promise: parentMediaReport }]),
  connect(({ analytics: { parentMediaReport } }) => ({ data: parentMediaReport }))
)

export default enhance(props =>
  <Container pt={3}>
    <BarChart
      data={props.data}
      getXData={d => d.title}
      getYData={d => +d.requestCount}
    />
  </Container>
)
