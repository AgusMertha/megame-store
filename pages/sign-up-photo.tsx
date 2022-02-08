import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { setSignUp } from '../services/auth'
import { CategoryTypes } from '../services/dataTypes'
import { getGameCategories } from '../services/player'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

export default function SignUpPhoto() {
  const [categories, setCategories] = useState([])
  const [favorite, setFavorite] = useState('')
  const [image, setImage] = useState<any>(null)
  const [imagePreview, setImagePreview] = useState<any>(null)
  const [localForm, setLocalForm] = useState<any>({
    email: '',
    name: ''
  })
  const router = useRouter()

  const getCategories = useCallback( async () => {
    const data = await getGameCategories()
    setCategories(data)
    setFavorite(data[0]._id)
  }, [getGameCategories])

  useEffect( () => {
    getCategories()
  }, [])

  useEffect( () => {
    const getLocalForm = localStorage.getItem('user-form')
    setLocalForm(JSON.parse(getLocalForm!))
  }, [])

  const onSubmit = async () => {
    const localForm = await localStorage.getItem('user-form')
    const form = JSON.parse(localForm!)
    const data = new FormData()

    data.append('avatar', image)
    data.append('email', form.email)
    data.append('password', form.password)
    data.append('name', form.name)
    data.append('username', form.name)
    data.append('phoneNumber', '08123456789')
    data.append('favorite', favorite)
    data.append('role', 'user')
    data.append('status', 'Y')

    const result = await setSignUp(data)
    
    if(result.error == 1){
      toast.error(result.message)
    }else{
      localStorage.removeItem('user-form')
      router.push('/sign-up-success')
    }
  }

  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    {imagePreview ? <img src={imagePreview} className="img-upload" alt="Upload picture" /> : <Image src="/icon/upload.svg" width={120} height={120} alt="Upload picture" />}
                   
                    
                  </label>
                  <input id="avatar" type="file" name="avatar" accept="image/png, image/jpeg" onChange={(event) => {
                      const img = event.target.files![0]
                      setImagePreview(URL.createObjectURL(img))
                      return setImage(img)
                    }}/>
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">{localForm.name}</h2>
              <p className="text-lg text-center color-palette-1 m-0">{localForm.email}</p>
              <div className="pt-50 pb-50">
                  <label htmlFor="category" className="form-label text-lg fw-medium color-palette-1 mb-10">Favorite Game</label>
                  <select id="category" name="category" className="form-select d-block w-100 rounded-pill text-lg" value={favorite} aria-label="Favorite Game" onChange={(e) => setFavorite(e.target.value)}>
                    <option value="" disabled selected>Select Category</option>
                    {
                      categories.map((category: CategoryTypes) => {
                        return <option key={category._id} value={category._id}>{category.name}</option>
                      })
                    }
                  </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16" type="button" onClick={onSubmit}>Create My Account</button>
              <a className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15" href="#" role="button">Terms & Conditions</a>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </section>
  )
}
