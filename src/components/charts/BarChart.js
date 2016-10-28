
import canUseDOM from 'can-use-dom'
import ReactFauxDOM from 'react-faux-dom'
import getContext from 'recompose/getContext'
import { default as React, PropTypes } from 'react'
import randomString from 'random-string'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { setHighlight } from 'redux/modules/analytics'

const enhance = compose(
  connect(() => ({}), { setHighlight }),
  getContext({
    colors: PropTypes.object,
    scale: PropTypes.array
  })
)

export default enhance(props => {
  if (!canUseDOM) {
    return null
  }

  const cls = randomString()
  const svg = ReactFauxDOM.createElement('svg')

  const width = props.width - props.margin.left - props.margin.right
  const height = props.height - props.margin.top - props.margin.bottom
  const color = d3.scaleOrdinal(d3.schemeCategory20c)

  const x = d3.scaleBand()
    .domain(props.data.map(d => props.x(d)))
    .range([0, width])
    .padding(0.5)

  const y = d3.scaleLinear()
    .domain([0, d3.max(props.data.map(d => props.y(d)))])
    .range([height, 0])

  const chart = d3.select(svg)
    .attr('width', width + props.margin.left + props.margin.right)
    .attr('height', height + props.margin.top + props.margin.bottom)
    .append('g')
    .attr('transform', (d, i) => `translate(${props.margin.left},${props.margin.top})`)

  chart.selectAll('.bar')
    .data(props.data).enter()
    .append('rect')
    .attr('class', 'bar')
    .style('fill', d => color())
    .attr('x', d => x(props.x(d)))
    .attr('width', x.bandwidth())
    .attr('y', d => y(props.y(d)))
    .attr('height', d => height - y(props.y(d)))
    .on('mouseover', d => props.setHighlight(d))
    .on('mouseleave', () => props.setHighlight(null))

  chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x))

  chart.selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-65)')
    .append('svg:title')
    .text(d => d)

  chart.append('g')
    .call(d3.axisLeft(y))

  return (
    <div className={`${cls}-chart`}>
      {svg.toReact()}
    </div>
  )
})
