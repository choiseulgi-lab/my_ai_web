import { useState, useEffect, useRef } from 'react'
import {
  Box, Container, Typography, TextField, Button,
  Grid, Alert, Divider, Chip, ToggleButton, ToggleButtonGroup, CircularProgress, LinearProgress
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import { supabase } from '../lib/supabase'
import RatingStars from '../components/common/RatingStars'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import DeleteIcon from '@mui/icons-material/Delete'
import { RANDOM_IMAGE_API } from '../constants'

const CATEGORIES = ['한식', '중식', '일식', '카페', '술집', '기타']

const TAGS_LIST = [
  { id: 1, name: '#혼밥추천' }, { id: 2, name: '#데이트' }, { id: 3, name: '#주차가능' },
  { id: 4, name: '#가성비' }, { id: 5, name: '#분위기맛집' }, { id: 6, name: '#웨이팅있음' },
  { id: 7, name: '#반려동물동반' }, { id: 8, name: '#단체모임' }, { id: 9, name: '#야외테라스' },
  { id: 10, name: '#뷰맛집' }
]

const EMPTY_FORM = {
  title: '', store_name: '', region: '', address: '',
  main_menu: '', review: '', recommended_menu: '',
  atmosphere: '', tip: '', rating: 0, image_url: '',
  is_draft: false, tags: [], category: '기타'
}

function WritePostPage() {
  const navigate = useNavigate()
  const { id: editId } = useParams()
  const { user } = useAuth()
  const { createPost, updatePost, fetchPost } = usePosts()
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  const isEdit = !!editId

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (isEdit) {
      fetchPost(editId).then(({ data }) => {
        if (data) {
          setForm({
            ...data,
            tags: data.post_tags?.map(pt => pt.tag_id) ?? []
          })
        }
      })
    }
  }, [user, isEdit, editId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleTagToggle = (tagId) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }))
  }

  const handleRandomImage = () => {
    const seed = Math.floor(Math.random() * 9999)
    setForm(prev => ({ ...prev, image_url: `${RANDOM_IMAGE_API}?lock=${seed}&t=${Date.now()}` }))
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('이미지 크기는 5MB 이하여야 해요.')
      return
    }

    setUploading(true)
    setError('')

    const ext = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}.${ext}`

    const { data, error: uploadError } = await supabase.storage
      .from('post-images')
      .upload(fileName, file, { upsert: true })

    if (uploadError) {
      setError('이미지 업로드에 실패했어요. 다시 시도해주세요.')
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(data.path)
      setForm(prev => ({ ...prev, image_url: publicUrl }))
    }
    setUploading(false)
    e.target.value = ''
  }

  const handleRemoveImage = () => {
    setForm(prev => ({ ...prev, image_url: '' }))
  }

  const handleSubmit = async (isDraft = false) => {
    if (!form.title) { setError('제목을 입력해주세요.'); return }
    setLoading(true)
    const postData = { ...form, is_draft: isDraft }
    const { error: err } = isEdit
      ? await updatePost(editId, postData)
      : await createPost(postData, user.id)

    if (err) {
      setError(err.message)
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          {isEdit ? '게시물 수정' : '맛집 등록'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField label="제목 *" name="title" value={form.title} onChange={handleChange} />

          <Divider>카테고리</Divider>

          <ToggleButtonGroup
            value={form.category}
            exclusive
            onChange={(_, v) => v && setForm(prev => ({ ...prev, category: v }))}
            sx={{ flexWrap: 'wrap', gap: 0.5 }}
          >
            {CATEGORIES.map(cat => (
              <ToggleButton key={cat} value={cat} sx={{ px: 2, py: 0.5, borderRadius: '20px !important', fontSize: '0.85rem', border: '1px solid !important', borderColor: 'divider !important' }}>
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Divider>맛집 정보</Divider>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="상호명" name="store_name" value={form.store_name} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="지역" name="region" value={form.region} onChange={handleChange} placeholder="ex. 서울 마포구" />
            </Grid>
          </Grid>

          <TextField label="주소" name="address" value={form.address} onChange={handleChange} />
          <TextField label="대표메뉴" name="main_menu" value={form.main_menu} onChange={handleChange} />

          <Divider>리뷰</Divider>

          <TextField label="방문 후기" name="review" value={form.review} onChange={handleChange} multiline rows={3} />
          <TextField label="추천 메뉴" name="recommended_menu" value={form.recommended_menu} onChange={handleChange} />
          <TextField label="분위기" name="atmosphere" value={form.atmosphere} onChange={handleChange} />
          <TextField label="꿀팁" name="tip" value={form.tip} onChange={handleChange} />

          <Box>
            <Typography variant="body2" fontWeight={600} mb={1}>평점</Typography>
            <RatingStars value={form.rating} onChange={(v) => setForm(prev => ({ ...prev, rating: v }))} />
          </Box>

          <Divider>이미지</Divider>

          {/* 숨겨진 파일 input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />

          <Box>
            {/* 업로드 중 */}
            {uploading && (
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" color="text.secondary" mb={0.5} display="block">
                  이미지 업로드 중...
                </Typography>
                <LinearProgress color="primary" />
              </Box>
            )}

            {/* 이미지 미리보기 */}
            {form.image_url && !uploading && (
              <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', mb: 1.5 }}>
                <Box
                  component="img"
                  src={form.image_url}
                  alt="미리보기"
                  sx={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }}
                />
                <Box sx={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  display: 'flex', gap: 1, p: 1.5,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                }}>
                  <Button
                    size="small"
                    startIcon={<AddPhotoAlternateIcon />}
                    onClick={() => fileInputRef.current?.click()}
                    sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.9)', color: 'text.primary', '&:hover': { bgcolor: 'white' }, fontSize: '0.75rem' }}
                  >
                    다른 사진 업로드
                  </Button>
                  <Button
                    size="small"
                    startIcon={<ShuffleIcon />}
                    onClick={handleRandomImage}
                    sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.9)', color: 'text.primary', '&:hover': { bgcolor: 'white' }, fontSize: '0.75rem' }}
                  >
                    랜덤으로 변경
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={handleRemoveImage}
                    sx={{ bgcolor: 'rgba(211,47,47,0.85)', color: 'white', '&:hover': { bgcolor: 'error.main' }, fontSize: '0.75rem' }}
                  >
                    삭제
                  </Button>
                </Box>
              </Box>
            )}

            {/* 이미지 없을 때 - 업로드 영역 */}
            {!form.image_url && !uploading && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {/* 직접 업로드 */}
                <Box
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    width: '100%', height: 160, border: '2px dashed', borderColor: 'primary.light',
                    borderRadius: 2, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 1,
                    cursor: 'pointer', bgcolor: 'primary.50',
                    '&:hover': { borderColor: 'primary.main', bgcolor: '#fce4ec' },
                    transition: 'all 0.2s',
                  }}
                >
                  <AddPhotoAlternateIcon sx={{ fontSize: 36, color: 'primary.main' }} />
                  <Typography variant="body2" color="primary" fontWeight={700}>
                    사진 직접 업로드
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    JPG, PNG, WEBP · 최대 5MB
                  </Typography>
                </Box>

                {/* 구분선 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} />
                  <Typography variant="caption" color="text.disabled">또는</Typography>
                  <Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} />
                </Box>

                {/* 랜덤 이미지 */}
                <Button
                  variant="outlined"
                  startIcon={<ShuffleIcon />}
                  onClick={handleRandomImage}
                  fullWidth
                  sx={{ py: 1.2 }}
                >
                  랜덤 음식 사진 추가
                </Button>
              </Box>
            )}
          </Box>

          <Divider>태그</Divider>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {TAGS_LIST.map(tag => (
              <Chip
                key={tag.id}
                label={tag.name}
                onClick={() => handleTagToggle(tag.id)}
                color={form.tags.includes(tag.id) ? 'primary' : 'default'}
                variant={form.tags.includes(tag.id) ? 'filled' : 'outlined'}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleSubmit(true)}
              disabled={loading}
            >
              임시저장
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleSubmit(false)}
              disabled={loading}
            >
              {loading ? '등록 중...' : '게시물 등록'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default WritePostPage
