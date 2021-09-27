import React, { useState, useCallback, useEffect } from 'react'
import {
  CameraContainer,
  CameraNames,
  CaptureButton,
  DebugCard,
  DebugWrapper,
  NameInput,
  Relative,
} from './lab_styles'
import ReactImageAnnotate from 'react-image-annotate'
import Webcam from 'react-webcam'
import DeviceOrientation from 'react-device-orientation'
import { geolocated } from 'react-geolocated'
import { useRealmApp } from '../../RealmApp'
import { useMongoDB } from '../../MongoDB'
import { Button, Grid, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const AddSensor = ({
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
}) => {
  /**************************************
   ******** Refs
   *************************************/
  const webcamRef = React.useRef()

  /**************************************
   ******** Custom Hooks
   *************************************/
  const { user } = useRealmApp()
  const { db } = useMongoDB()
  const history = useHistory()

  /**************************************
   ******** State
   *************************************/
  const [Image, setImage] = useState()
  const [DeviceId, setDeviceId] = React.useState()
  const [Devices, setDevices] = React.useState([])
  const [Orientation, setOrientation] = useState()
  const [SensorName, setSensorName] = useState('')
  const [SensorHasName, setSensorHasName] = useState(false)
  const [Sending, setSending] = useState(false)

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
  useEffect(() => {
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
   ******** Send To Api
   *************************************/
  const sendToApi = async data => {
    if (user && db) {
      setSending(true)

      const res = await db.collection('sensors').insertOne(data)
      console.log(res)

      history.push('/lab/sensors')
      setSending(false)
    } else {
      alert('not connected to db')
    }
  }

  if (Sending) return <p>Sending data to API ...</p>

  /**************************************
   ******** Render
   *************************************/
  return (
    <>
      <NameInput>
        <Grid container spacing={5} alignItems='center'>
          <Grid item xs={12} sm={12} md={8}>
            <TextField
              label='Sensor Name'
              variant='standard'
              value={SensorName}
              onChange={({ target: { value } }) => setSensorName(value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Button
              variant='contained'
              fullWidth
              onClick={() => setSensorHasName(true)}
            >
              Set Sensor Name
            </Button>
          </Grid>
        </Grid>
      </NameInput>

      <Relative>
        {SensorHasName && !Image && (
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
                <img src='/images/camera.svg' alt='' />
              </CaptureButton>
            </CameraContainer>

            <DebugWrapper>
              <DeviceOrientation>
                {props => (
                  <RenderOrientation
                    {...props}
                    setOrientation={setOrientation}
                  />
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
                name: SensorName,
              },
            ]}
            enabledTools={['create-polygon']}
            onExit={state => {
              console.log(state)

              const { regions } = state.images[0]

              if (regions) {
                //   const output = regions.map(({ cls, points }) => ({
                //     tag: cls,
                //     points,
                //   }))

                sendToApi({
                  imageData: state.images[0],
                  orientation: Orientation,
                  location: coords
                    ? {
                        lat: coords.latitude,
                        lng: coords.longitude,
                        alt: coords.altitude,
                        head: coords.heading,
                        speed: coords.speed,
                      }
                    : {},
                })
              }
            }}
          />
        )}
      </Relative>
    </>
  )
}

const RenderOrientation = ({ alpha, beta, gamma, setOrientation }) => {
  useEffect(() => {
    if (alpha && beta && gamma) setOrientation({ alpha, beta, gamma })
  }, [alpha, beta, gamma, setOrientation])

  return (
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
  )
}

export default geolocated()(AddSensor)
