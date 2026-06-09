import { useEffect, useRef, useState, useCallback } from 'react'
import {
  Box, Container, Typography, CircularProgress, Fab,
  TextField, InputAdornment, Chip, ToggleButton, ToggleButtonGroup
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/common/PostCard'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

const CATEGORIES = ['전체', '한식', '중식', '일식', '카페', '술집', '기타']
const SORTS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'views', label: '조회순' },
]

function FeedPage() {
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const { posts, loading, hasMore, fetchPosts, toggleLike, getUserLikes, toggleBookmark, getUserBookmarks } = usePosts()

  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('latest')
  const [offset, setOffset] = useState(0)
  const [likedPosts, setLikedPosts] = useState([])
  const [bookmarkedPosts, setBookmarkedPosts] = useState([])
  const observerRef = useRef(null)
  const sentinelRef = useRef(null)

  const load = useCallback((newOffset = 0) => {
    fetchPosts(newOffset, { search, category, sort })
    setOffset(newOffset)
  }, [fetchPosts, search, category, sort])

  useEffect(() => { load(0) }, [search, category, sort])

  useEffect(() => {
    if (user) {
      getUserLikes(user.id).then(setLikedPosts)
      getUserBookmarks(user.id).then(setBookmarkedPosts)
    }
  }, [user])

  // 무한 스크롤
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const next = offset + 10
      fetchPosts(next, { search, category, sort })
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

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
  }

  const handleCategory = (cat) => {
    setCategory(cat === '전체' ? '' : cat)
  }

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

  const activeCategory = category || '전체'

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      {/* 환영 메시지 */}
      {user && profile && (
        <Typography variant="body2" fontWeight={600} mb={2} color="text.secondary">
          <Typography component="span" color="primary" fontWeight={700}>{profile.nickname}</Typography>님 환영해요! 🍽️
        </Typography>
      )}

      {/* 검색바 */}
      <Box component="form" onSubmit={handleSearch} mb={1.5}>
        <TextField
          placeholder="맛집, 지역, 메뉴로 검색..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 20, bgcolor: 'grey.100' }
          }}
        />
      </Box>

      {/* 카테고리 필터 */}
      <Box sx={{ display: 'flex', gap: 0.75, overflowX: 'auto', pb: 1, mb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
        {CATEGORIES.map(cat => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => handleCategory(cat)}
            color={activeCategory === cat ? 'primary' : 'default'}
            variant={activeCategory === cat ? 'filled' : 'outlined'}
            size="small"
            sx={{ flexShrink: 0, fontWeight: activeCategory === cat ? 700 : 400 }}
          />
        ))}
      </Box>

      {/* 정렬 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1.5 }}>
        <ToggleButtonGroup
          value={sort}
          exclusive
          onChange={(_, v) => v && setSort(v)}
          size="small"
        >
          {SORTS.map(s => (
            <ToggleButton
              key={s.value}
              value={s.value}
              sx={{ px: 1.5, py: 0.3, fontSize: '0.75rem', border: '1px solid', borderColor: 'divider' }}
            >
              {s.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* 검색 결과 안내 */}
      {search && (
        <Typography variant="body2" color="text.secondary" mb={1.5}>
          "<b>{search}</b>" 검색 결과 {posts.length}개
          <Typography
            component="span" color="primary" sx={{ cursor: 'pointer', ml: 1, fontSize: '0.8rem' }}
            onClick={() => { setSearch(''); setSearchInput('') }}
          >
            초기화
          </Typography>
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
            <Typography variant="h6" color="text.secondary">
              {search ? '검색 결과가 없어요' : '아직 게시물이 없어요'}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {search ? '다른 키워드로 검색해보세요' : '첫 번째 맛집을 공유해보세요!'}
            </Typography>
          </Box>
        )}
      </Box>

      {/* 글쓰기 FAB */}
      {user && (
        <Fab color="primary" sx={{ position: 'fixed', bottom: 24, right: 24 }} onClick={() => navigate('/write')}>
          <AddIcon />
        </Fab>
      )}
    </Container>
  )
}

export default FeedPage
