import React from 'react'
import SideBar from '../../../components/organisms/sideBar'
import TransacitonDetailContent from '../../../components/organisms/transactionDetailContent'

export default function TransactionDetail() {
  return (
    <section className="transactions-detail overflow-auto">
      <SideBar activeMenu="transactions"/>
      <TransacitonDetailContent/>
    </section>
  )
}
