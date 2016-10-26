
import { default as React, PropTypes } from 'react'
import { Container, Toolbar, NavItem } from 'rebass'

const width = 115

const Navbar = (props, { shadows }) =>
  <Toolbar px={0} backgroundColor='white'>
    <Container style={{ width: '100%' }}>
      <NavItem
        style={{
          backgroundImage: 'url(//static.skip.st/Skipstone_LtGray.svg)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: width,
          textIndent: -9999,
          width
        }}
        children='Skipstone Analytics'
      />
    </Container>
  </Toolbar>

Navbar.contextTypes = {
  shadows: PropTypes.array.isRequired
}

export default Navbar
