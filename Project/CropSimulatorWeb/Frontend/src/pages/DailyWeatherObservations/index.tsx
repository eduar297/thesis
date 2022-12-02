import React, { FC } from 'react'

import { styled } from '@mui/material/styles'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Item from '../../components/Item'

const Agromanagement: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Item>Daily Weather Observations</Item>
      </Grid>
    </Grid>
  )
}

export default Agromanagement
