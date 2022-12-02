import Grid from '@mui/material/Grid'
import React, { FC } from 'react'
import { TOutput } from '..'

import BarChart from './BarChart'

import { styled } from '@mui/material/styles'

import Paper from '@mui/material/Paper'
import LineGraph from './Line Graph'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.mode === 'dark' ? '#edebeb' : '#fff',
}))

const Charts: FC<{ output: TOutput[] }> = ({ output }) => {
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid item xs={10}>
        <Item elevation={10}>
          <BarChart chartID='bar-chart-1' output={output} />
        </Item>
      </Grid>
      {['DVS', 'LAI', 'RD', 'SM', 'TAGP', 'TRA', 'TWLV', 'TWRT', 'TWSO', 'TWST', 'WWLOW'].map(
        (item) => (
          <Grid item xs={5} key={item}>
            <Item elevation={10}>
              <LineGraph chartID={`line-graph-${item}`} output={output} filterParam={item} />
            </Item>
          </Grid>
        ),
      )}
    </Grid>
  )
}

export default Charts
