import React, { FC, useState, useRef } from 'react'
import { Control, Controller, useForm } from 'react-hook-form'
import { parse, stringify } from 'yaml'
import axios from 'axios'

import { styled } from '@mui/material/styles'

import DataArrayIcon from '@mui/icons-material/DataArray'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  InputAdornment,
  MenuItem,
  MenuList,
  Popper,
  TextField,
  Tooltip,
} from '@mui/material'
import YamlEditor from '../../../components/YamlEditor'
import { useNavigate } from 'react-router-dom'
import Item from '../../../components/Item'

type FormData = {
  name: string
}

const URI = 'http://localhost:5000'

const AddModel: FC<{
  modelType: any
  cropData: any
  soilData: any
  siteData: any
  agroData: any
  geolocationData: any
}> = ({ modelType, cropData, soilData, siteData, agroData, geolocationData }) => {
  const [validateBtn, setValidateBtn] = useState<'invalid' | 'valid' | 'idle'>('idle')

  const [modelYaml, setModelYaml] = useState<string>('')

  React.useEffect(() => {
    const agroDataDic = { name: agroData['name'], agroYaml: parse(agroData['agroYaml']) }
    const dic = {
      modelType,
      cropData,
      soilData,
      siteData,
      agroData: agroDataDic,
      geolocationData,
    }
    setModelYaml(stringify(dic))
  }, [])

  const navigate = useNavigate()

  const { handleSubmit, control, getValues, watch } = useForm<any>()
  const onSubmit = handleSubmit((data) => {
    const name = data['name']

    axios
      .post(`${URI}/model`, { name, modelYaml })
      .then((res) => {
        const data: any = res.data
        setValidateBtn('valid')
        navigate(`/model/${data['id']}`)

        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  })

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
        onSubmit={onSubmit}
      >
        <Grid item xs={12}>
          <Typography variant='h4'>Create Model</Typography>
          <Divider />
        </Grid>

        <Grid item xs={3}>
          <Item elevation={3}>
            <Grid item xs={12} marginBottom={2}>
              <Typography variant='subtitle2'>Model Name</Typography>
              <Divider />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Controller
                  name={'name'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Tooltip title={'model name ---- (enter a string)'} arrow>
                      <TextField
                        required
                        fullWidth
                        placeholder={'model_name'}
                        onChange={onChange}
                        value={value}
                        label={'Model name'}
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

        <Grid item xs={12}></Grid>

        <Grid item xs={10}>
          <Item elevation={3}>
            <Grid item xs={12} marginBottom={2}>
              <Typography variant='subtitle2'>Model Data (YAML)</Typography>
              <Divider />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <YamlEditor
                  yaml={modelYaml}
                  title={
                    <span>
                      {'You are about to create a model with the following characteristics. ('}
                      <span style={{ color: 'red' }}>Read Only</span>
                      {')'}
                    </span>
                  }
                />
              </Grid>
            </Grid>
          </Item>
        </Grid>

        <Grid item xs={12}>
          <Button
            type='submit'
            size='large'
            variant='outlined'
            color={
              validateBtn === 'idle' ? 'inherit' : validateBtn === 'valid' ? 'success' : 'error'
            }
            sx={{ ml: 2 }}
          >
            Create Model
          </Button>
        </Grid>
      </Grid>
    </Item>
  )
}

export default AddModel
