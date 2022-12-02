import React, { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { styled } from '@mui/material/styles'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { Button, InputAdornment, TextField, Tooltip } from '@mui/material'
import Item from '../../components/Item'

const URI = 'http://localhost:5000'

const NewDailyWeather: FC<{ setGeolocationData?: React.Dispatch<any> }> = ({
  setGeolocationData,
}) => {
  const [validateBtn, setValidateBtn] = useState<'invalid' | 'valid' | 'idle'>('idle')

  const { setValue, control, getValues, watch } = useForm<any>()

  const handleValidate = () => {
    const values = getValues()
    const valid = values['latitude'] && values['longitude']

    if (valid) {
      const geolocation = { latitude: values['latitude'], longitude: values['longitude'] }

      setValidateBtn('valid')
      setGeolocationData!(geolocation)
    } else {
      setValidateBtn('invalid')
      setGeolocationData!(null)
    }
  }

  const handleGeolocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setValue('latitude', position.coords.latitude)
        setValue('longitude', position.coords.longitude)
        console.log(position.coords)
      })
    } else {
      console.log('Geolocation Not Available')
    }
  }

  return (
    <Item elevation={10}>
      <Grid
        noValidate={false}
        component='form'
        autoComplete='on'
        container
        spacing={1}
        direction='row'
        justifyContent='center'
        alignItems='start'
      >
        <Grid item xs={12}>
          <Typography variant='h4'>Daily Weather Observations</Typography>
          <Divider />
        </Grid>

        <Grid item xs={4}>
          <Item elevation={3}>
            <Grid item xs={12} marginBottom={2}>
              <Typography variant='subtitle2'>Geolocation</Typography>
              <Divider />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Controller
                  name={'latitude'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Tooltip title={'latitude ---- (enter a number)'} arrow>
                      <TextField
                        required
                        placeholder={'0.0'}
                        onChange={onChange}
                        value={value}
                        label={'latitude'}
                        size='small'
                        type={'text'}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'></InputAdornment>,
                        }}
                      />
                    </Tooltip>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name={'longitude'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Tooltip title={'longitude ---- (enter a number)'} arrow>
                      <TextField
                        required
                        placeholder={'0.0'}
                        onChange={onChange}
                        value={value}
                        label={'longitude'}
                        size='small'
                        type={'text'}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'></InputAdornment>,
                        }}
                      />
                    </Tooltip>
                  )}
                />
              </Grid>
            </Grid>
          </Item>
        </Grid>

        <Grid xs={12}></Grid>

        <Grid item xs={12}>
          <Button size='large' variant='outlined' sx={{ ml: 2 }} onClick={handleGeolocateMe}>
            Geolocate me
          </Button>
          {setGeolocationData && (
            <Button
              size='large'
              variant='outlined'
              color={
                validateBtn === 'idle' ? 'inherit' : validateBtn === 'valid' ? 'success' : 'error'
              }
              sx={{ ml: 2 }}
              onClick={handleValidate}
            >
              Validate
            </Button>
          )}
        </Grid>
      </Grid>
    </Item>
  )
}

export default NewDailyWeather
