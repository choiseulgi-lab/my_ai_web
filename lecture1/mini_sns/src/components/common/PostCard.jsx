import { Box, Typography, Avatar, IconButton } from '@mui/material'
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ModeCommentOutlined as ChatBubbleOutlineIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient.js'
import { formatDistanceToNow } from '../../utils/formatTime.js'

function PostCard({ post, onLikeUpdate }) {
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()

  const handleLike = async (e) => {
    e.stopPropagation()
    const newLiked = !liked
    setLiked(newLiked)
    const newCount = newLiked ? post.likes_count + 1 : post.likes_count - 1
    await supabase.from('dorun_posts').update({ likes_count: newCount }).eq('id', post.id)
    if (onLikeUpdate) onLikeUpdate(post.id, newCount)
  }

  return (
    <Box
      sx={{ bgcolor: 'background.paper', mb: 2.5, cursor: 'pointer' }}
      onClick={() => navigate(`/post/${post.id}`)}
    >
      {/* 상단: 프로필 + 지역 */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2.5, py: 2, gap: 1.5 }}>
        <Avatar
          src={post.dorun_users?.profile_image_url}
          sx={{ width: 44, height: 44, bgcolor: 'primary.light' }}
        >
          {post.dorun_users?.nickname?.[0]}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 0.2 }}>
            {post.dorun_users?.nickname || '여행자'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 13, color: 'primary.main' }} />
            <Typography variant="caption" color="text.secondary">
              {post.travel_location}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 이미지 */}
      <Box
        component="img"
        src={post.image_url}
        alt={post.travel_title}
        sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', bgcolor: 'grey.200' }}
        onError={(e) => { e.target.src = 'https://picsum.photos/400/400?random=' + post.id }}
      />

      {/* 하단: 좋아요, 댓글, 내용 */}
      <Box sx={{ px: 2.5, pt: 1.5, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <IconButton size="small" onClick={handleLike} sx={{ p: 0.5, color: liked ? 'error.main' : 'text.secondary' }}>
            {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {(post.likes_count || 0) + (liked ? 1 : 0)}
          </Typography>
          <IconButton size="small" sx={{ p: 0.5, color: 'text.secondary' }}>
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {post.comment_count || 0}
          </Typography>
        </Box>

        <Typography variant="body2" fontWeight={700} sx={{ mb: 0.5 }}>
          {post.travel_title}
        </Typography>
        {post.caption && (
          <Typography
            variant="body2" color="text.secondary"
            sx={{ mb: 0.5, lineHeight: 1.6, overflow: 'hidden', textOverflow: 'ellipsis',
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          >
            {post.caption}
          </Typography>
        )}
        {post.hashtag && (
          <Typography variant="caption" color="primary.main" sx={{ mb: 0.5, display: 'block' }}>
            {post.hashtag}
          </Typography>
        )}
        <Typography variant="caption" color="text.disabled">
          {formatDistanceToNow(post.created_at)}
        </Typography>
      </Box>
    </Box>
  )
}

export default PostCard
