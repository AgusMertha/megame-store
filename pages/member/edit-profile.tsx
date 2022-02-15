import SideBar from "../../components/organisms/sideBar";
import Input from "../../components/atoms/input";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { JWTPayloadTypes, UserTypes } from "../../services/dataTypes";
import jwt_decode from 'jwt-decode'
import { editProfile } from "../../services/member";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function EditProfile() {
  const [imagePreview, setImagePreview] = useState<any>(null)
  const [user, setUser] = useState<any>({
    name: '',
    email: '',
    avatar: ''
  })
  
  const API_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL
  useEffect( () => {
    const token = Cookies.get('tkn__')
    if(token){
      const jwtToken = atob(token)
      const payload: JWTPayloadTypes = jwt_decode(jwtToken)
      const userFromPayload: UserTypes = payload.player
      setUser(userFromPayload)
    }
  }, [])

  const router = useRouter()

  const onEditProfileSubmit = async () => {
    const data = new FormData()

    data.append('avatar', user.avatar)
    data.append('name', user.name)

    const response = await editProfile(data)

    if(response.error){
      toast.error(response.message)
    }else{
      console.log(response);
      Cookies.remove('tkn__')
      router.push('/sign-in')
    }
  }

  return (
    <section className="edit-profile overflow-auto">
      <SideBar activeMenu={"settings"}/>
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="image-upload">
                  <label htmlFor="avatar">
                  {imagePreview ? (<img src={imagePreview} width="90" height="90" style={{borderRadius: '100%'}} />) : (<img src={`${API_IMAGE}/${user.avatar}`} width="90" height="90" style={{borderRadius: '100%'}} />)}
                  </label>
                  <input id="avatar" type="file" accept="image/png, image/jpeg" onChange={event => {
                      const img = event.target.files![0]
                      setImagePreview(URL.createObjectURL(img))
                      return setUser({
                        ...user,
                        avatar: img
                      })
                    }}/>
                </div>
              </div>
              <div className="pt-30">
                <Input label="Full Name" value={user.name} onChange={event =>{ 
                  setUser({
                    ...user,
                    name: event.target.value
                  })
                }}/>
              </div>
              <div className="pt-30">
              <Input label="Email Address" disabled value={user.email}/>
              </div>
              {/* <div className="pt-30">
              <Input label="Phone"/>
              </div> */}
              <div className="button-group d-flex flex-column pt-50">
                <button type="button" className="btn btn-save fw-medium text-lg text-white rounded-pill" onClick={onEditProfileSubmit}>Save My Profile</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}