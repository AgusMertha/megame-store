import React from 'react'
import SideBar from '../../../components/organisms/sideBar'
import TransacitonDetailContent from '../../../components/organisms/transactionDetailContent'
import { JWTPayloadTypes, UserTypes } from '../../../services/dataTypes'
import jwt_decode from 'jwt-decode'
import { getTransactionDetail } from '../../../services/member'

export default function TransactionDetail({transactionDetail}: any) {
  console.log(transactionDetail)
  return (
    <section className="transactions-detail overflow-auto">
      <SideBar activeMenu="transactions"/>
      <TransacitonDetailContent data={transactionDetail}/>
    </section>
  )
}

interface getServerSideProps {
  req: {
    cookies: {
      tkn__: string
    }
  },
  params: {
    idTrx: string
  }
}

export const getServerSideProps = async ({req, params}: getServerSideProps) => {
  const {tkn__} = req.cookies
  const {idTrx} = params


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

  const response = await getTransactionDetail(idTrx, jwtToken)
  console.log(response)

  return {
    props: {
      transactionDetail: response.data
    }
  }
}