import React, { useEffect, useState } from 'react'
import { NameInput, Relative } from './lab_styles'
import { useRealmApp } from '../../RealmApp'
import { useMongoDB } from '../../MongoDB'
import { Button, Grid, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import CaptureData from '../../components/mediaApis/CaptureData'
import ImageSeg from '../../modules/imgseg/ImageSeg'
import DeviceOrientation from 'react-device-orientation'
import { nanoid } from 'nanoid'
import { SelectSensorsGroup } from './SensorComponents'

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

      const tableData = rawData.map(({ group }, index) => ({
        index,
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
      setSending(true)

      const existingGroup = Sensors.find(({ id }) => id === SelectedGroup.id)

      let finalData = {}

      if (existingGroup)
        finalData = {
          ...existingGroup,
          sensors: [
            ...existingGroup.sensors,
            { id: nanoid(), sensor: SensorName, ...data },
          ],
        }
      // Mongodb update query
      else
        finalData = {
          group: GroupName,
          sensors: [{ id: nanoid(), sensor: SensorName, ...data }],
        }

      const res = await db.collection('sensors').insertOne(finalData)
      console.log(res)

      alert('success')
      history.push('/lab/sensors')
      setSending(false)
    } else {
      alert('not connected to db')
    }
  }

  /**************************************
   ******** Render
   *************************************/
  // Loading
  if (Sending) return <p>Sending data to API ...</p>

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

