import { useEffect, useRef, useState } from 'react'
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
import DeviceOrientation from 'react-device-orientation'

const CaptureData = ({
  capturedData,
  setCapturedData,
  setGoodToGo,
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
}) => {
  const videoRef = useRef()
  const canvasRef = useRef()

  /**************************************
   ******** State
   *************************************/
  const [Cameras, setCameras] = useState([])
  const [SelectedCamera, setSelectedCamera] = useState()
  const [Orientation, setOrientation] = useState()

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
        {!capturedData ? (
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

                setCapturedData({
                  image: canvasRef.current.toDataURL('image/jpeg'),
                  orientation: Orientation,
                  location: coords,
                })
              }}
            >
              capture
            </CaptureBtn>

            <Canvas ref={canvasRef} />
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
          <DeviceOrientation>
            {props => (
              <RenderOrientation {...props} setOrientation={setOrientation} />
            )}
          </DeviceOrientation>

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
                      capturedData
                        ? capturedData.location.latitude
                        : coords.latitude
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
                      capturedData
                        ? capturedData.location.altitude
                        : coords.altitude
                    ).toFixed(5)}
                  </span>
                </p>
              </>
            ) : (
              <div>Getting the location data&hellip; </div>
            )}
          </DebugCard>
        </DebugWrapper>
      </Main>
    </>
  )
}

const RenderOrientation = ({
  absolute,
  alpha,
  beta,
  gamma,
  setOrientation,
}) => {
  useEffect(() => {
    if (alpha && beta && gamma) setOrientation({ alpha, beta, gamma })
  }, [alpha, beta, gamma])

  return (
    <DebugCard>
      <p>
        <b>
          <big>Device Orientation</big>
        </b>
      </p>
      <p>
        <b>Absolute: </b>
        <span>
          {Number(
            capturedData ? capturedData.orientation.absolute : absolute
          ).toFixed(5)}
        </span>
      </p>
      <p>
        <b>Alpha: </b>
        <span>
          {Number(
            capturedData ? capturedData.orientation.alpha : alpha
          ).toFixed(5)}
        </span>
      </p>
      <p>
        <b>Beta: </b>
        <span>
          {Number(capturedData ? capturedData.orientation.beta : beta).toFixed(
            5
          )}
        </span>
      </p>
      <p>
        <b>Gamma: </b>
        <span>
          {Number(
            capturedData ? capturedData.orientation.gamma : gamma
          ).toFixed(5)}
        </span>
      </p>
    </DebugCard>
  )
}

export default geolocated()(CaptureData)
