import OverviewContent from "../../components/organisms/overviewContent";
import SideBar from "../../components/organisms/sideBar";
import { JWTPayloadTypes, UserTypes } from "../../services/dataTypes";
import jwt_decode from 'jwt-decode'

export default function Member() {
  return (
    <section className="overview overflow-auto">
      <SideBar activeMenu="overview"/>
      <OverviewContent/>
    </section>
  );
}

interface getServerSideProps {
  req: {
    cookies: {
      tkn__: string
    }
  }
}

export const getServerSideProps = async ({req}: getServerSideProps) => {
  const {tkn__} = req.cookies
  console.log(tkn__);
  
  if(!tkn__){
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }

  const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL
  const jwtToken = Buffer.from(tkn__!.toString(), 'base64').toString('ascii')
  
  const payload: JWTPayloadTypes = jwt_decode(jwtToken)
  const userPayload: UserTypes = payload.player
  userPayload.avatar = `${IMG_URL}/${userPayload.avatar}`
  return {
    props: {
      user: userPayload
    }
  }
}