import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Header from './components/layout/Header'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import FeedPage from './pages/FeedPage'
import WritePostPage from './pages/WritePostPage'
import PostDetailPage from './pages/PostDetailPage'
import { Box, CircularProgress } from '@mui/material'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}><CircularProgress /></Box>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppLayout() {
  const { loading } = useAuth()
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}><CircularProgress color="primary" /></Box>

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/write" element={<ProtectedRoute><WritePostPage /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><WritePostPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
