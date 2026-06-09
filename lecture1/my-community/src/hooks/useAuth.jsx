import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '../lib/supabase'
import { toEmail } from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else { setProfile(null); setLoading(false) }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    setProfile(data)
    setLoading(false)
  }

  const signUp = async ({ username, password, nickname }) => {
    const email = toEmail(username)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname } }
    })
    return { data, error }
  }

  const signIn = async ({ username, password }) => {
    const email = toEmail(username)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const checkUsernameExists = async (username) => {
    const { count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('username', username)
    return count > 0
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, checkUsernameExists }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
