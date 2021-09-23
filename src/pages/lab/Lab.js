import React, { useState, useCallback, useEffect } from 'react'
import { MaxWidth } from '../../styles/globalStyles'
import {
  CameraContainer,
  CameraNames,
  CaptureButton,
  DebugCard,
  DebugWrapper,
  Main,
} from './lab_styles'
import colormap from '../../modules/imgseg/helper/colormap'
import Layer from '../../modules/imgseg/image/layer'
import Annotator from '../../modules/imgseg/helper/segment-annotator'
import util from '../../modules/imgseg/helper/util'
import ReactImageAnnotate from 'react-image-annotate'
import Webcam from 'react-webcam'
import DeviceOrientation from 'react-device-orientation'
import { geolocated } from 'react-geolocated'

const Lab = ({ isGeolocationAvailable, isGeolocationEnabled, coords }) => {
  /**************************************
   ******** Refs
   *************************************/
  const webcamRef = React.useRef()

  /**************************************
   ******** State
   *************************************/
  const [Image, setImage] = useState()
  const [DeviceId, setDeviceId] = React.useState()
  const [Devices, setDevices] = React.useState([])

  /**************************************
   ******** Handle Devices
   *************************************/
  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices]
  )

  /**************************************
   ******** Effects
   *************************************/
  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  }, [])

  /**************************************
   ******** Capture Image
   *************************************/
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImage(imageSrc)
  }, [webcamRef, setImage])

  /**************************************
   ******** Render
   *************************************/
  return (
    <>
      <MaxWidth>
        <Main>
          {!Image && (
            <>
              <CameraContainer>
                <Webcam
                  audio={false}
                  videoConstraints={{
                    deviceId: DeviceId,
                    facingMode: 'environment',
                  }}
                  ref={webcamRef}
                  screenshotFormat='image/jpeg'
                  // screenshotQuality={0.65}
                />

                <CameraNames>
                  {Devices.map(({ deviceId, label }, key) => (
                    <span onClick={() => setDeviceId(deviceId)}>
                      {label ? label : `Device ${key + 1}`}
                    </span>
                  ))}
                </CameraNames>

                <CaptureButton onClick={capture}>
                  <img src='images/camera.svg' alt='' />
                </CaptureButton>
              </CameraContainer>

              <DebugWrapper>
                <DeviceOrientation>
                  {({ absolute, alpha, beta, gamma }) => (
                    <DebugCard>
                      <p>
                        <b>Device Orientation: </b>
                      </p>
                      <p>
                        <b>Alpha: </b>
                        <span>{Number(alpha).toFixed(5)}</span>
                      </p>
                      <p>
                        <b>Beta: </b>
                        <span>{Number(beta).toFixed(5)}</span>
                      </p>
                      <p>
                        <b>Gamma: </b>
                        <span>{Number(gamma).toFixed(5)}</span>
                      </p>
                    </DebugCard>
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
                        <b>Location:</b>
                      </p>
                      <p>
                        <b>Latitude: </b>
                        <span>{Number(coords.latitude).toFixed(5)}</span>
                      </p>
                      <p>
                        <b>Longitude: </b>
                        <span>{Number(coords.longitude).toFixed(5)}</span>
                      </p>
                      <p>
                        <b>Altitude: </b>
                        <span>{Number(coords.altitude).toFixed(5)}</span>
                      </p>
                      <p>
                        <b>Heading: </b>
                        <span>{Number(coords.heading).toFixed(5)}</span>
                      </p>
                      <p>
                        <b>Speed: </b>
                        <span>{Number(coords.speed).toFixed(5)}</span>
                      </p>
                    </>
                  ) : (
                    <div>Getting the location data&hellip; </div>
                  )}
                </DebugCard>
              </DebugWrapper>
            </>
          )}

          {Image && (
            <ReactImageAnnotate
              labelImages
              selectedImage={Image}
              regionClsList={['buildings', 'sky', 'fooliage']}
              images={[
                {
                  src: Image,
                  name: 'Image 1',
                },
              ]}
              enabledTools={['create-polygon']}
              onExit={state => {
                console.log(state)

                const regions = state.images[0].regions

                if (regions) {
                  const output = regions.map(({ cls, points }) => ({
                    tag: cls,
                    points,
                  }))

                  console.log(output)
                }
              }}
            />
          )}
        </Main>
      </MaxWidth>
    </>
  )
}

export default geolocated()(Lab)
