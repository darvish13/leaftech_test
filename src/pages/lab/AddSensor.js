import React, { useState } from 'react'
import { NameInput, Relative } from './lab_styles'
import { useRealmApp } from '../../RealmApp'
import { useMongoDB } from '../../MongoDB'
import { Button, Grid, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import CaptureData from '../../components/mediaApis/CaptureData'
import ImageSeg from '../../modules/imgseg/ImageSeg'

const AddSensor = () => {
  /**************************************
   ******** Custom Hooks
   *************************************/
  const { user } = useRealmApp()
  const { db } = useMongoDB()
  const history = useHistory()

  /**************************************
   ******** State
   *************************************/
  const [SensorName, setSensorName] = useState('New Sensor')
  const [SensorHasName, setSensorHasName] = useState(false)
  const [Sending, setSending] = useState(false)
  const [GoodToGo, setGoodToGo] = useState(false)
  const [CapturedData, setCapturedData] = useState()

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
  if (GoodToGo) return <ImageSeg imageUrl={CapturedData.image} />

  // Capture data
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
        {SensorHasName && !GoodToGo && (
          <CaptureData
            capturedData={CapturedData}
            setCapturedData={setCapturedData}
            setGoodToGo={setGoodToGo}
          />
        )}

        {/* sendToApi({
                  CapturedData: state.images[0],
                  orientation: Orientation,
                  location: coords
                    ? {
                        lat: coords.latitude,
                        lng: coords.longitude,
                        alt: coords.altitude,
                        // head: coords.heading,
                        // speed: coords.speed,
                      }
                    : {},
                }) */}
      </Relative>
    </>
  )
}

export default AddSensor
