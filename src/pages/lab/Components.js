import { Button, Grid, TextField } from '@material-ui/core'
import MaterialTable from 'material-table'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { tableIcons } from '../../modules/material-table/tableSetup'
import { NameInput, P } from './lab_styles'

/**************************************
 ******** Create or Select group
 *************************************/
export const SelectSensorsGroup = ({
  groupName,
  setGroupName,
  setSelectedGroup,
  loading,
  tableData,
  db,
  user,
}) => {
  // State
  const [SelectedRow, setSelectedRow] = useState()

  // Render
  return (
    <>
      <P>
        Create a new group to add sensors to or select one from the table below.
      </P>

      <NameInput>
        <Grid container spacing={5} alignItems='center'>
          <Grid item xs={12} sm={12} md={8}>
            <TextField
              label='Group Name'
              variant='standard'
              value={groupName}
              onChange={({ target: { value } }) => setGroupName(value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Button
              variant='contained'
              fullWidth
              disabled={!groupName}
              onClick={async () => {
                if (db && user) {
                  const { insertedId } = await db
                    .collection('sensors')
                    .insertOne({ group: groupName })

                  if (insertedId) {
                    toast.success(
                      `New sensor group "${groupName}" created successfulyy`
                    )

                    setSelectedGroup(insertedId)
                  }
                }
              }}
            >
              Create New Group
            </Button>
          </Grid>
        </Grid>
      </NameInput>

      <MaterialTable
        style={{ margin: '2em auto' }}
        isLoading={loading}
        icons={tableIcons}
        columns={[
          { title: '#', field: 'index' },
          { title: 'Group Name', field: 'group' },
        ]}
        data={tableData}
        title='Groups List'
        options={{
          selection: true,
          showSelectAllCheckbox: false,
        }}
        onSelectionChange={selectedRows => {
          if (selectedRows) setSelectedRow(selectedRows[0].id)
        }}
      />

      {SelectedRow && (
        <Button
          variant='contained'
          onClick={() => setSelectedGroup(SelectedRow)}
          fullWidth
          style={{ background: '#3087df', color: 'white' }}
        >
          Use Selected Group
        </Button>
      )}
    </>
  )
}
