import { useEffect, useRef, useState, useCallback } from 'react'
import { Box, Container, Typography, CircularProgress, Fab } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/common/PostCard'
import AddIcon from '@mui/icons-material/Add'

function FeedPage() {
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const { posts, loading, hasMore, fetchPosts, toggleLike, getUserLikes, toggleBookmark, getUserBookmarks } = usePosts()
  const [offset, setOffset] = useState(0)
  const [likedPosts, setLikedPosts] = useState([])
  const [bookmarkedPosts, setBookmarkedPosts] = useState([])
  const observerRef = useRef(null)
  const sentinelRef = useRef(null)

  useEffect(() => {
    fetchPosts(0)
    setOffset(0)
  }, [fetchPosts])

  useEffect(() => {
    if (user) {
      getUserLikes(user.id).then(setLikedPosts)
      getUserBookmarks(user.id).then(setBookmarkedPosts)
    }
  }, [user])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const newOffset = offset + 10
      setOffset(newOffset)
      fetchPosts(newOffset)
    }
  }, [loading, hasMore, offset, fetchPosts])

  // 무한 스크롤 옵저버
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore()
    }, { threshold: 0.5 })
    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current)
    return () => observerRef.current?.disconnect()
  }, [loadMore])

  const handleLike = async (postId, isLiked) => {
    if (!user) { navigate('/login'); return }
    await toggleLike(postId, user.id, isLiked)
    setLikedPosts(prev => isLiked ? prev.filter(id => id !== postId) : [...prev, postId])
  }

  const handleBookmark = async (postId, isBookmarked) => {
    if (!user) { navigate('/login'); return }
    await toggleBookmark(postId, user.id, isBookmarked)
    setBookmarkedPosts(prev => isBookmarked ? prev.filter(id => id !== postId) : [...prev, postId])
  }

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      {/* 환영 메시지 */}
      {user && profile && (
        <Typography variant="body1" fontWeight={600} mb={2} color="text.secondary">
          <Typography component="span" color="primary" fontWeight={700}>{profile.nickname}</Typography>님 환영해요! 🍽️
        </Typography>
      )}

      {/* 게시물 목록 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            isLiked={likedPosts.includes(post.id)}
            isBookmarked={bookmarkedPosts.includes(post.id)}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        ))}
      </Box>

      {/* 무한 스크롤 센티넬 */}
      <Box ref={sentinelRef} sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
        {loading && <CircularProgress size={24} color="primary" />}
        {!hasMore && posts.length > 0 && (
          <Typography variant="caption" color="text.secondary">모든 게시물을 불러왔어요</Typography>
        )}
        {!loading && posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary">아직 게시물이 없어요</Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>첫 번째 맛집을 공유해보세요!</Typography>
          </Box>
        )}
      </Box>

      {/* 글쓰기 FAB */}
      {user && (
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={() => navigate('/write')}
        >
          <AddIcon />
        </Fab>
      )}
    </Container>
  )
}

export default FeedPage
