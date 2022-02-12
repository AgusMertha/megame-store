import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { JWTPayloadTypes, UserTypes } from '../../../services/dataTypes'
import jwt_decode from 'jwt-decode'

export default function Profile() {
  const [user, setUser] = useState({
    avatar: '',
    name: '',
    email: ''
  })

  const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL
  
  useEffect( () => {
    const token = Cookies.get('tkn__')
    if(token){
      const jwtToken = atob(token)
      const payload: JWTPayloadTypes = jwt_decode(jwtToken)
      const userFromPayload: UserTypes = payload.player
      setUser(userFromPayload)
    }
  }, [])
  return (
    <div className="user text-center pb-50 pe-30">
      <img src={`${IMG_URL}/${user.avatar}`} width="90" height="90" className="img-fluid mb-20" style={{borderRadius: '100%'}}/>
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
      <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  )
}