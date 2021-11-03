import { Grid } from '@material-ui/core'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { tableIcons } from '../../modules/material-table/tableSetup'
import { useMongoDB } from '../../MongoDB'
import { useRealmApp } from '../../RealmApp'
import { LargeImage, SmallImage } from './lab_styles'

const Sensors = () => {
  /**************************************
   ******** Custom Hooks
   *************************************/
  const { user } = useRealmApp()
  const { db } = useMongoDB()

  /**************************************
   ******** State
   *************************************/
  const [TableData, setTableData] = useState([])
  const [Loading, setLoading] = useState(false)

  /**************************************
   ******** Get sensors
   *************************************/
  useEffect(() => {
    async function getSensors() {
      setLoading(true)

      if (user && db) {
        const sensorsCollection = await db.collection('sensors')

        const rawData = await sensorsCollection.aggregate([
          { $sort: { _id: -1 } },
        ])

        console.log({ rawData })

        const tableData = rawData.map((data, index) => {
          const {
            sensor,
            image,
            location: { lat, lng, alt, head, speed },
            orientation,
          } = data

          let exportObj = {
            index,
            sensor,
            image,
            lat,
            lng,
            alt,
            head,
            speed,
            rawData: data,
          }

          if (orientation) {
            const { alpha, beta, gamma } = orientation
            exportObj = {
              ...exportObj,
              alpha,
              beta,
              gamma,
            }
          }

          return exportObj
        })

        setTableData(tableData)
        setLoading(false)
      }
    }
    getSensors()
  }, [user, db])

  // console.log(TableData)

  return (
    <>
      <MaterialTable
        style={{ margin: '2em auto' }}
        isLoading={Loading}
        icons={tableIcons}
        columns={[
          { title: '#', field: 'index' },
          { title: 'Sensor Name', field: 'sensor' },
          {
            title: 'Image',
            field: 'image',
            render: ({ image }) => <SmallImage src={image} alt='' />,
          },
        ]}
        data={TableData}
        title='Sensors List'
        detailPanel={({ rawData: { image, location, orientation } }) => {
          const {
            latitude: lat,
            longitude: lng,
            altitude: alt,
            speed,
            heading,
          } = location

          return (
            <>
              <Grid container spacing={5} style={{ padding: '1em' }}>
                <Grid item xs={12} sm={12} md={5}>
                  <LargeImage src={image} />
                </Grid>

                <Grid item xs={12} sm={12} md={7}>
                  {Object.keys(location).length > 0 && (
                    <div style={{ marginBottom: '3em' }}>
                      <p>
                        <h3>Location:</h3>
                      </p>
                      <p>
                        <b>Lat:</b> {lat}
                      </p>
                      <p>
                        <b>Lng:</b> {lng}
                      </p>
                      <p>
                        <b>Alt:</b> {alt}
                      </p>
                      <p>
                        <b>Speed:</b> {speed}
                      </p>
                      <p>
                        <b>Head:</b> {heading}
                      </p>
                    </div>
                  )}

                  {orientation && (
                    <div>
                      <p>
                        <h3>Orientation:</h3>
                      </p>
                      <p>
                        <b>Alpha:</b> {orientation?.alpha}
                      </p>
                      <p>
                        <b>Beta:</b> {orientation?.beta}
                      </p>
                      <p>
                        <b>Gamma:</b> {orientation?.gamma}
                      </p>
                    </div>
                  )}
                </Grid>
              </Grid>
            </>
          )
        }}
      />
    </>
  )
}

export default Sensors
