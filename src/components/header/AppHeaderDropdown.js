import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { supabase } from '/utils/supabase'
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('')

  useEffect(() => {
    const fetchUsername = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (user && user.user_metadata?.username) {
        setUsername(user.user_metadata.username)
      }
    }

    fetchUsername()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error.message)
    } else {
      console.log(user.user_metadata.username)
    }
  }

  return (
    <>
      {username ? (
        <CDropdown variant="nav-item">
          <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
            <CAvatar size='md' color="primary" textColor="white">
              <CIcon icon={cilUser} />
            </CAvatar>
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
            <CDropdownItem href="">
              <div>Hello <b>{username}</b>!</div>
            </CDropdownItem>
            <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
            <CDropdownItem href="#">
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>
            <CDropdownItem href="#">
              <CIcon icon={cilSettings} className="me-2" />
              Settings
            </CDropdownItem>
            <CDropdownItem onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <CDropdownDivider />
              <CIcon icon={cilAccountLogout} className="me-2" />
              Log Out
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      ) : (
        // 👇 Customize this fallback section for unauthenticated users
        <div className="d-flex align-items-center ms-3">
          <CButton color="primary" onClick={() => navigate('/login')} className="me-2">Log in</CButton>
          <CButton color="secondary" onClick={() => navigate('/register')}>Register</CButton>
        </div>
      )}
    </>
  )
}

export default AppHeaderDropdown
