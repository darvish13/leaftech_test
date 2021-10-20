import React, { useState } from 'react'
import CaptureData from '../../components/mediaApis/CaptureData'
import ImageSeg from '../../modules/imgseg/ImageSeg'

const Sandbox = () => {
  const [GoodToGo, setGoodToGo] = useState(false)
  const [ImageData, setImageData] = useState()

  // Image annotation
  if (GoodToGo) return <ImageSeg imageUrl={ImageData} />

  // Capture image
  return (
  <CaptureData
      imageData={ImageData}
      setImageData={setImageData}
      setGoodToGo={setGoodToGo}
    />
  )
}

export default Sandbox
