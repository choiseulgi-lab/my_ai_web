import { useEffect, useRef, useState, useCallback } from 'react'
import { Box, Container, Typography, CircularProgress, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/common/PostCard'

const CATEGORIES = ['전체', '한식', '중식', '일식', '카페', '술집', '기타']
const SORTS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'views', label: '조회순' },
]

function FeedPage({ search }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { posts, loading, hasMore, fetchPosts, toggleLike, getUserLikes, toggleBookmark, getUserBookmarks } = usePosts()

  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('latest')
  const [offset, setOffset] = useState(0)
  const [likedPosts, setLikedPosts] = useState([])
  const [bookmarkedPosts, setBookmarkedPosts] = useState([])
  const observerRef = useRef(null)
  const sentinelRef = useRef(null)

  const load = useCallback((newOffset = 0) => {
    fetchPosts(newOffset, { search: search ?? '', category, sort })
    setOffset(newOffset)
  }, [fetchPosts, search, category, sort])

  useEffect(() => { load(0) }, [search, category, sort])

  useEffect(() => {
    if (user) {
      getUserLikes(user.id).then(setLikedPosts)
      getUserBookmarks(user.id).then(setBookmarkedPosts)
    }
  }, [user])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const next = offset + 10
      fetchPosts(next, { search: search ?? '', category, sort })
      setOffset(next)
    }
  }, [loading, hasMore, offset, fetchPosts, search, category, sort])

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore() },
      { threshold: 0.5 }
    )
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
    <Box sx={{ bgcolor: '#f8f8f8', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 3, px: { xs: 2, md: 4 } }}>
        <Box sx={{ maxWidth: 760, mx: 'auto' }}>

          {/* 검색 결과 안내 */}
          {search && (
            <Typography variant="body2" color="text.secondary" mb={2}>
              "<Typography component="span" fontWeight={700} color="primary">{search}</Typography>" 검색 결과 — {posts.length}건
            </Typography>
          )}

          {/* 카테고리 필터 */}
          <Box sx={{ display: 'flex', gap: 0.75, overflowX: 'auto', pb: 1, mb: 1.5, '&::-webkit-scrollbar': { display: 'none' } }}>
            {CATEGORIES.map(cat => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setCategory(cat === '전체' ? '' : cat)}
                color={(category || '전체') === cat ? 'primary' : 'default'}
                variant={(category || '전체') === cat ? 'filled' : 'outlined'}
                size="small"
                sx={{ flexShrink: 0, fontWeight: (category || '전체') === cat ? 700 : 400, bgcolor: (category || '전체') === cat ? undefined : 'white' }}
              />
            ))}
          </Box>

          {/* 정렬 */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <ToggleButtonGroup value={sort} exclusive onChange={(_, v) => v && setSort(v)} size="small">
              {SORTS.map(s => (
                <ToggleButton
                  key={s.value} value={s.value}
                  sx={{ px: 1.5, py: 0.4, fontSize: '0.75rem', bgcolor: 'white', '&.Mui-selected': { bgcolor: 'primary.main', color: 'white' } }}
                >
                  {s.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* 게시물 목록 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
          <Box ref={sentinelRef} sx={{ py: 3, display: 'flex', justifyContent: 'center' }}>
            {loading && <CircularProgress size={28} color="primary" />}
            {!hasMore && posts.length > 0 && (
              <Typography variant="caption" color="text.disabled">모든 게시물을 불러왔어요 ✓</Typography>
            )}
            {!loading && posts.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h2" mb={1}>🍽️</Typography>
                <Typography variant="h6" color="text.secondary" fontWeight={600}>
                  {search ? '검색 결과가 없어요' : '아직 게시물이 없어요'}
                </Typography>
                <Typography variant="body2" color="text.disabled" mt={0.5}>
                  {search ? '다른 키워드로 검색해보세요' : '첫 번째 맛집을 공유해보세요!'}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default FeedPage
