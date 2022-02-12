import router from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"
import { setCheckout } from "../../../services/player"

export default function CheckoutConfirmation() {
  const [checkbox, setCheckbox] = useState(false)

  const onSubmit = async () => {
    let dataTopupLocal: any = localStorage.getItem('data-topup')
    let dataItemLocal: any = localStorage.getItem('data-item')
    
    dataTopupLocal = JSON.parse(dataTopupLocal!)
    dataItemLocal = JSON.parse(dataItemLocal!)

    if(!checkbox){
      toast.error('Pastikan anda telah melakukan pembayaran')
    }else{
      const data = {
        voucher: dataItemLocal._id,
        nominal: dataTopupLocal.nominalItem._id,
        payment: dataTopupLocal.paymentItem.payment._id,
        bank: dataTopupLocal.paymentItem.bank._id,
        name: dataTopupLocal.bankAccountName,
        accountUser: dataTopupLocal.verifyID
      }

      const response = await setCheckout(data)
      if(response.error){
        toast.error(response.message)
      }else{
        toast.success('checkout berhasil')
        router.push('/complete-checkout')
      }
      
    }
  }
  return (
    <>
     <label className="checkbox-label text-lg color-palette-1">I have transferred the money
        <input type="checkbox" checked={checkbox} onChange={() => setCheckbox(!checkbox)}/>
        <span className="checkmark"></span>
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg" type="button" onClick={onSubmit}>Confirm Payment</button>
      </div> 
    </>
  )
}
