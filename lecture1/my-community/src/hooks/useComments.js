import { useState } from 'react'
import { supabase } from '../lib/supabase'

const COMMENT_SELECT = `*, profiles:user_id (username, nickname)`

export function useComments(postId) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchComments = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('comments')
      .select(COMMENT_SELECT)
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    setComments(data ?? [])
    setLoading(false)
  }

  const addComment = async (content, userId, parentId = null) => {
    const { data, error } = await supabase
      .from('comments')
      .insert({ post_id: postId, user_id: userId, content, parent_id: parentId })
      .select(COMMENT_SELECT)
      .single()
    if (!error && data) setComments(prev => [...prev, data])
    return { data, error }
  }

  const deleteComment = async (commentId) => {
    const { error } = await supabase.from('comments').delete().eq('id', commentId)
    if (!error) setComments(prev => prev.filter(c => c.id !== commentId))
    return { error }
  }

  const toggleCommentLike = async (commentId, userId, isLiked) => {
    if (isLiked) {
      await supabase.from('comment_likes').delete().match({ comment_id: commentId, user_id: userId })
    } else {
      await supabase.from('comment_likes').insert({ comment_id: commentId, user_id: userId })
    }
    setComments(prev => prev.map(c =>
      c.id === commentId
        ? { ...c, like_count: isLiked ? c.like_count - 1 : c.like_count + 1 }
        : c
    ))
  }

  const getUserCommentLikes = async (userId) => {
    const commentIds = comments.map(c => c.id)
    if (!commentIds.length) return []
    const { data } = await supabase
      .from('comment_likes')
      .select('comment_id')
      .eq('user_id', userId)
      .in('comment_id', commentIds)
    return data?.map(l => l.comment_id) ?? []
  }

  return { comments, loading, fetchComments, addComment, deleteComment, toggleCommentLike, getUserCommentLikes }
}
