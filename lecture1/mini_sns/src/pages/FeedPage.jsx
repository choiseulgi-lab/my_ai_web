import { useState, useEffect, useCallback } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import PageLayout from '../components/layout/PageLayout.jsx'
import PostCard from '../components/common/PostCard.jsx'
import { supabase } from '../supabaseClient.js'

function FeedPage() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('dorun_posts')
      .select(`
        *,
        dorun_users ( nickname, profile_image_url )
      `)
      .order('created_at', { ascending: false })

    if (data) {
      // 각 게시물의 댓글 수 가져오기
      const postsWithCount = await Promise.all(
        data.map(async (post) => {
          const { count } = await supabase
            .from('dorun_comments')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id)
          return { ...post, comment_count: count || 0 }
        })
      )
      setPosts(postsWithCount)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleLikeUpdate = (postId, newCount) => {
    setPosts(prev =>
      prev.map(p => p.id === postId ? { ...p, likes_count: newCount } : p)
    )
  }

  return (
    <PageLayout>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h3" sx={{ mb: 1 }}>✈️</Typography>
          <Typography variant="body1" color="text.secondary">
            아직 게시물이 없어요.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            첫 여행 기록을 남겨보세요!
          </Typography>
        </Box>
      ) : (
        <Box sx={{ pt: 1.5 }}>
          {posts.map(post => (
            <PostCard key={post.id} post={post} onLikeUpdate={handleLikeUpdate} />
          ))}
        </Box>
      )}
    </PageLayout>
  )
}

export default FeedPage
