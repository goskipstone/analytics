
import React from 'react'
import { Flex, Box } from 'reflexbox'
import compose from 'recompose/compose'
import { Select, Container, Toolbar, NavItem } from 'rebass'
import setDisplayName from 'recompose/setDisplayName'
import setPropTypes from 'recompose/setPropTypes'
import { connect } from 'react-redux'
import { setDataType } from 'redux/modules/analytics'

const width = 200

const enhance = compose(
  setDisplayName('NavBar'),
  connect(({ analytics: { dataType }, browser }) => ({ dataType, small: browser.lessThan.medium }), { setDataType }),
  setPropTypes({
    dataType: React.PropTypes.oneOf(['requestCount', 'sessionCount', 'engagementCount']).isRequired,
    setDataType: React.PropTypes.func.isRequired
  })
)

export default enhance(props =>
  <Toolbar px={0} backgroundColor='white'>
    <Container style={{ width: '100%' }} my={2}>
      <Flex justify={props.small ? 'center' : 'space-between'} align='center' flexColumn={props.small}>
        <Box mb={props.small ? 2 : 0}>
          <NavItem
            style={{
              backgroundImage: 'url(//static.skip.st/Skipstone_LtGray.svg)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: width,
              textIndent: -9999,
              width,
              height: 43
            }}
            children='Skipstone Analytics' />
        </Box>
        <Box>
          <Select
            pill
            mb={0}
            hideLabel
            label='select data type'
            name='dataType'
            defaultValue={props.dataType}
            style={{ width: 200 }}
            options={[
              { children: '# of requests', value: 'requestCount' },
              { children: '# of sessions', value: 'sessionCount' },
              { children: '# of engagements', value: 'engagementCount' }
            ]}
            onChange={({ target: { value } }) => props.setDataType(value)} />
        </Box>
      </Flex>
    </Container>
  </Toolbar>
)
