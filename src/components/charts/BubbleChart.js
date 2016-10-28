
import canUseDOM from 'can-use-dom'
import css from 'minify-css-string'
import ReactFauxDOM from 'react-faux-dom'
import getContext from 'recompose/getContext'
import compose from 'recompose/compose'
import setPropTypes from 'recompose/setPropTypes'
import { default as React, PropTypes } from 'react'
import randomString from 'random-string'

const enhance = compose(
  getContext({
    colors: PropTypes.object,
    scale: PropTypes.array
  }),
  setPropTypes({
    radiusField: PropTypes.string.isRequired,
    title: PropTypes.func.isRequired
  })
)

export default enhance(({ title, titleField, radiusField, data, scale, colors }) => {
  if (!canUseDOM) {
    return null
  }

  const cls = randomString()

  const chart = ReactFauxDOM.createElement('svg')

  const diameter = 960
  // const format = d3.format(',d')
  const color = d3.scaleOrdinal(d3.schemeCategory20c)

  const bubble = d3.pack()
    .size([diameter, diameter])
    .padding(5)

  const svg = d3.select(chart)
    .attr('width', diameter)
    .attr('height', diameter)
    .attr('class', 'bubble')

  const tree = d3.hierarchy({ children: data })
    .sum(d => +d[radiusField])
    .sort((a, b) => a[radiusField] - b[radiusField])

  bubble(tree)

  const node = svg.selectAll('.node')
    .data(tree.children)
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`)

  node.append('title')
    .text(d => title(d))

  node.append('circle')
    .attr('r', d => d.r)
    .style('fill', d => color(d.data[titleField]))
    .append('svg:title')
    .text(d => d.data.title)

  node.append('text')
    .attr('dy', '.3em')
    .style('text-anchor', 'middle')
    .text(d => title(d).substring(0, d.r / 3))

  return (
    <div>
      <style>
        {css(`
          .${cls} rect {
            fill: ${colors.primary};
          }
          .${cls} text {
            fill: ${colors.white};
            font-size: 10px;
            text-anchor: center;
          }
        `)}
      </style>
      <div className={cls}>
        {chart.toReact()}
      </div>
    </div>
  )
})
