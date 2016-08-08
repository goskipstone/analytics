import { default as React } from 'react'
import { Container, Toolbar, NavItem } from 'rebass'
import { Flex } from 'reflexbox'

const Navbar = () =>
  <Toolbar backgroundColor='primary'>
    <Container is={Flex} style={{ width: '100%' }}>
      <NavItem>
        Skipstone Analytics
      </NavItem>
    </Container>
  </Toolbar>

export default Navbar
