import React, { useState, createContext } from 'react'

export const ProfilePicContext = createContext()

export const ProfilePicProvider = (props) => {
  const [profilePic, setProfilePic] = useState()
  return (
    <ProfilePicContext.Provider value={[profilePic, setProfilePic]}>
      {props.children}
    </ProfilePicContext.Provider>
  )
}
