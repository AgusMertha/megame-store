import React from 'react'
import SideBar from '../../../components/organisms/sideBar'
import TranscactionContent from '../../../components/organisms/transactionContent'


export default function Transaction() {
  return (
    <section className="transactions overflow-auto">
      <SideBar activeMenu="transactions"/>
      <TranscactionContent/>
    </section>
  )
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
  
  if(!tkn__){
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}