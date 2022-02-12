import { useEffect, useState } from "react"

export default function CheckoutItem() {
  const [dataItem, setDataItem] = useState({
    thumbnail: '',
    name: '',
    category: {
      name: ''
    }
  })
  useEffect( () => {
      let dataItemLocal: any = localStorage.getItem('data-item')
      dataItemLocal = JSON.parse(dataItemLocal!)
      setDataItem(dataItemLocal)
  }, [])

  const API_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL

  return (
    <div className="game-checkout d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
      <div className="pe-4">
        <div className="cropped">
          <img src={`${API_IMAGE}/${dataItem.thumbnail}`} className="img-fluid" alt=""/>
        </div>
      </div>
      <div>
        <p className="fw-bold text-xl color-palette-1 mb-10">{dataItem.name}</p>
        <p className="color-palette-2 m-0">Category: {dataItem.category.name}</p>
      </div>
    </div>
  )
}
