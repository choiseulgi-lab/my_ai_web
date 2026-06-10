import { useState, useEffect } from 'react'
import {
  Box, Typography, Avatar, CircularProgress,
  Modal, IconButton, Divider, Button
} from '@mui/material'
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  Close as CloseIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material'
import PageLayout from '../components/layout/PageLayout.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { supabase } from '../supabaseClient.js'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from '../utils/formatTime.js'

function MyPage() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [myPosts, setMyPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)

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
          variant="outlined"
          size="small"
          fullWidth
          onClick={handleLogout}
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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
          }}
        >
          {myPosts.map(post => (
            <Box
              key={post.id}
              onClick={() => setSelectedPost(post)}
              sx={{ cursor: 'pointer', aspectRatio: '1/1', overflow: 'hidden', bgcolor: 'grey.200' }}
            >
              <Box
                component="img"
                src={post.image_url}
                alt={post.travel_title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.src = 'https://picsum.photos/200/200?random=' + post.id }}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* 게시물 모달 */}
      <Modal
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 480,
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            outline: 'none',
            mx: 2,
            borderRadius: 3,
          }}
        >
          {selectedPost && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5 }}>
                <Avatar
                  src={currentUser.profile_image_url}
                  sx={{ width: 36, height: 36, mr: 1.5, bgcolor: 'primary.light' }}
                >
                  {currentUser.nickname?.[0]}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600}>{currentUser.nickname}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                    <LocationOnOutlinedIcon sx={{ fontSize: 12, color: 'primary.main' }} />
                    <Typography variant="caption" color="text.secondary">
                      {selectedPost.travel_location}
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small" onClick={() => setSelectedPost(null)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              <Box
                component="img"
                src={selectedPost.image_url}
                alt={selectedPost.travel_title}
                sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.src = 'https://picsum.photos/400/400?random=' + selectedPost.id }}
              />

              <Box sx={{ px: 2, py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                  <FavoriteBorderIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="caption">{selectedPost.likes_count || 0}</Typography>
                </Box>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                  {selectedPost.travel_title}
                </Typography>
                {selectedPost.caption && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {selectedPost.caption}
                  </Typography>
                )}
                {selectedPost.hashtag && (
                  <Typography variant="caption" color="primary.main">
                    {selectedPost.hashtag}
                  </Typography>
                )}
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
                  {formatDistanceToNow(selectedPost.created_at)}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </PageLayout>
  )
}

export default MyPage
