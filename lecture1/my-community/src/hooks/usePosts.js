import { useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const POST_SELECT = `
  *,
  profiles:user_id (username, nickname),
  post_tags (tag_id, tags (name))
`

export function usePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const PAGE_SIZE = 10

  const fetchPosts = useCallback(async (offset = 0) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select(POST_SELECT)
      .eq('is_draft', false)
      .order('created_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1)

    if (!error && data) {
      if (offset === 0) setPosts(data)
      else setPosts(prev => [...prev, ...data])
      setHasMore(data.length === PAGE_SIZE)
    }
    setLoading(false)
    return { data, error }
  }, [])

  const fetchPost = async (postId) => {
    const { data, error } = await supabase
      .from('posts')
      .select(POST_SELECT)
      .eq('id', postId)
      .single()
    return { data, error }
  }

  const createPost = async (postData, userId) => {
    const { tags, ...rest } = postData
    const { data, error } = await supabase
      .from('posts')
      .insert({ ...rest, user_id: userId })
      .select()
      .single()

    if (!error && data && tags?.length > 0) {
      const tagRows = tags.map(tagId => ({ post_id: data.id, tag_id: tagId }))
      await supabase.from('post_tags').insert(tagRows)
    }
    return { data, error }
  }

  const updatePost = async (postId, postData) => {
    const { tags, ...rest } = postData
    const { data, error } = await supabase
      .from('posts')
      .update(rest)
      .eq('id', postId)
      .select()
      .single()

    if (!error && data) {
      await supabase.from('post_tags').delete().eq('post_id', postId)
      if (tags?.length > 0) {
        const tagRows = tags.map(tagId => ({ post_id: postId, tag_id: tagId }))
        await supabase.from('post_tags').insert(tagRows)
      }
    }
    return { data, error }
  }

  const deletePost = async (postId) => {
    const { error } = await supabase.from('posts').delete().eq('id', postId)
    if (!error) setPosts(prev => prev.filter(p => p.id !== postId))
    return { error }
  }

  const toggleLike = async (postId, userId, isLiked) => {
    if (isLiked) {
      await supabase.from('likes').delete().match({ post_id: postId, user_id: userId })
    } else {
      await supabase.from('likes').insert({ post_id: postId, user_id: userId })
    }
  }

  const getUserLikes = async (userId) => {
    const { data } = await supabase
      .from('likes')
      .select('post_id')
      .eq('user_id', userId)
    return data?.map(l => l.post_id) ?? []
  }

  const toggleBookmark = async (postId, userId, isBookmarked) => {
    if (isBookmarked) {
      await supabase.from('bookmarks').delete().match({ post_id: postId, user_id: userId })
    } else {
      await supabase.from('bookmarks').insert({ post_id: postId, user_id: userId })
    }
  }

  const getUserBookmarks = async (userId) => {
    const { data } = await supabase
      .from('bookmarks')
      .select('post_id')
      .eq('user_id', userId)
    return data?.map(b => b.post_id) ?? []
  }

  return {
    posts, loading, hasMore,
    fetchPosts, fetchPost,
    createPost, updatePost, deletePost,
    toggleLike, getUserLikes,
    toggleBookmark, getUserBookmarks
  }
}
