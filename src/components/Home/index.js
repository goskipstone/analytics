import { default as React, Component, PropTypes } from 'react'
import { Container, Section, SectionHeader } from 'rebass'
import { default as data } from './data'
import { BarChart } from 'react-d3-components'
import { connect } from 'react-redux'
import { default as truncate } from 'truncate'
// Order of Questions Asked in a Session
// Number of times multiple results/no results/single result is shown per session

@connect(({ app: { screenSize } }) => ({ screenSize }))

export default class Home extends Component {

  static contextTypes = {
    breakpoints: PropTypes.object.isRequired,
    scale: PropTypes.array.isRequired
  };

  mapData (data, field, truncateAt = 15) {
    return data.map(i => ({ x: truncate(i.title, truncateAt, { ellipsis: '...' }), y: i[field] }))
  }

  width () {
    const { screenSize } = this.props
    const { breakpoints } = this.context
    switch (screenSize) {
      case 'xlarge':
        return breakpoints.large
      default:
        return breakpoints[screenSize || 'small']
    }
  }

  charts = [
    {
      heading: 'Average # of Questions Per Session',
      data: [{
        label: 'Average # of Questions Per Session',
        values: this.mapData(data, 'avgQueries')
      }]
    },
    {
      heading: 'Average # of Questions before Ask Expert Appears',
      data: [{
        label: 'Average # of Questions before Ask Expert Appears',
        values: this.mapData(data, 'avgQueriesBeforeAskExpert')
      }]
    },
    {
      heading: 'Average # of Questions before Ask Expert Appears',
      data: [{
        label: 'Average # of Questions before Ask Expert Appears',
        values: this.mapData(data, 'avgWatchedBeforeFirstQuestion')
      }]
    },
    {
      heading: 'Multiple Results Frequency',
      data: [{
        label: 'Multiple Results Frequency',
        values: this.mapData(data, 'multipleResultsFreq')
      }]
    },
    {
      heading: 'Single Results Frequency',
      data: [{
        label: 'Single Results Frequency',
        values: this.mapData(data, 'singleResultFreq')
      }]
    },
    {
      heading: 'Zero Results Frequency',
      data: [{
        label: 'Zero Results Frequency',
        values: this.mapData(data, 'zeroResultsFreq')
      }]
    }
  ]

  render () {
    const { scale } = this.context
    const width = this.width()
    return (
      <Container>
        {this.charts.map(({ heading, data }) =>
          <Section>
            <SectionHeader heading={heading} href='#' />
            <BarChart
              data={data}
              height={400}
              width={width - (width / 25)}
              margin={{ top: scale[1], bottom: scale[2], left: scale[3], right: 0 }}
            />
          </Section>
        )}
      </Container>
    )
  }
}
