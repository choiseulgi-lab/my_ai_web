import { Box, Container } from '@mui/material'
import ButtonSection from './components/sections/ButtonSection'
import InputSection from './components/sections/InputSection'
import NavigationSection from './components/sections/NavigationSection'
import DropdownSection from './components/sections/DropdownSection'
import ScrollSection from './components/sections/ScrollSection'
import AnimationSection from './components/sections/AnimationSection'
import MenuSection from './components/sections/MenuSection'
import SidebarSection from './components/sections/SidebarSection'
import HoverSection from './components/sections/HoverSection'
import SwipeSection from './components/sections/SwipeSection'
import CardSection from './components/sections/CardSection'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <NavigationSection />
          <SwipeSection />
          <CardSection />
          <ButtonSection />
          <InputSection />
          <DropdownSection />
          <ScrollSection />
          <AnimationSection />
          <MenuSection />
          <SidebarSection />
          <HoverSection />
        </Box>
      </Container>
    </Box>
  )
}

export default App
