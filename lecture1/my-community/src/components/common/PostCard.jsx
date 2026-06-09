import { Card, CardMedia, CardContent, CardActions, Box, Typography, Chip, IconButton, Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import StarIcon from '@mui/icons-material/Star'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../utils/auth'
import { RANDOM_IMAGE_API } from '../../constants'

function PostCard({ post, isLiked, isBookmarked, onLike, onBookmark }) {
  const navigate = useNavigate()
  const imageUrl = post.image_url || `${RANDOM_IMAGE_API}/${post.id}/600/400`
  const tags = post.post_tags?.map(pt => pt.tags?.name).filter(Boolean) ?? []

  const handleLike = (e) => {
    e.stopPropagation()
    onLike?.(post.id, isLiked)
  }

  const handleBookmark = (e) => {
    e.stopPropagation()
    onBookmark?.(post.id, isBookmarked)
  }

  return (
    <Card
      sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 }, transition: 'box-shadow 0.2s' }}
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <CardMedia component="img" height={220} image={imageUrl} alt={post.title} sx={{ objectFit: 'cover' }} />

      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
          {post.category && post.category !== '기타' && (
            <Chip label={post.category} size="small" color="primary" sx={{ fontSize: '0.65rem', height: 18 }} />
          )}
          <Typography variant="h6" fontWeight={700} noWrap sx={{ flex: 1 }}>{post.title}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
          {post.store_name && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {post.store_name}
            </Typography>
          )}
          {post.region && (
            <Typography variant="body2" color="text.secondary">· {post.region}</Typography>
          )}
        </Box>

        {post.main_menu && (
          <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.5 }}>
            대표메뉴: {post.main_menu}
          </Typography>
        )}

        {post.review && (
          <Typography variant="body2" sx={{ mt: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.review}
          </Typography>
        )}

        {tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
            {tags.slice(0, 3).map(tag => (
              <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.7rem', height: 20 }} />
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pt: 0, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Avatar sx={{ width: 20, height: 20, fontSize: '0.65rem', bgcolor: 'primary.light' }}>
            {post.profiles?.nickname?.[0] ?? '?'}
          </Avatar>
          <Typography variant="caption" color="text.secondary">
            {post.profiles?.nickname} · {formatDate(post.created_at)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {post.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <StarIcon sx={{ fontSize: 14, color: '#ffc107' }} />
              <Typography variant="caption" fontWeight={600}>{post.rating}</Typography>
            </Box>
          )}
          <IconButton size="small" onClick={handleLike} color={isLiked ? 'error' : 'default'}>
            {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
          <Typography variant="caption">{post.like_count}</Typography>
          <IconButton size="small" onClick={handleBookmark} color={isBookmarked ? 'primary' : 'default'}>
            {isBookmarked ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  )
}

export default PostCard
