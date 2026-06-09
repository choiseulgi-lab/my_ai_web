import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'
import theme from './theme.js'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <pre style={{ padding: 24, color: 'red', fontSize: 14, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {String(this.state.error)}{'\n\n'}{this.state.error?.stack}
        </pre>
      )
    }
    return this.props.children
  }
}

window.onerror = (msg, src, line, col, err) => {
  document.getElementById('root').innerHTML =
    `<pre style="padding:24px;color:red;font-size:14px;white-space:pre-wrap">${msg}\n${src}:${line}:${col}\n${err?.stack ?? ''}</pre>`
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ErrorBoundary>
)
