import React from 'react'
import ButtonTab from './buttonTab'
import TableRow from './tableRow'

export default function TranscactionContent() {
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">My Transactions</h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">Rp 4.518.000.500</h3>
        </div>
        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12 main-content">
            <div id="list_status_title">
              <ButtonTab title="All Trx" active={true} filter="*"/>
              <ButtonTab title="Success" active={false} filter="success"/>
              <ButtonTab title="Pending" active={false} filter="pending"/>
              <ButtonTab title="Failed" active={false} filter="failed"/>
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
                <TableRow title="Mobile Legend" category="Mobile" image="overview-1" item={200} price={155000} status="Pending"/>
                <TableRow title="Clash of Clans" category="Mobile" image="overview-3" item={500} price={250000} status="Success"/>
                <TableRow title="Call of Duty" category="Desktop" image="overview-2" item={350} price={50000} status="Failed"/>
                <TableRow title="Mobile Legend" category="Desktop" image="overview-4" item={120} price={155000} status="Pending"/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}