import { Grid, TextField } from "@material-ui/core"
import MaterialTable from "material-table"
import { nanoid } from "nanoid"
import { Button } from "../../components/mediaApis/captureData_styles"
import { tableIcons } from "../../modules/material-table/tableSetup"
import { NameInput, P } from "./lab_styles"

/**************************************
 ******** Create or Select group
 *************************************/
 export const SelectSensorsGroup = ({
  groupName,
  setGroupName,
  setSelectedGroup,
  loading,
  tableData,
}) => {
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
              onClick={() =>
                setSelectedGroup({ id: nanoid(), name: groupName })
              }
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
      />
    </>
  )
}