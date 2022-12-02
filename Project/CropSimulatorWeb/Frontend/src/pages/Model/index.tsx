import axios from 'axios'
import React, { useEffect, useState, FC } from 'react'
import { parse, stringify } from 'yaml'

import { styled } from '@mui/material/styles'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import VerticalTabs from './components/VerticalTabs'
import InitialModelInfo from './components/InitialModelInfo'
import Simulation from './components/Simulation'
import Item from '../../components/Item'
import Loading from '../../components/Loading/indx'
import Charts from './components/Charts'

const URI = 'http://localhost:5000'

export type TOutput = {
  DVS: number
  LAI: number
  RD: number
  SM: number
  TAGP: number
  TRA: number
  TWLV: number
  TWRT: number
  TWSO: number
  TWST: number
  WWLOW: number
  day: string
}

const Model = () => {
  const [model, setModel] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [startedEnv, setStartedEnv] = useState<boolean>(false)
  const [output, setOutput] = useState<TOutput[]>([])
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  useEffect(() => {
    const spl = location.pathname.split('/')
    const id = parseInt(spl[spl.length - 1])

    setLoading(true)
    axios
      .get(`${URI}/model/${id}`)
      .then((res) => {
        const data: any = res.data
        const name = data['name']
        const id = data['id']
        const modelYaml = data['modelYaml']
        const _model = {
          id,
          name,
          ...parse(modelYaml),
        }

        setLoading(false)

        setModel(_model)
      })
      .catch((err) => {
        console.log(err)
      })

    return () => {
      console.log('ME PIRO')
    }
  }, [location.pathname])

  return (
    <>
      {!loading ? (
        <Item elevation={10}>
          <Grid container direction='row' justifyContent='center' alignItems='start'>
            <Grid item xs={12} mb={0.7}>
              {model && (
                <>
                  <Typography variant={'subtitle1'}>
                    {`${model['name']}`}
                    {startedEnv && <CheckCircleIcon color='success' fontSize='small' />}
                  </Typography>
                </>
              )}
            </Grid>
            <VerticalTabs
              startedEnv={startedEnv}
              InitialModelInfo={() => <InitialModelInfo model={model} />}
              Simulation={() => (
                <Simulation
                  model={model}
                  startedEnv={startedEnv}
                  setStartedEnv={setStartedEnv}
                  output={output}
                  setOutput={setOutput}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
              Charts={() => <Charts output={output} />}
            />
          </Grid>
        </Item>
      ) : (
        <Loading text={'Loading...'} />
      )}
    </>
  )
}

export default Model
