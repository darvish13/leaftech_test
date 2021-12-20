import React, { useEffect, useState } from 'react'
import { NameInput, Relative, LoadingWrapper } from './lab_styles'
import { useRealmApp } from '../../RealmApp'
import { useMongoDB } from '../../MongoDB'
import { Button, Grid, TextField, CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import CaptureData from '../../components/mediaApis/CaptureData'
import ImageSeg from '../../modules/imgseg/ImageSeg'
import DeviceOrientation from 'react-device-orientation'
import { nanoid } from 'nanoid'
import { SelectSensorsGroup } from './Components'
import toast from 'react-hot-toast'
import axios from 'axios'
import { data as mockData } from '../sandbox/Sandbox'

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
  const [SensorName, setSensorName] = useState()
  const [SensorHasName, setSensorHasName] = useState(false)
  const [Sending, setSending] = useState(false)
  const [GoodToGo, setGoodToGo] = useState(false)
  const [CapturedData, setCapturedData] = useState()
  const [GroupName, setGroupName] = useState()
  const [SelectedGroup, setSelectedGroup] = useState()
  const [Loading, setLoading] = useState(false)
  const [Sensors, setSensors] = useState()
  const [TableData, setTableData] = useState([])

  /**************************************
   ******** Get sensors
   *************************************/
  useEffect(() => {
    if (!Sensors) getSensors()
  }, [user, db])

  /**************************************
   ******** Get sensors
   *************************************/
  const getSensors = async () => {
    setLoading(true)

    if (user && db) {
      const sensorsCollection = await db.collection('sensors')

      const rawData = await sensorsCollection.aggregate([
        { $sort: { _id: -1 } },
      ])

      const tableData = rawData.map(({ _id, group }, index) => ({
        index,
        id: _id,
        group,
      }))

      setSensors(rawData)
      setTableData(tableData)
      setLoading(false)
    }
  }

  /**************************************
   ******** Send To Api
   *************************************/
  const sendToApi = async data => {
    if (user && db) {
      try {
        setSending(true)

        const { image, mask, orientation: { alpha, beta } } = data

        // Get skyline
        const skyline = await getSkyline(image, mask, alpha, beta)

        const res = await db.collection('sensors').updateOne(
          { _id: SelectedGroup },
          {
            $push: {
              sensors: { id: nanoid(), sensor: SensorName, ...data, ...skyline },
            },
          }
        )

        toast.success('Sensor data successfully added')
        history.push('/lab/sensors')
        setSending(false)
      } catch (e) {
        toast.error('Skyline Api Error!!!')
        console.log(e)
      }
    } else {
      toast.error('Database Error!!!')
    }
  }

  /**********************************************
   ******** Get Skyline data from skyline api
   **********************************************/
  const getSkyline = async (image, mask) => {
    const { data: { skyline_b64, skyline_dict } } = await axios.post(
      `${process.env.REACT_APP_SKYLINE_API}/get-skyline`,
      {
        image,
        mask,
      }
    )

    return { skyline_b64, skyline_dict }
  }

  /**************************************
   ******** Render
   *************************************/
  // Loading
  if (Sending)
    return (
      <>
        <LoadingWrapper>
          <CircularProgress style={{ color: '#3087df' }} />
          <p>
            Adding Sensor Data <br />
            And Generating Skyline Map
          </p>
        </LoadingWrapper>
      </>
    )

  // Load image segmentor
  if (GoodToGo)
    return (
      <ImageSeg
        capturedData={CapturedData}
        setCapturedData={setCapturedData}
        sendToApi={sendToApi}
      />
    )

  // Select Group
  if (!SelectedGroup)
    return (
      <SelectSensorsGroup
        groupName={GroupName}
        setGroupName={setGroupName}
        setSelectedGroup={setSelectedGroup}
        loading={Loading}
        tableData={TableData}
        db={db}
        user={user}
      />
    )

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
          <DeviceOrientation>
            {props => (
              <CaptureData
                capturedData={CapturedData}
                setCapturedData={setCapturedData}
                setGoodToGo={setGoodToGo}
                {...props}
              />
            )}
          </DeviceOrientation>
        )}
      </Relative>
    </>
  )
}

export default AddSensor
