// src/components/RequireAuth.jsx
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { supabase } from '/utils/supabase'

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setIsAuthenticated(!!data.session)
    }

    checkSession()

    // Optional: listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (isAuthenticated === null) return null // or a loading spinner

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />
}

export default RequireAuth
