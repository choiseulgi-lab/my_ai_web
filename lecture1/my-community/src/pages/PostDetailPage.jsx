import { useEffect, useState } from 'react'
import {
  Box, Container, Typography, IconButton, Avatar, Chip,
  TextField, Button, Divider, CircularProgress, Alert, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import { useComments } from '../hooks/useComments'
import RatingStars from '../components/common/RatingStars'
import { formatDate } from '../utils/auth'
import { RANDOM_IMAGE_API } from '../constants'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ReplyIcon from '@mui/icons-material/Reply'

function CommentItem({ comment, user, onDelete, onLike, isLiked, onReply }) {
  return (
    <Box sx={{ pl: comment.parent_id ? 4 : 0 }}>
      {comment.parent_id && <Box sx={{ borderLeft: '2px solid', borderColor: 'divider', pl: 1.5 }}>
        <CommentContent comment={comment} user={user} onDelete={onDelete} onLike={onLike} isLiked={isLiked} onReply={onReply} isReply />
      </Box>}
      {!comment.parent_id && <CommentContent comment={comment} user={user} onDelete={onDelete} onLike={onLike} isLiked={isLiked} onReply={onReply} />}
    </Box>
  )
}

function CommentContent({ comment, user, onDelete, onLike, isLiked, onReply, isReply }) {
  return (
    <Box sx={{ py: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.light', fontSize: '0.75rem' }}>
            {comment.profiles?.nickname?.[0] ?? '?'}
          </Avatar>
          <Typography variant="body2" fontWeight={600}>{comment.profiles?.nickname}</Typography>
          <Typography variant="caption" color="text.secondary">{formatDate(comment.created_at)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small" onClick={() => onLike(comment.id, isLiked)} color={isLiked ? 'error' : 'default'}>
            {isLiked ? <FavoriteIcon sx={{ fontSize: 14 }} /> : <FavoriteBorderIcon sx={{ fontSize: 14 }} />}
          </IconButton>
          <Typography variant="caption">{comment.like_count}</Typography>
          {!isReply && (
            <IconButton size="small" onClick={() => onReply(comment.id)}>
              <ReplyIcon sx={{ fontSize: 14 }} />
            </IconButton>
          )}
          {user?.id === comment.user_id && (
            <IconButton size="small" onClick={() => onDelete(comment.id)} color="error">
              <DeleteIcon sx={{ fontSize: 14 }} />
            </IconButton>
          )}
        </Box>
      </Box>
      <Typography variant="body2" sx={{ mt: 0.5, ml: 4.5 }}>{comment.content}</Typography>
    </Box>
  )
}

function PostDetailPage() {
  const { id: postId } = useParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const { fetchPost, deletePost, toggleLike, getUserLikes, toggleBookmark, getUserBookmarks, incrementViewCount } = usePosts()
  const { comments, loading: commentsLoading, fetchComments, addComment, deleteComment, toggleCommentLike, getUserCommentLikes } = useComments(postId)

  const [post, setPost] = useState(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likedComments, setLikedComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [deleteDialog, setDeleteDialog] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchPost(postId)
      setPost(data)
      setPageLoading(false)
      incrementViewCount(postId)
    }
    load()
    fetchComments()
  }, [postId])

  useEffect(() => {
    if (user && post) {
      getUserLikes(user.id).then(ids => setIsLiked(ids.includes(postId)))
      getUserBookmarks(user.id).then(ids => setIsBookmarked(ids.includes(postId)))
    }
  }, [user, post])

  useEffect(() => {
    if (user && comments.length > 0) {
      getUserCommentLikes(user.id).then(setLikedComments)
    }
  }, [user, comments.length])

  const handleLike = async () => {
    if (!user) { navigate('/login'); return }
    await toggleLike(postId, user.id, isLiked)
    setIsLiked(p => !p)
    setPost(p => ({ ...p, like_count: isLiked ? p.like_count - 1 : p.like_count + 1 }))
  }

  const handleBookmark = async () => {
    if (!user) { navigate('/login'); return }
    await toggleBookmark(postId, user.id, isBookmarked)
    setIsBookmarked(p => !p)
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    alert('링크가 복사됐어요!')
  }

  const handleDeletePost = async () => {
    await deletePost(postId)
    navigate('/')
  }

  const handleAddComment = async () => {
    if (!user) { navigate('/login'); return }
    if (!commentText.trim()) return
    await addComment(commentText, user.id, replyTo)
    setCommentText('')
    setReplyTo(null)
  }

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId)
  }

  const handleCommentLike = async (commentId, liked) => {
    if (!user) { navigate('/login'); return }
    await toggleCommentLike(commentId, user.id, liked)
    setLikedComments(prev => liked ? prev.filter(id => id !== commentId) : [...prev, commentId])
  }

  if (pageLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}><CircularProgress /></Box>
  if (!post) return <Container sx={{ py: 4 }}><Alert severity="error">게시물을 찾을 수 없어요.</Alert></Container>

  const seed = parseInt(post.id.replace(/-/g, '').substring(0, 8), 16) % 1000
  const imageUrl = post.image_url || `${RANDOM_IMAGE_API}?lock=${seed}`
  const tags = post.post_tags?.map(pt => pt.tags?.name).filter(Boolean) ?? []
  const isAuthor = user?.id === post.user_id

  const topComments = comments.filter(c => !c.parent_id)
  const replies = comments.filter(c => c.parent_id)

  return (
    <Container maxWidth="sm" sx={{ pb: 4 }}>
      {/* 뒤로가기 */}
      <Box sx={{ py: 1 }}>
        <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
      </Box>

      {/* 대표 이미지 */}
      <Box
        component="img"
        src={imageUrl}
        alt={post.title}
        sx={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 2, mb: 2 }}
      />

      {/* 제목 & 기본정보 */}
      <Typography variant="h5" fontWeight={700}>{post.title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
        {post.store_name && <Typography variant="body2" fontWeight={600}>{post.store_name}</Typography>}
        {post.region && <Typography variant="body2" color="text.secondary">· {post.region}</Typography>}
        {post.rating && <RatingStars value={post.rating} readOnly />}
      </Box>

      {post.address && (
        <Typography variant="body2" color="text.secondary" mt={0.5}>📍 {post.address}</Typography>
      )}

      {/* 태그 */}
      {tags.length > 0 && (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1.5 }}>
          {tags.map(tag => <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />)}
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* 상세 내용 */}
      {[
        { label: '대표 메뉴', value: post.main_menu },
        { label: '방문 후기', value: post.review },
        { label: '추천 메뉴', value: post.recommended_menu },
        { label: '분위기', value: post.atmosphere },
        { label: '꿀팁', value: post.tip },
      ].filter(item => item.value).map(item => (
        <Box key={item.label} sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>{item.label}</Typography>
          <Typography variant="body1" mt={0.5}>{item.value}</Typography>
        </Box>
      ))}

      {/* 작성자 정보 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
          {post.profiles?.nickname?.[0] ?? '?'}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight={600}>{post.profiles?.nickname}</Typography>
          <Typography variant="caption" color="text.secondary">{formatDate(post.created_at)}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 하단 액션 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleLike} color={isLiked ? 'error' : 'default'}>
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2">{post.like_count}</Typography>
          </Box>
          <IconButton onClick={handleBookmark} color={isBookmarked ? 'primary' : 'default'}>
            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
          <IconButton onClick={handleShare}><ShareIcon /></IconButton>
        </Box>

        {isAuthor && (
          <Box>
            <IconButton onClick={() => navigate(`/edit/${post.id}`)}><EditIcon /></IconButton>
            <IconButton color="error" onClick={() => setDeleteDialog(true)}><DeleteIcon /></IconButton>
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 댓글 영역 */}
      <Typography variant="h6" fontWeight={700} mb={2}>댓글 {comments.length}</Typography>

      {commentsLoading ? (
        <CircularProgress size={20} />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {topComments.map(comment => (
            <Box key={comment.id}>
              <CommentItem
                comment={comment}
                user={user}
                onDelete={handleDeleteComment}
                onLike={handleCommentLike}
                isLiked={likedComments.includes(comment.id)}
                onReply={setReplyTo}
              />
              {replies.filter(r => r.parent_id === comment.id).map(reply => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  user={user}
                  onDelete={handleDeleteComment}
                  onLike={handleCommentLike}
                  isLiked={likedComments.includes(reply.id)}
                  onReply={setReplyTo}
                />
              ))}
              <Divider />
            </Box>
          ))}
        </Box>
      )}

      {/* 댓글 입력 */}
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {replyTo && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'action.hover', p: 1, borderRadius: 1 }}>
            <Typography variant="caption">대댓글 작성 중</Typography>
            <Button size="small" onClick={() => setReplyTo(null)}>취소</Button>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            placeholder={user ? '댓글을 입력해주세요' : '로그인 후 댓글을 남길 수 있어요'}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            size="small"
            disabled={!user}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddComment() } }}
            sx={{ flex: 1 }}
          />
          <Button variant="contained" onClick={handleAddComment} disabled={!user || !commentText.trim()}>등록</Button>
        </Box>
      </Box>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>게시물 삭제</DialogTitle>
        <DialogContent>
          <Typography>정말로 이 게시물을 삭제할까요?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>취소</Button>
          <Button color="error" variant="contained" onClick={handleDeletePost}>삭제</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default PostDetailPage
