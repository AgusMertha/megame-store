import Cookies from 'js-cookie';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'
import { JWTPayloadTypes, UserTypes } from '../../../services/dataTypes';
import { useRouter } from 'next/router';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState({
    avatar: "",
    email: "",
    id: "",
    name: "",
    phoneNumber: "",
    username: ""
  })
  const router = useRouter()

  const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL

  useEffect( () => {
    const token = Cookies.get('tkn__')

    if(token){
      const jwtToken = atob(token!.toString())
      const payload: JWTPayloadTypes = jwt_decode(jwtToken)
      const userPayload: UserTypes = payload.player
      userPayload.avatar = `${IMG_URL}/${userPayload.avatar}`
      setUser(userPayload)
      setIsLogin(true)
    }
  })

  const onLogout = () => {
    Cookies.remove('tkn__')
    router.push('/')
    setIsLogin(false)
  }

  if(!isLogin) {
    return (
      <li className="nav-item my-auto">
        <Link href="/sign-in">
          <a className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill" role="button">Sign In</a>
        </Link>
      </li>
    )
  }else{
    return (
      <li className="nav-item my-auto dropdown d-flex">
        <div className="vertical-line d-lg-block d-none"></div>
        <div>
          <Link href="#">
            <a className="dropdown-toggle ms-lg-40" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={user.avatar} className="rounded-circle" width="40" height="40" alt=""/>
            </a>
          </Link>
          <ul className="dropdown-menu border-0" aria-labelledby="dropdownMenuLink">
            <li>
              <Link href="/member">
                <a className="dropdown-item text-lg color-palette-2">My Profile</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a className="dropdown-item text-lg color-palette-2">Wallet</a>
              </Link>
            </li>
            <li>
              <Link href="/member/edit-profile">
                <a className="dropdown-item text-lg color-palette-2">Account Settings</a>
              </Link>
            </li>
            <li onClick={onLogout}>
            <a href="#" className="dropdown-item text-lg color-palette-2">Log Out</a>
            </li>
          </ul>
        </div>
      </li>
    )
  }
}
