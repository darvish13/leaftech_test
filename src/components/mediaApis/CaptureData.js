import { useCallback, useEffect, useRef, useState } from 'react'
import { geolocated } from 'react-geolocated'
import {
  Button,
  CameraBtn,
  CamerasRow,
  Canvas,
  CaptureBtn,
  DebugCard,
  DebugWrapper,
  Image,
  Main,
  Video,
} from './captureData_styles'
import { CaptureButton } from '../../pages/lab/lab_styles'
import Webcam from 'react-webcam'

const CaptureData = ({
  capturedData,
  setCapturedData,
  setGoodToGo,
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
  alpha,
  beta,
  gamma,
}) => {
  const videoRef = useRef()
  const canvasRef = useRef()

  /**************************************
   ******** State
   *************************************/
  const [Cameras, setCameras] = useState([])
  const [SelectedCamera, setSelectedCamera] = useState()
  const [Alpha, setAlpha] = useState()

  /**************************************
   ******** Effects
   *************************************/
  useEffect(() => {
    hasUserMedia()
  }, [])

  /**************************************
   ******** Handle camera change
   *************************************/
  useEffect(() => {
    async function getTheStream() {
      if (!capturedData && SelectedCamera) {
        const stream = await getStream(Cameras)
        videoRef.current.srcObject = stream
      }
    }

    getTheStream()
  }, [SelectedCamera, capturedData])

  /**************************************
   ******** Main logic
   *************************************/
  const hasUserMedia = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Get available device cameras
      const cameras = await getCameraList()
      console.log({ cameras })
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
        width: { exact: 600 },
        height: { exact: 800 },
      },
    })

  /**************************************
   ******** Render location
   *************************************/
  const RenderLocation = () => (
    <DebugCard>
      {!isGeolocationAvailable ? (
        <p>Your browser does not support Geolocation</p>
      ) : !isGeolocationEnabled ? (
        <p>Geolocation is not enabled</p>
      ) : coords ? (
        <>
          <p>
            <b>
              <big>Location</big>
            </b>
          </p>
          <p>
            <b>Latitude: </b>
            <span>
              {Number(
                capturedData ? capturedData.location.latitude : coords.latitude
              ).toFixed(5)}
            </span>
          </p>
          <p>
            <b>Longitude: </b>
            <span>
              {Number(
                capturedData
                  ? capturedData.location.longitude
                  : coords.longitude
              ).toFixed(5)}
            </span>
          </p>
          <p>
            <b>Altitude: </b>
            <span>
              {Number(
                capturedData ? capturedData.location.altitude : coords.altitude
              ).toFixed(5)}
            </span>
          </p>
        </>
      ) : (
        <div>Getting the location data&hellip; </div>
      )}
    </DebugCard>
  )

  /**************************************
   ******** Render orientation
   *************************************/
  const RenderOrientation = () => {
    return (
      <DebugCard>
        <p>
          <b>
            <big>Device Orientation</big>
          </b>
        </p>
        <p>
          <b>Alpha: </b>
          <span>{Number(Alpha || alpha).toFixed(5)}</span>
        </p>
        <p>
          <b>Beta: </b>
          <span>
            {Number(
              capturedData?.orientation ? capturedData.orientation.beta : beta
            ).toFixed(5)}
          </span>
        </p>
        <p>
          <b>Gamma: </b>
          <span>
            {Number(
              capturedData?.orientation ? capturedData.orientation.gamma : gamma
            ).toFixed(5)}
          </span>
        </p>
      </DebugCard>
    )
  }

  /**************************************
   ******** Capture image
   *************************************/
  const capture = useCallback(() => {
    const image = videoRef.current.getScreenshot()

    setCapturedData({
      image,
      orientation: {
        alpha: Number(Alpha).toFixed(5),
        beta: Number(beta).toFixed(5),
        gamma: Number(gamma).toFixed(5),
      },
      location: coords,
    })
  }, [videoRef])

  /**************************************
   ******** Render
   *************************************/
  return (
    <>
      <Main>
        {!capturedData && Cameras.length > 0 ? (
          <>
            <Video autoPlay ref={videoRef} />

            <CamerasRow>
              {Cameras.map(({ deviceId, label }, index) => (
                <CameraBtn
                  key={deviceId}
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

            {!Alpha ? (
              <CaptureBtn onClick={() => setAlpha(alpha)}>Set Alpha</CaptureBtn>
            ) : (
              <CaptureBtn
                onClick={() => {
                  canvasRef.current.width = videoRef.current.videoWidth
                  canvasRef.current.height = videoRef.current.videoHeight
                  canvasRef.current
                    .getContext('2d')
                    .drawImage(videoRef.current, 0, 0)

                  setCapturedData({
                    image: canvasRef.current.toDataURL('image/jpeg'),
                    orientation: {
                      alpha: Number(Alpha).toFixed(5),
                      beta: Number(beta).toFixed(5),
                      gamma: Number(gamma).toFixed(5),
                    },
                    location: coords,
                  })
                }}
              >
                capture
              </CaptureBtn>
            )}

            <Canvas ref={canvasRef} />

            {/* <Webcam
              style={{ width: '100vw' }}
              audio={false}
              ref={videoRef}
              screenshotFormat='image/png'
              videoConstraints={{
                deviceId: SelectedCamera || Cameras[0].deviceId,
              }}
            />

            <CamerasRow>
              {Cameras.map(({ deviceId, label }, index) => (
                <CameraBtn
                  key={deviceId}
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

            {!Alpha ? (
              <CaptureBtn onClick={() => setAlpha(alpha)}>Set Alpha</CaptureBtn>
            ) : (
              <CaptureBtn onClick={capture}>capture</CaptureBtn>
            )} */}
          </>
        ) : (
          <>
            <Image src={capturedData?.image} alt='' />

            <CamerasRow>
              <Button
                color={{ text: 'black', background: '#dedede' }}
                onClick={() => setCapturedData()}
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

        <DebugWrapper>
          <RenderOrientation />
          <RenderLocation />
        </DebugWrapper>
      </Main>
    </>
  )
}

export default geolocated()(CaptureData)
