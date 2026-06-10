import { useState, useEffect, useCallback } from 'react'
import {
  Box, Typography, IconButton, TextField, Button,
  CircularProgress, Alert, Grid
} from '@mui/material'
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'

const UNSPLASH_ACCESS_KEY = 'DEMO'

function getUnsplashImages(query = 'travel') {
  return Array.from({ length: 6 }, (_, i) => ({
    id: `img-${Date.now()}-${i}`,
    url: `https://picsum.photos/seed/${query}-${Date.now()}-${i}/400/400`,
    thumb: `https://picsum.photos/seed/${query}-${Date.now()}-${i}/200/200`,
  }))
}

function PostCreatePage() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [form, setForm] = useState({
    travel_title: '',
    travel_location: '',
    caption: '',
    hashtag: '',
  })
  const [images, setImages] = useState([])
  const [selectedImageUrl, setSelectedImageUrl] = useState('')
  const [isImagesLoading, setIsImagesLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const loadImages = useCallback(() => {
    setIsImagesLoading(true)
    setSelectedImageUrl('')
    setTimeout(() => {
      const newImages = getUnsplashImages('travel nature')
      setImages(newImages)
      setIsImagesLoading(false)
    }, 500)
  }, [])

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

    if (insertError) {
      setError('게시물 등록 중 오류가 발생했습니다.')
      return
    }

    navigate('/')
  }

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* 헤더 */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          px: 1,
          py: 1,
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1, flex: 1 }}>여행 기록 작성</Typography>
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{ mr: 1, borderRadius: 2 }}
        >
          {isSubmitting ? <CircularProgress size={16} color="inherit" /> : '등록'}
        </Button>
      </Box>

      <Box sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

        {/* 여행 정보 입력 */}
        <TextField
          name="travel_title"
          label="여행 제목 *"
          variant="outlined"
          fullWidth
          value={form.travel_title}
          onChange={handleChange}
          placeholder="예: 제주도 3박 4일 여행"
        />
        <TextField
          name="travel_location"
          label="여행 지역 *"
          variant="outlined"
          fullWidth
          value={form.travel_location}
          onChange={handleChange}
          placeholder="예: 제주도"
        />
        <TextField
          name="caption"
          label="여행 후기"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={form.caption}
          onChange={handleChange}
          placeholder="여행 이야기를 들려주세요..."
        />
        <TextField
          name="hashtag"
          label="해시태그"
          variant="outlined"
          fullWidth
          value={form.hashtag}
          onChange={handleChange}
          placeholder="예: #제주도 #바다 #힐링"
        />

        {/* 이미지 선택 */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="body2" fontWeight={600}>
              여행 이미지 선택 *
            </Typography>
            <IconButton size="small" onClick={loadImages} disabled={isImagesLoading}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>

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
                      position: 'relative',
                      cursor: 'pointer',
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: selectedImageUrl === img.url ? '3px solid' : '3px solid transparent',
                      borderColor: selectedImageUrl === img.url ? 'primary.main' : 'transparent',
                    }}
                  >
                    <Box
                      component="img"
                      src={img.thumb}
                      sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                    />
                    {selectedImageUrl === img.url && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          color: 'primary.main',
                          bgcolor: 'white',
                          borderRadius: '50%',
                          lineHeight: 0,
                        }}
                      >
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
