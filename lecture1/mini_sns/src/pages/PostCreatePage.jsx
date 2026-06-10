import { useState, useEffect, useCallback } from 'react'
import {
  Box, Typography, IconButton, TextField, Button,
  CircularProgress, Alert, Grid,
} from '@mui/material'
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'

function getRandomImages() {
  return Array.from({ length: 6 }, (_, i) => ({
    id: `img-${Date.now()}-${i}`,
    url: `https://picsum.photos/seed/travel-${Date.now()}-${i}/400/400`,
    thumb: `https://picsum.photos/seed/travel-${Date.now()}-${i}/200/200`,
  }))
}

function PostCreatePage() {
  const navigate = useNavigate()
  const { id: editPostId } = useParams()
  const { currentUser } = useAuth()
  const isEditMode = Boolean(editPostId)

  const [form, setForm] = useState({ travel_title: '', travel_location: '', caption: '', hashtag: '' })
  const [images, setImages] = useState([])
  const [selectedImageUrl, setSelectedImageUrl] = useState('')
  const [isImagesLoading, setIsImagesLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingPost, setIsLoadingPost] = useState(isEditMode)
  const [error, setError] = useState('')

  // 수정 모드: 기존 게시물 데이터 로드
  useEffect(() => {
    if (!isEditMode) return
    const fetchPost = async () => {
      setIsLoadingPost(true)
      const { data } = await supabase.from('dorun_posts').select('*').eq('id', editPostId).single()
      if (data) {
        setForm({
          travel_title: data.travel_title,
          travel_location: data.travel_location,
          caption: data.caption || '',
          hashtag: data.hashtag || '',
        })
        setSelectedImageUrl(data.image_url || '')
      }
      setIsLoadingPost(false)
    }
    fetchPost()
  }, [editPostId, isEditMode])

  const loadImages = useCallback(() => {
    setIsImagesLoading(true)
    if (!isEditMode) setSelectedImageUrl('')
    setTimeout(() => {
      setImages(getRandomImages())
      setIsImagesLoading(false)
    }, 500)
  }, [isEditMode])

  useEffect(() => {
    loadImages()
  }, [loadImages])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.travel_title || !form.travel_location || !selectedImageUrl) {
      setError('여행 제목, 여행 지역, 이미지를 모두 입력/선택해주세요.')
      return
    }
    setIsSubmitting(true)
    setError('')

    if (isEditMode) {
      const { error: updateError } = await supabase
        .from('dorun_posts')
        .update({
          travel_title: form.travel_title,
          travel_location: form.travel_location,
          caption: form.caption,
          hashtag: form.hashtag,
          image_url: selectedImageUrl,
        })
        .eq('id', editPostId)

      setIsSubmitting(false)
      if (updateError) { setError('수정 중 오류가 발생했습니다.'); return }
      navigate(`/post/${editPostId}`, { replace: true })
    } else {
      const { error: insertError } = await supabase
        .from('dorun_posts')
        .insert({
          user_id: currentUser.id,
          travel_title: form.travel_title,
          travel_location: form.travel_location,
          caption: form.caption,
          hashtag: form.hashtag,
          image_url: selectedImageUrl,
          likes_count: 0,
        })

      setIsSubmitting(false)
      if (insertError) { setError('게시물 등록 중 오류가 발생했습니다.'); return }
      navigate('/')
    }
  }

  if (isLoadingPost) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* 헤더 */}
      <Box
        sx={{
          position: 'sticky', top: 0,
          bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider',
          zIndex: 10, display: 'flex', alignItems: 'center', px: 1, py: 1,
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1, flex: 1 }}>
          {isEditMode ? '여행 기록 수정' : '여행 기록 작성'}
        </Typography>
        <Button
          variant="contained" size="small" onClick={handleSubmit}
          disabled={isSubmitting} sx={{ mr: 1, borderRadius: 2 }}
        >
          {isSubmitting ? <CircularProgress size={16} color="inherit" /> : isEditMode ? '저장' : '등록'}
        </Button>
      </Box>

      <Box sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

        <TextField name="travel_title" label="여행 제목 *" variant="outlined" fullWidth
          value={form.travel_title} onChange={handleChange} placeholder="예: 제주도 3박 4일 여행" />
        <TextField name="travel_location" label="여행 지역 *" variant="outlined" fullWidth
          value={form.travel_location} onChange={handleChange} placeholder="예: 제주도" />
        <TextField name="caption" label="여행 후기" variant="outlined" fullWidth multiline rows={3}
          value={form.caption} onChange={handleChange} placeholder="여행 이야기를 들려주세요..." />
        <TextField name="hashtag" label="해시태그" variant="outlined" fullWidth
          value={form.hashtag} onChange={handleChange} placeholder="예: #제주도 #바다 #힐링" />

        {/* 이미지 선택 */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="body2" fontWeight={600}>여행 이미지 선택 *</Typography>
            <IconButton size="small" onClick={loadImages} disabled={isImagesLoading}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* 수정 모드: 현재 이미지 미리보기 */}
          {isEditMode && selectedImageUrl && !images.some(img => img.url === selectedImageUrl) && (
            <Box sx={{ mb: 1.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                현재 이미지
              </Typography>
              <Box
                component="img" src={selectedImageUrl}
                sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 2, border: '3px solid', borderColor: 'primary.main' }}
              />
            </Box>
          )}

          {isImagesLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
              <CircularProgress size={28} color="primary" />
            </Box>
          ) : (
            <Grid container spacing={1}>
              {images.map((img) => (
                <Grid item xs={4} key={img.id}>
                  <Box
                    onClick={() => setSelectedImageUrl(img.url)}
                    sx={{
                      position: 'relative', cursor: 'pointer', borderRadius: 2, overflow: 'hidden',
                      border: selectedImageUrl === img.url ? '3px solid' : '3px solid transparent',
                      borderColor: selectedImageUrl === img.url ? 'primary.main' : 'transparent',
                    }}
                  >
                    <Box component="img" src={img.thumb}
                      sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
                    {selectedImageUrl === img.url && (
                      <Box sx={{ position: 'absolute', top: 4, right: 4, color: 'primary.main', bgcolor: 'white', borderRadius: '50%', lineHeight: 0 }}>
                        <CheckCircleIcon fontSize="small" />
                      </Box>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default PostCreatePage
