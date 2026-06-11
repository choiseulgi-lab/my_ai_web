import { Card, CardMedia, CardContent, CardActions, Box, Typography, Chip, IconButton, Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import StarIcon from '@mui/icons-material/Star'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import { useNavigate } from 'react-router-dom'
import { formatDate, getAvatarUrl } from '../../utils/auth'
import { RANDOM_IMAGE_API } from '../../constants'

const CATEGORY_COLORS = {
  한식: '#e53935', 중식: '#f57c00', 일식: '#7b1fa2',
  카페: '#0288d1', 술집: '#388e3c', 기타: '#757575'
}

function PostCard({ post, isLiked, isBookmarked, onLike, onBookmark }) {
  const navigate = useNavigate()
  const seed = parseInt(post.id.replace(/-/g, '').substring(0, 8), 16) % 1000
  const imageUrl = post.image_url || `${RANDOM_IMAGE_API}?lock=${seed}`
  const tags = post.post_tags?.map(pt => pt.tags?.name).filter(Boolean) ?? []

  const handleLike = (e) => { e.stopPropagation(); onLike?.(post.id, isLiked) }
  const handleBookmark = (e) => { e.stopPropagation(); onBookmark?.(post.id, isBookmarked) }

  return (
    <Card
      onClick={() => navigate(`/post/${post.id}`)}
      elevation={0}
      sx={{
        cursor: 'pointer', borderRadius: 3,
        border: '1px solid', borderColor: 'grey.200',
        transition: 'all 0.2s ease',
        '&:hover': { boxShadow: '0 8px 32px rgba(0,0,0,0.10)', borderColor: 'transparent', transform: 'translateY(-2px)' },
        overflow: 'hidden',
      }}
    >
      {/* 작성자 영역 (상단) */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 2.5, pb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            src={post.user_id ? getAvatarUrl(post.user_id) : undefined}
            sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '0.875rem', fontWeight: 700 }}
          >
            {post.profiles?.nickname?.[0] ?? '?'}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={700} lineHeight={1.2}>
              {post.profiles?.nickname ?? '익명'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.created_at)}
            </Typography>
          </Box>
        </Box>
        {post.category && (
          <Chip
            label={post.category}
            size="small"
            sx={{
              fontSize: '0.7rem', fontWeight: 700, height: 22,
              bgcolor: CATEGORY_COLORS[post.category] ?? '#757575',
              color: 'white',
            }}
          />
        )}
      </Box>

      {/* 이미지 */}
      <CardMedia
        component="img"
        height={300}
        image={imageUrl}
        alt={post.title}
        sx={{ objectFit: 'cover' }}
      />

      {/* 본문 */}
      <CardContent sx={{ px: 3, pt: 2, pb: 1 }}>
        {/* 제목 */}
        <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3, mb: 0.75 }} noWrap>
          {post.title}
        </Typography>

        {/* 상호명 · 지역 · 대표메뉴 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap', mb: post.review ? 1 : 0 }}>
          {post.store_name && (
            <Typography variant="body2" color="text.secondary" fontWeight={500}>{post.store_name}</Typography>
          )}
          {post.region && (
            <Typography variant="body2" color="text.disabled">· {post.region}</Typography>
          )}
          {post.main_menu && (
            <Typography variant="body2" color="text.disabled">· {post.main_menu}</Typography>
          )}
        </Box>

        {/* 후기 */}
        {post.review && (
          <Typography
            variant="body2" color="text.secondary"
            sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 1.25, lineHeight: 1.6 }}
          >
            {post.review}
          </Typography>
        )}

        {/* 태그 */}
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {tags.slice(0, 4).map(tag => (
              <Chip
                key={tag} label={tag} size="small"
                sx={{ fontSize: '0.7rem', height: 22, bgcolor: 'grey.100', color: 'text.secondary', fontWeight: 500 }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      {/* 하단 액션 */}
      <CardActions sx={{ px: 3, pb: 2, pt: 0.5, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* 좋아요 */}
          <IconButton size="small" onClick={handleLike} sx={{ color: isLiked ? 'error.main' : 'text.secondary', p: 0.5 }}>
            {isLiked ? <FavoriteIcon sx={{ fontSize: 20 }} /> : <FavoriteBorderIcon sx={{ fontSize: 20 }} />}
          </IconButton>
          <Typography variant="body2" color="text.secondary" fontWeight={600} mr={1}>{post.like_count}</Typography>

          {/* 댓글 아이콘 (표시용) */}
          <ModeCommentOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* 평점 */}
          {post.rating > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, bgcolor: 'grey.100', borderRadius: 10, px: 1, py: 0.25 }}>
              <StarIcon sx={{ fontSize: 14, color: '#ffc107' }} />
              <Typography variant="caption" fontWeight={700}>{post.rating}.0</Typography>
            </Box>
          )}
          {/* 조회수 */}
          {post.view_count > 0 && (
            <Typography variant="caption" color="text.disabled">조회 {post.view_count}</Typography>
          )}
          {/* 북마크 */}
          <IconButton size="small" onClick={handleBookmark} sx={{ color: isBookmarked ? 'primary.main' : 'text.secondary', p: 0.5 }}>
            {isBookmarked ? <BookmarkIcon sx={{ fontSize: 20 }} /> : <BookmarkBorderIcon sx={{ fontSize: 20 }} />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  )
}

export default PostCard
