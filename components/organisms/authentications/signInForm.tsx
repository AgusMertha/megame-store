import Link from 'next/link';
import { useState } from 'react';
import cx from 'classnames'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setSignIn } from '../../../services/auth';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const className = {
    label: cx('form-label text-lg fw-medium color-palette-1 mb-10'),
    input: cx('form-control rounded-pill text-lg')
  }

  const submitLogin = async () => {
    const data = {email, password}
    
    if(!email || !password) {
      toast.error('Email & password harus diisi')
    }else{
      const response = await setSignIn(data)
      if(response.error){
        toast.error(response.message)
      }else{
        const {token} = response.data
        const tokenBase64 = btoa(token)
        Cookies.set('tkn__', tokenBase64), {expires: 1}
        
        router.push('/')
      }
    }
  }

  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
      <p className="text-lg color-palette-1 m-0">Masuk untuk melakukan proses top up</p>
      <div className="pt-50">
        <label htmlFor="email" className={className.label}>Email Address</label>
        <input type="email" className={className.input} id="email" name="email" aria-describedby="email" placeholder="Enter your email address" value={email} onChange={(event) => setEmail(event.target.value)}/>
      </div>
      <div className="pt-30">
        <label htmlFor="password" className={className.label}>Password</label>
        <input type="password" className={className.input} id="password" name="password" aria-describedby="password" placeholder="Your password" value={password} onChange={(event) => setPassword(event.target.value)}/>
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16" type="button" onClick={submitLogin}>Continue to Sign In</button>
        <Link href="/sign-up">
        <a className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill">Sign Up</a>
        </Link>
      </div> 
      <ToastContainer/>
    </>
  )
}
