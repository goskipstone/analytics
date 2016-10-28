
import React from 'react'
import truncate from 'truncate'
import { BarChart } from 'charts'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import compose from 'recompose/compose'
import { PanelHeader, Panel, Text, Container } from 'rebass'
import { asyncConnect } from 'redux-connect'
import setPropTypes from 'recompose/setPropTypes'
import getContext from 'recompose/getContext'
import { PARENT_MEDIA_REPORT, parentMediaReport } from 'redux/modules/analytics'

// Order of Questions Asked in a Session
// Number of times multiple results/no results/single result is shown per session
// 'Average # of Questions Per Session'
// 'Average # of Questions before Ask Expert Appears'
// 'Average # of Questions before Ask Expert Appears'
// 'Multiple Results Frequency'
// 'Single Results Frequency'
// 'Zero Results Frequency'

/*
<BubbleChart
  data={props.data}
  title={d => `${d.data.title}: ${d.data.requestCount}`}
  titleField='title'
  radiusField='requestCount' />
*/

const enhance = compose(
  asyncConnect([{ key: PARENT_MEDIA_REPORT, promise: parentMediaReport }]),
  connect(
    ({ analytics: { parentMediaReport, dataType, highlight }, browser }) => ({
      dataType,
      highlight,
      data: parentMediaReport,
      browser,
      large: browser.greaterThan.medium
    })
  ),
  getContext({
    scale: React.PropTypes.array,
    colors: React.PropTypes.object
  }),
  setPropTypes({
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    dataType: React.PropTypes.oneOf(['requestCount', 'sessionCount', 'engagementCount']).isRequired
  })
)

export default enhance(props => {
  const width = () => {
    if (!props.browser.width) {
      return props.browser.breakpoints.xsmall
    }
    if (props.browser.lessThan.large) {
      return props.browser.width - 60
    }
    return props.browser.breakpoints.small / 1.2
  }
  return (
    <Container pt={3}>
      <Flex wrap>
        <Box col={props.browser.lessThan.large ? 12 : 8}>
          <BarChart
            data={props.data}
            margin={{
              top: 0,
              right: 0,
              bottom: 125,
              left: props.scale[4]
            }}
            width={width()}
            height={500}
            x={d => truncate(d.title, 20)}
            y={d => +d[props.dataType]} />
        </Box>
        <Box col={props.browser.lessThan.large ? 12 : 4} my={props.browser.lessThan.large ? 3 : 0}>
          <Panel mx={props.browser.lessThan.large ? 2 : 0}>
            <PanelHeader style={{ color: props.colors.primary }}>
              <Choose>
                <When condition={props.highlight}>
                  <a href={`https://share.skip.st/one/${props.highlight.mediaUUID}`} target='_blank'>
                    {props.highlight.title}
                  </a>
                </When>
                <Otherwise>
                  Welcome to Skipstone Analytics
                </Otherwise>
              </Choose>
            </PanelHeader>
            <Choose>
              <When condition={props.highlight}>
                <Text>
                  # of requests: {props.highlight.requestCount}
                  <br />
                  # of sessions: {props.highlight.sessionCount}
                  <br />
                  # of engagements: {props.highlight.engagementCount}
                </Text>
              </When>
              <Otherwise>
                Hover over a data point to view more details.
              </Otherwise>
            </Choose>
          </Panel>
        </Box>
      </Flex>
    </Container>
  )
})
