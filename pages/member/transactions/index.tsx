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
