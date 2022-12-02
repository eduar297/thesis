import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React, { FC } from 'react'
import YamlEditor from '../../../components/YamlEditor'
import { stringify } from 'yaml'

const InitialModelInfo: FC<{ model: any }> = ({ model }) => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <YamlEditor
            yaml={stringify(model)}
            title={'Initial Model Information'}
            readOnly={true}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default InitialModelInfo
