import { Box, Button, Typography, Stack, Divider } from '@mui/material'

function ButtonSection() {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h2" sx={{ mb: 3 }}>Button</Typography>

      <Typography variant="h6" sx={{ mb: 1 }}>Variant</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>Color</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="contained" color="error">Error</Button>
        <Button variant="contained" color="success">Success</Button>
        <Button variant="contained" color="warning">Warning</Button>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>Size</Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Button variant="contained" size="small">Small</Button>
        <Button variant="contained" size="medium">Medium</Button>
        <Button variant="contained" size="large">Large</Button>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>Disabled</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" disabled>Contained</Button>
        <Button variant="outlined" disabled>Outlined</Button>
        <Button variant="text" disabled>Text</Button>
      </Stack>
    </Box>
  )
}

export default ButtonSection
