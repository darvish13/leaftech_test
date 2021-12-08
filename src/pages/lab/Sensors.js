import { Grid } from '@material-ui/core'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { tableIcons } from '../../modules/material-table/tableSetup'
import { useMongoDB } from '../../MongoDB'
import { useRealmApp } from '../../RealmApp'
import { LargeImage, SmallImage, TableWrapper } from './lab_styles'

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
          const { group } = data

          let exportObj = {
            index,
            group,
            rawData: data,
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
      <TableWrapper>
        <MaterialTable
          style={{ margin: '2em auto' }}
          isLoading={Loading}
          icons={tableIcons}
          columns={[
            { title: '#', field: 'index' },
            { title: 'Group Name', field: 'group' },
          ]}
          data={TableData}
          title='Groups List'
          detailPanel={({ group, rawData: { sensors } }) => {
            if (sensors) {
              const innerTableData = sensors.map((sensorData, index) => ({
                index,
                sensor: sensorData.sensor,
                image: sensorData.image,
                sensorData,
              }))

              return (
                <MaterialTable
                  style={{ margin: '2em auto' }}
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
                  data={innerTableData}
                  title={`${group} Sensors List`}
                  detailPanel={({
                    sensorData: { image, location, orientation, skyline },
                  }) => {
                    return (
                      <>
                        <Grid container spacing={5} style={{ padding: '1em' }}>
                          <Grid item xs={12} sm={12} md={5}>
                            <LargeImage src={image} />
                          </Grid>

                          <Grid item xs={12} sm={12} md={7}>
                            {location && (
                              <div style={{ marginBottom: '3em' }}>
                                <p>
                                  <h3>Location:</h3>
                                </p>
                                <p>
                                  <b>Lat:</b> {location?.latitude}
                                </p>
                                <p>
                                  <b>Lng:</b> {location?.longitude}
                                </p>
                                <p>
                                  <b>Alt:</b> {location?.altitude}
                                </p>
                                <p>
                                  <b>Speed:</b> {location?.speed}
                                </p>
                                <p>
                                  <b>Head:</b> {location?.heading}
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

                          {skyline && (
                            <Grid item xs={12}>
                              <img src={skyline} alt='skyline' />
                            </Grid>
                          )}
                        </Grid>
                      </>
                    )
                  }}
                />
              )
            }
          }}
        />
      </TableWrapper>
    </>
  )
}

export default Sensors
