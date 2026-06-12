import { useState, useEffect, useRef } from 'react'
import {
  Box, Typography, IconButton, TextField, Button,
  CircularProgress, Alert,
} from '@mui/material'
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import { useAuth } from '../contexts/AuthContext.jsx'

function PostCreatePage() {
  const navigate = useNavigate()
  const { id: editPostId } = useParams()
  const { currentUser } = useAuth()
  const isEditMode = Boolean(editPostId)
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({ travel_title: '', travel_location: '', caption: '', hashtag: '' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [existingImageUrl, setExistingImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingPost, setIsLoadingPost] = useState(isEditMode)
  const [error, setError] = useState('')

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
        setExistingImageUrl(data.image_url || '')
      }
      setIsLoadingPost(false)
    }
    fetchPost()
  }, [editPostId, isEditMode])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('이미지 크기는 5MB 이하여야 합니다.')
      return
    }

    setError('')
    setImageFile(file)
    setImagePreviewUrl(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreviewUrl('')
    setExistingImageUrl('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const uploadImage = async () => {
    if (!imageFile) return existingImageUrl

    const fileExt = imageFile.name.split('.').pop()
    const filePath = `travel-images/${currentUser.id}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(filePath, imageFile)

    if (uploadError) throw new Error('이미지 업로드에 실패했습니다.')

    const { data: urlData } = supabase.storage
      .from('post-images')
      .getPublicUrl(filePath)

    return urlData.publicUrl
  }

  const handleSubmit = async () => {
    const hasImage = imagePreviewUrl || existingImageUrl
    if (!form.travel_title || !form.travel_location || !hasImage) {
      setError('여행 제목, 여행 지역, 이미지를 모두 입력해주세요.')
      return
    }
    setIsSubmitting(true)
    setError('')

    try {
      const imageUrl = await uploadImage()

      if (isEditMode) {
        const { error: updateError } = await supabase
          .from('dorun_posts')
          .update({
            travel_title: form.travel_title,
            travel_location: form.travel_location,
            caption: form.caption,
            hashtag: form.hashtag,
            image_url: imageUrl,
          })
          .eq('id', editPostId)

        if (updateError) throw new Error('수정 중 오류가 발생했습니다.')
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
            image_url: imageUrl,
            likes_count: 0,
          })

        if (insertError) throw new Error('게시물 등록 중 오류가 발생했습니다.')
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayImageUrl = imagePreviewUrl || existingImageUrl

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

        {/* 이미지 업로드 */}
        <Box>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>여행 이미지 *</Typography>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />

          {displayImageUrl ? (
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={displayImageUrl}
                sx={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 2, display: 'block' }}
              />
              <IconButton
                size="small"
                onClick={handleRemoveImage}
                sx={{
                  position: 'absolute', top: 8, right: 8,
                  bgcolor: 'rgba(0,0,0,0.5)', color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Button
                variant="outlined" size="small" fullWidth
                onClick={() => fileInputRef.current?.click()}
                sx={{ mt: 1, borderRadius: 2 }}
              >
                이미지 변경
              </Button>
            </Box>
          ) : (
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                border: '2px dashed', borderColor: 'divider', borderRadius: 2,
                p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
                cursor: 'pointer', gap: 1,
                '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
              }}
            >
              <AddPhotoAlternateIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                사진을 선택해주세요
              </Typography>
              <Typography variant="caption" color="text.disabled">
                JPG, PNG, WEBP · 최대 5MB
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default PostCreatePage
