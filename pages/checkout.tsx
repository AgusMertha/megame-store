import CheckoutConfirmation from "../components/organisms/checkout/checkoutConfirmation";
import CheckoutDetail from "../components/organisms/checkout/checkoutDetail";
import CheckoutItem from "../components/organisms/checkout/checkoutItem";
import Image from 'next/image'
import jwt_decode from 'jwt-decode'
import { JWTPayloadTypes, UserTypes } from "../services/dataTypes";

interface CheckoutProps {
  user: UserTypes
}

export default function Checkout(props: CheckoutProps) {
  const {user} = props;
  console.log(user)
  return (
    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <div className="container-fluid">
        <div className="logo text-md-center text-start pb-50">
          <a className="" href="#">
            <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
          </a>
        </div>
        <div className="title-text pt-md-50 pt-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
          <p className="text-lg color-palette-1 mb-0">Waktunya meningkatkan cara bermain</p>
        </div>
        <CheckoutItem/>
        <hr />
        <CheckoutDetail/>
        <CheckoutConfirmation/>
      </div>
    </section>
  );
}

export const getServerSideProps = async ({req}: any) => {
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
  console.log(payload);
  return {
    props: {
      user: userPayload
    }
  }
}