import { useEffect, useRef, useState } from "react"
import { Button, CameraBtn, CamerasRow, Canvas, CaptureBtn, Image, Main, Title, Video } from "./captureData_styles"

const CaptureData = ({ imageData, setImageData, setGoodToGo }) => {
  const videoRef = useRef()
  const canvasRef = useRef()

  /**************************************
   ******** State
   *************************************/
  const [Cameras, setCameras] = useState([])
  const [SelectedCamera, setSelectedCamera] = useState()

  /**************************************
   ******** Effects
   *************************************/
  useEffect(() => {
    hasUserMedia()
  }, [])

  /**
   * handle camera change
   */
  useEffect(() => {
    async function getTheStream() {
      if (!imageData && SelectedCamera) {
        const stream = await getStream(Cameras)
        videoRef.current.srcObject = stream
      }
    }

    getTheStream()
  }, [SelectedCamera, imageData])

  /**************************************
   ******** Main logic
   *************************************/
  const hasUserMedia = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Get available device cameras
      const cameras = await getCameraList()

      console.log(cameras)
      setCameras(cameras)

      // Attach the camera stream to the video tag
      const stream = await getStream(cameras)
      videoRef.current.srcObject = stream
    }
  }

  /**************************************
   ******** Get all cameras list
   *************************************/
  const getCameraList = async () =>
    await (await navigator.mediaDevices.enumerateDevices()).filter(
      ({ kind }) => kind == 'videoinput'
    )

  /**************************************
   ******** Get camera stream
   *************************************/
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
        {!imageData ? (
          <>
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

            <CaptureBtn
              onClick={() => {
                canvasRef.current.width = videoRef.current.videoWidth
                canvasRef.current.height = videoRef.current.videoHeight
                canvasRef.current
                  .getContext('2d')
                  .drawImage(videoRef.current, 0, 0)

                setImageData(canvasRef.current.toDataURL('image/jpeg'))
              }}
            >
              capture
            </CaptureBtn>

            <Canvas ref={canvasRef} />
          </>
        ) : (
          <>
            <Image src={imageData} alt='' />

            <CamerasRow>
              <Button
                color={{ text: 'black', background: '#dedede' }}
                onClick={() => setImageData(false)}
              >
                Take Again
              </Button>

              <div style={{ width: '1em' }}></div>

              <Button
                color={{ text: 'white', background: '#3087df' }}
                onClick={() => setGoodToGo(true)}
              >
                Good To Go
              </Button>
            </CamerasRow>
          </>
        )}
      </Main>
    </>
  )
}


export default CaptureData