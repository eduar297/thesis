import React, { FC } from 'react'

import { styled } from '@mui/material/styles'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Item from '../../components/Item'

const Crop: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Item>Crop</Item>
      </Grid>
    </Grid>
  )
}

export default Crop
