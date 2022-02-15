import React, { useCallback, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { toast } from 'react-toastify'
import { getMemberTransactions } from '../../../services/member'
import ButtonTab from './buttonTab'
import TableRow from './tableRow'

export default function TranscactionContent() {
  const [memberTransactions, setMemberTransactions] = useState([])
  const [totalTransaction, setTotalTransaction] = useState(0)
  const [tab, setTab] = useState('all')
  
  const memberTranasctionList = useCallback( async (value) => {
    const response = await getMemberTransactions(value)
    if(response.error){
      toast.error(response.message)
    }else{
      setMemberTransactions(response.data.data)
      setTotalTransaction(response.data.total)
    }
  }, [])
  useEffect(() =>{
    memberTranasctionList("all")
  }, [])

  const onTabClick = (value: string) => {
    setTab(value)
    memberTranasctionList(value)
  }

  const API_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">My Transactions</h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
            <NumberFormat value={totalTransaction} displayType={'text'} prefix={'Rp. '} thousandSeparator={'.'} decimalSeparator={","}/>
          </h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <ButtonTab onClick={ () => onTabClick("all")} title="All Trx" active={tab === 'all'} filter="*"/>
              <ButtonTab onClick={ () => onTabClick("success")} title="Success" active={tab === 'success'} filter="success"/>
              <ButtonTab onClick={ () => onTabClick("pending")} title="Pending" active={tab === 'pending'} filter="pending"/>
              <ButtonTab onClick={ () => onTabClick("failed")} title="Failed" active={tab === 'failed'} filter="failed"/>
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="" scope="col">Game</th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                {
                  memberTransactions.map((transaction: any) => {
                    console.log(transaction);
                    return (
                      <TableRow 
                        key={transaction._id} 
                        id={transaction._id} 
                        title={transaction.historyVoucherTopup.gameName} 
                        category={transaction.historyVoucherTopup.category} 
                        image={`${API_IMAGE}/${transaction.historyVoucherTopup.thumbnail}`}
                        item={`${transaction.historyVoucherTopup.coinQuantity} ${transaction.historyVoucherTopup.coinName}`}
                        price={transaction.value}
                        status={transaction.status} 
                      />)
                  })
                }
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
