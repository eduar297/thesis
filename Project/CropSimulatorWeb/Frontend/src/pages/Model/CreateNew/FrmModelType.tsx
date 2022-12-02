import React, { FC, useEffect, useState } from 'react'
import { Typography, Paper, Grid, Divider } from '@mui/material'
import axios from 'axios'

import { styled } from '@mui/material/styles'
import Autocomplete from '../../../components/Autocomplete'
import Item from '../../../components/Item'

const URI = 'http://localhost:5000'

const FrmModelType: FC<{
  modelType: string | null
  setModelType: React.Dispatch<React.SetStateAction<string | null>>
}> = ({ modelType, setModelType }) => {
  const [typelist, setTypelist] = useState<string[]>([])

  useEffect(() => {
    axios
      .get(`${URI}/model/typelist`)
      .then((res) => {
        const data: any = res.data
        setTypelist(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Item elevation={10}>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Typography variant='h4'>Model Type</Typography>
          <Divider />
        </Grid>
        <Grid item>
          <Autocomplete
            label='select model type'
            options={typelist}
            value={modelType}
            setValue={setModelType}
          />
        </Grid>
      </Grid>
    </Item>
  )
}

export default FrmModelType
