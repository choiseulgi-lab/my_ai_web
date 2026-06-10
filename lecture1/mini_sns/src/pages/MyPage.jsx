import { useState, useEffect } from 'react'
import {
  Box, Typography, Avatar, CircularProgress, Divider, Button
} from '@mui/material'
import PageLayout from '../components/layout/PageLayout.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { supabase } from '../supabaseClient.js'
import { useNavigate } from 'react-router-dom'

function MyPage() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [myPosts, setMyPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMyPosts = async () => {
      setIsLoading(true)
      const { data } = await supabase
        .from('dorun_posts')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false })

      if (data) setMyPosts(data)
      setIsLoading(false)
    }
    fetchMyPosts()
  }, [currentUser.id])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <PageLayout>
      {/* 프로필 섹션 */}
      <Box sx={{ bgcolor: 'background.paper', px: 2, pt: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Avatar
            src={currentUser.profile_image_url}
            sx={{ width: 72, height: 72, bgcolor: 'primary.light', fontSize: '2rem' }}
          >
            {currentUser.nickname?.[0]}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700}>{currentUser.nickname}</Typography>
            <Typography variant="body2" color="text.secondary">@{currentUser.username}</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" fontWeight={700}>{myPosts.length}</Typography>
                <Typography variant="caption" color="text.secondary">게시물</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" fontWeight={700}>{currentUser.followers_count || 0}</Typography>
                <Typography variant="caption" color="text.secondary">팔로워</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" fontWeight={700}>{currentUser.following_count || 0}</Typography>
                <Typography variant="caption" color="text.secondary">팔로잉</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Button
          variant="outlined" size="small" fullWidth onClick={handleLogout}
          sx={{ mt: 2, borderRadius: 2, color: 'text.secondary', borderColor: 'divider' }}
        >
          로그아웃
        </Button>
      </Box>

      <Divider />

      {/* 게시물 그리드 */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : myPosts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h3">✈️</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            아직 게시물이 없어요.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {myPosts.map(post => (
            <Box
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              sx={{ cursor: 'pointer', aspectRatio: '1/1', overflow: 'hidden', bgcolor: 'grey.200' }}
            >
              <Box
                component="img"
                src={post.image_url}
                alt={post.travel_title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  transition: 'opacity 0.15s', '&:hover': { opacity: 0.85 } }}
                onError={(e) => { e.target.src = 'https://picsum.photos/200/200?random=' + post.id }}
              />
            </Box>
          ))}
        </Box>
      )}
    </PageLayout>
  )
}

export default MyPage
