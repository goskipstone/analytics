
import * as d3 from 'd3'
import canUseDOM from 'can-use-dom'
import css from 'minify-css-string'
import ReactFauxDOM from 'react-faux-dom'
import getContext from 'recompose/getContext'
import { default as React, PropTypes } from 'react'

const enhance = getContext({
  colors: PropTypes.object,
  scale: PropTypes.array
})

export default enhance(({ getYData, getXData, data, scale, colors }) => {
  if (!canUseDOM) {
    return null
  }

  const svg = ReactFauxDOM.createElement('svg')
  svg.setAttribute('class', 'chart')

  const margin = {
    top: scale[1],
    right: scale[1],
    bottom: scale[2],
    left: scale[4]
  }

  const width = 960 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom

  const x = d3.scaleBand()
    .range([0, width])
    .padding(0.5)

  const y = d3.scaleLinear()
    .range([height, 0])

  var chart = d3.select(svg)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', (d, i) => `translate(${margin.left},${margin.top})`)

  x.domain(data.map(d => getXData(d)))
  y.domain([0, d3.max(data.map(d => getYData(d)))])

  chart.selectAll('.bar').data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(getXData(d)))
    .attr('width', x.bandwidth())
    .attr('y', d => y(getYData(d)))
    .attr('height', d => height - y(getYData(d)))

  chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x))

  chart.append('g')
    .call(d3.axisLeft(y))

  return (
    <div>
      <style>
        {css(`
          .chart rect {
            fill: ${colors.primary};
          }
          .chart text {
            fill: ${colors.black};
            font-size: 10px;
            text-anchor: center;
          }
        `)}
      </style>
      <div className='chart'>
        {svg.toReact()}
      </div>
    </div>
  )
})
