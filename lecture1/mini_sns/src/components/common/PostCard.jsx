import { Box, Typography, Avatar, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ModeCommentOutlined as ChatBubbleOutlineIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient.js'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { formatDistanceToNow } from '../../utils/formatTime.js'

function PostCard({ post, onLikeUpdate, onDelete }) {
  const [liked, setLiked] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const isMyPost = currentUser?.id === post.user_id

  const handleLike = async (e) => {
    e.stopPropagation()
    const newLiked = !liked
    setLiked(newLiked)
    const newCount = newLiked ? post.likes_count + 1 : post.likes_count - 1
    await supabase.from('dorun_posts').update({ likes_count: newCount }).eq('id', post.id)
    if (onLikeUpdate) onLikeUpdate(post.id, newCount)
  }

  const handleMenuOpen = (e) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = (e) => {
    e?.stopPropagation()
    setAnchorEl(null)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    handleMenuClose()
    navigate(`/edit/${post.id}`)
  }

  const handleDeleteConfirm = async () => {
    setIsDeleteDialogOpen(false)
    await supabase.from('dorun_posts').delete().eq('id', post.id)
    if (onDelete) onDelete(post.id)
  }

  return (
    <Box
      sx={{ bgcolor: 'background.paper', mb: 1, cursor: 'pointer' }}
      onClick={() => navigate(`/post/${post.id}`)}
    >
      {/* 상단: 프로필 + 지역 + 메뉴 */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, gap: 1.5 }}>
        <Avatar
          src={post.dorun_users?.profile_image_url}
          sx={{ width: 40, height: 40, bgcolor: 'primary.light' }}
        >
          {post.dorun_users?.nickname?.[0]}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={600}>
            {post.dorun_users?.nickname || '여행자'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 13, color: 'primary.main' }} />
            <Typography variant="caption" color="text.secondary">
              {post.travel_location}
            </Typography>
          </Box>
        </Box>
        {isMyPost && (
          <IconButton size="small" onClick={handleMenuOpen} sx={{ color: 'text.secondary' }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* 이미지 */}
      <Box
        component="img"
        src={post.image_url}
        alt={post.travel_title}
        sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', bgcolor: 'grey.200' }}
        onError={(e) => { e.target.src = 'https://picsum.photos/400/400?random=' + post.id }}
      />

      {/* 하단: 좋아요, 댓글, 시간 */}
      <Box sx={{ px: 2, py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <IconButton size="small" onClick={handleLike} sx={{ p: 0.5, color: liked ? 'error.main' : 'text.secondary' }}>
            {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            {(post.likes_count || 0) + (liked ? 1 : 0)}
          </Typography>
          <IconButton size="small" sx={{ p: 0.5, color: 'text.secondary' }}>
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            {post.comment_count || 0}
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight={600} sx={{ mb: 0.3 }}>{post.travel_title}</Typography>
        {post.caption && (
          <Typography
            variant="body2" color="text.secondary"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          >
            {post.caption}
          </Typography>
        )}
        {post.hashtag && (
          <Typography variant="caption" color="primary.main" sx={{ mt: 0.3, display: 'block' }}>
            {post.hashtag}
          </Typography>
        )}
        <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
          {formatDistanceToNow(post.created_at)}
        </Typography>
      </Box>

      {/* ⋮ 드롭다운 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleEdit}>수정</MenuItem>
        <MenuItem
          onClick={(e) => { e.stopPropagation(); handleMenuClose(); setIsDeleteDialogOpen(true) }}
          sx={{ color: 'error.main' }}
        >
          삭제
        </MenuItem>
      </Menu>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog open={isDeleteDialogOpen} onClose={(e) => { e?.stopPropagation(); setIsDeleteDialogOpen(false) }}
        onClick={(e) => e.stopPropagation()}>
        <DialogTitle>게시물을 삭제할까요?</DialogTitle>
        <DialogActions>
          <Button onClick={(e) => { e.stopPropagation(); setIsDeleteDialogOpen(false) }}>취소</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">삭제</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PostCard
