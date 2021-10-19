import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ImageSeg from '../../modules/imgseg/ImageSeg'

const Sandbox = () => {
  return (
    <>
      {/* <ImageSeg /> */}

      <MediaApi />
    </>
  )
}

export default Sandbox

const MediaApi = () => {
  const videoRef = useRef()
  const canvasRef = useRef()
  const imgRef = useRef()

  /**************************************
   ******** State
   *************************************/
  const [GoodToGo, setGoodToGo] = useState(false)
  const [Cameras, setCameras] = useState([])
  const [SelectedCamera, setSelectedCamera] = useState()

  /**************************************
   ******** Effects
   *************************************/
  useEffect(() => {
    hasUserMedia()
  }, [])

  useEffect(() => {
    async function getTheStream() {
      if (SelectedCamera) {
        const stream = await getStream(Cameras)
        videoRef.current.srcObject = stream
      }
    }

    getTheStream()
  }, [SelectedCamera])

  // Check media devices
  const hasUserMedia = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setGoodToGo(true)

      // Get available device cameras
      const cameras = await getCameraList()

      console.log(cameras)
      setCameras(cameras)

      // Attach the camera stream to the video tag
      const stream = await getStream(cameras)
      videoRef.current.srcObject = stream
    }
  }

  const getCameraList = async () =>
    await (await navigator.mediaDevices.enumerateDevices()).filter(
      ({ kind }) => kind == 'videoinput'
    )

  const getStream = async cameras =>
    await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: { exact: SelectedCamera || cameras[0].deviceId },
        width: { exact: 640 },
        height: { exact: 480 },
      },
    })

  /**************************************
   ******** Render
   *************************************/
  return (
    <>
      <Main>
        <Title>Sandbox</Title>

        {GoodToGo ? (
          <>
            <p>
              <small>Good To Go</small>
            </p>

            <Video autoPlay ref={videoRef} />

            <CamerasRow>
              {Cameras.map(({ deviceId, label }, index) => (
                <CameraBtn
                  onClick={() => setSelectedCamera(deviceId)}
                  active={
                    SelectedCamera
                      ? deviceId === SelectedCamera
                      : deviceId === Cameras[0].deviceId
                  }
                >
                  Cam {++index}
                </CameraBtn>
              ))}
            </CamerasRow>

            <div>
              <button onClick={() => {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0);
                imgRef.current.src = canvasRef.current.toDataURL("image/webp");
              }}>Take the shot</button>
            </div>

            <img src='' alt='' ref={imgRef} />
            <canvas style={{ display: 'none' }} ref={canvasRef} />
          </>
        ) : (
          <p>
            <small>Unsupported Browser!</small>
          </p>
        )}
      </Main>
    </>
  )
}

const Main = styled.div`
  max-width: 1200px;
  margin: auto;
  min-height: 50vh;
  border: 1px solid #94a7c044;
  padding: 3em;
`

const Title = styled.b`
  font-size: 1.2em;
  margin-bottom: 2em;
  color: gray;
`

const Video = styled.video`
  max-width: 100%;
`

const CamerasRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CameraBtn = styled.button`
  box-shadow: none;
  border: none;
  border-radius: 4px;
  padding: 0.5em 1em;
  ${({ active, theme }) =>
    active &&
    `
    background-color: ${theme.colors.blue}; 
    color: white;
    `}
`
