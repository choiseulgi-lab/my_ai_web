import { useState, useEffect } from 'react'
import {
  Box, Typography, Avatar, IconButton, CircularProgress,
  SwipeableDrawer, TextField, Button, Divider,
  Dialog, DialogTitle, DialogActions,
} from '@mui/material'
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ModeCommentOutlined as ChatBubbleOutlineIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { formatDistanceToNow } from '../utils/formatTime.js'

function PostDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [liked, setLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const { data: postData } = await supabase
        .from('dorun_posts')
        .select('*, dorun_users ( nickname, profile_image_url )')
        .eq('id', id)
        .single()

      const { data: commentData } = await supabase
        .from('dorun_comments')
        .select('*, dorun_users ( nickname, profile_image_url )')
        .eq('post_id', id)
        .order('created_at', { ascending: true })

      if (postData) setPost(postData)
      if (commentData) setComments(commentData)
      setIsLoading(false)
    }
    fetchData()
  }, [id])

  const isMyPost = post && currentUser?.id === post.user_id

  const handleLike = async () => {
    const newLiked = !liked
    setLiked(newLiked)
    const newCount = newLiked ? post.likes_count + 1 : post.likes_count - 1
    setPost(prev => ({ ...prev, likes_count: newCount }))
    await supabase.from('dorun_posts').update({ likes_count: newCount }).eq('id', id)
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    setIsSubmitting(true)
    const { data } = await supabase
      .from('dorun_comments')
      .insert({ post_id: id, user_id: currentUser.id, content: newComment.trim() })
      .select('*, dorun_users ( nickname, profile_image_url )')
      .single()
    if (data) {
      setComments(prev => [...prev, data])
      setNewComment('')
    }
    setIsSubmitting(false)
  }

  const handleDelete = async () => {
    setIsDeleteDialogOpen(false)
    await supabase.from('dorun_posts').delete().eq('id', id)
    navigate('/', { replace: true })
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (!post) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>게시물을 찾을 수 없습니다.</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>홈으로</Button>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* 상단 헤더 */}
      <Box
        sx={{
          position: 'sticky', top: 0,
          bgcolor: 'background.paper',
          borderBottom: '1px solid', borderColor: 'divider',
          zIndex: 10, display: 'flex', alignItems: 'center', px: 1, py: 1,
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1, flex: 1 }}>게시물</Typography>
        {isMyPost && (
          <Box sx={{ display: 'flex', gap: 0.5, mr: 0.5 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate(`/edit/${id}`)}
              sx={{ minWidth: 0, px: 1.5, py: 0.4, fontSize: '0.8rem', borderRadius: 2 }}
            >
              수정
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => setIsDeleteDialogOpen(true)}
              sx={{ minWidth: 0, px: 1.5, py: 0.4, fontSize: '0.8rem', borderRadius: 2 }}
            >
              삭제
            </Button>
          </Box>
        )}
      </Box>

      {/* 게시물 카드 */}
      <Box sx={{ bgcolor: 'background.paper', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, gap: 1.5 }}>
          <Avatar src={post.dorun_users?.profile_image_url} sx={{ width: 40, height: 40, bgcolor: 'primary.light' }}>
            {post.dorun_users?.nickname?.[0]}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>{post.dorun_users?.nickname || '여행자'}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 13, color: 'primary.main' }} />
              <Typography variant="caption" color="text.secondary">{post.travel_location}</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          component="img" src={post.image_url} alt={post.travel_title}
          sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.target.src = 'https://picsum.photos/400/400?random=' + post.id }}
        />

        <Box sx={{ px: 2, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <IconButton size="small" onClick={handleLike} sx={{ p: 0.5, color: liked ? 'error.main' : 'text.secondary' }}>
              {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
            <Typography variant="caption">{post.likes_count || 0}</Typography>
            <IconButton size="small" onClick={() => setIsDrawerOpen(true)} sx={{ p: 0.5, color: 'text.secondary' }}>
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            <Typography variant="caption">{comments.length}</Typography>
          </Box>
          <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>{post.travel_title}</Typography>
          {post.caption && <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{post.caption}</Typography>}
          {post.hashtag && <Typography variant="caption" color="primary.main">{post.hashtag}</Typography>}
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
            {formatDistanceToNow(post.created_at)}
          </Typography>
        </Box>
      </Box>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>게시물을 삭제할까요?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>취소</Button>
          <Button onClick={handleDelete} color="error" variant="contained">삭제</Button>
        </DialogActions>
      </Dialog>

      {/* 댓글 Bottom Sheet */}
      <SwipeableDrawer
        anchor="bottom" open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)} onOpen={() => setIsDrawerOpen(true)}
        disableSwipeToOpen
        PaperProps={{
          sx: {
            maxWidth: 480, mx: 'auto',
            borderTopLeftRadius: 16, borderTopRightRadius: 16,
            maxHeight: '80vh', display: 'flex', flexDirection: 'column',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1.5, pb: 1 }}>
          <Box sx={{ width: 40, height: 4, bgcolor: 'grey.300', borderRadius: 2 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pb: 1 }}>
          <Typography variant="h6" sx={{ flex: 1 }}>댓글 {comments.length}개</Typography>
          <IconButton size="small" onClick={() => setIsDrawerOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider />

        <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 1 }}>
          {comments.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
              첫 댓글을 남겨보세요!
            </Typography>
          ) : (
            comments.map(comment => (
              <Box key={comment.id} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                <Avatar src={comment.dorun_users?.profile_image_url} sx={{ width: 32, height: 32, bgcolor: 'primary.light', flexShrink: 0 }}>
                  {comment.dorun_users?.nickname?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="caption" fontWeight={600}>{comment.dorun_users?.nickname || '여행자'}</Typography>
                  <Typography variant="body2" sx={{ mt: 0.3 }}>{comment.content}</Typography>
                  <Typography variant="caption" color="text.disabled">{formatDistanceToNow(comment.created_at)}</Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>

        <Divider />
        <Box sx={{ display: 'flex', gap: 1, px: 2, py: 1.5, alignItems: 'center' }}>
          <Avatar src={currentUser?.profile_image_url} sx={{ width: 32, height: 32, bgcolor: 'primary.light', flexShrink: 0 }}>
            {currentUser?.nickname?.[0]}
          </Avatar>
          <TextField
            variant="outlined" placeholder="댓글 입력..." size="small" fullWidth
            value={newComment} onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
          <Button variant="contained" size="small" onClick={handleAddComment}
            disabled={isSubmitting || !newComment.trim()} sx={{ borderRadius: 2, flexShrink: 0 }}>
            등록
          </Button>
        </Box>
      </SwipeableDrawer>
    </Box>
  )
}

export default PostDetailPage
