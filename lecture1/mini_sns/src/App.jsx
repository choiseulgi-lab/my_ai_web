import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import FeedPage from './pages/FeedPage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'
import PostCreatePage from './pages/PostCreatePage.jsx'
import TravelGroupPage from './pages/TravelGroupPage.jsx'
import MyPage from './pages/MyPage.jsx'

function PrivateRoute({ children }) {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<PrivateRoute><FeedPage /></PrivateRoute>} />
        <Route path="/post/:id" element={<PrivateRoute><PostDetailPage /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><PostCreatePage /></PrivateRoute>} />
        <Route path="/group" element={<PrivateRoute><TravelGroupPage /></PrivateRoute>} />
        <Route path="/mypage" element={<PrivateRoute><MyPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
