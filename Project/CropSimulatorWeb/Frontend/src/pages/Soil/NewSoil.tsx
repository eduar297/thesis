import React, { FC, useState, useRef } from 'react'
import { Control, Controller, useForm } from 'react-hook-form'
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

import * as data from './data'
import { descriptions, soilKeys, types } from './data'
import Item from '../../components/Item'

type FormData = {
  SOLNAM: string
  SMTAB: string
  SMW: string
  SMFCF: string
  SM0: string
  CRAIRC: string
  CONTAB: string
  K0: string
  SOPE: string
  KSUB: string
  RDMSOL: string
  SPADS: string
  SPODS: string
  SPASS: string
  SPOSS: string
  DEFLIM: string
}

const ItemInput: FC<{ title: string; data: string[]; control: Control<FormData, any> }> = ({
  title,
  data,
  control,
}) => {
  return (
    <Grid item xs={4}>
      <Item elevation={3}>
        <Grid item xs={12} marginBottom={2}>
          <Typography variant='subtitle2'>{title}</Typography>
          <Divider />
        </Grid>
        <Grid container spacing={1}>
          {data.map((item: string) => (
            <Grid
              item
              xs={types[item] === 'number' ? 3 : types[item] === 'number[]' ? 4 : 5}
              key={item}
            >
              <Controller
                name={item as any}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Tooltip
                    title={
                      types[item] === 'number[]'
                        ? `${descriptions[item]} ---- (enter values separated by ' , ')`
                        : types[item] === 'number'
                        ? `${descriptions[item]} ---- (enter a number)`
                        : `${descriptions[item]} ---- (enter a string)`
                    }
                    arrow
                  >
                    <TextField
                      required
                      placeholder={
                        types[item] === 'number[]'
                          ? '1,2,3'
                          : types[item] === 'number'
                          ? '0.0'
                          : 'soil_name'
                      }
                      onChange={onChange}
                      value={value}
                      label={item}
                      size='small'
                      type={'text'}
                      multiline={types[item] === 'string' || types[item] === 'number[]'}
                      InputProps={{
                        startAdornment:
                          types[item] === 'number[]' ? (
                            <InputAdornment position='start'>
                              <DataArrayIcon fontSize='small' />
                            </InputAdornment>
                          ) : types[item] === 'string' ? (
                            <InputAdornment position='start'></InputAdornment>
                          ) : (
                            <InputAdornment position='start'></InputAdornment>
                          ),
                      }}
                    />
                  </Tooltip>
                )}
              />
            </Grid>
          ))}
        </Grid>
      </Item>
    </Grid>
  )
}

const URI = 'http://localhost:5000'

const NewSoil: FC<{ setSoilData?: React.Dispatch<any> }> = ({ setSoilData }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [soilList, setSoilList] = useState<any[]>(['none'])

  const [validateBtn, setValidateBtn] = useState<'invalid' | 'valid' | 'idle'>('idle')

  const handleClick = () => {
    const data: any = soilList[selectedIndex]
    soilKeys.forEach((key) => {
      setValue(key, data[key])
    })
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleFileInput = (e: any) => {
    const file: File = e.target.files[0]
    const formData = new FormData()
    formData.append('soil-file', file)

    axios
      .post(`${URI}/soil/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const data: any = res.data
        console.log(data)
        soilKeys.forEach((key) => {
          setValue(key, data[key])
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleToggle = () => {
    axios
      .get(`${URI}/soil`)
      .then((res) => {
        const data: any = res.data
        setSoilList(['none', ...data])
        setOpen((prevOpen) => !prevOpen)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleValidate = () => {
    const values = getValues()
    let valid = true
    soilKeys.forEach((key) => {
      if (values[key] === undefined) valid = false
      return
    })
    if (valid) {
      const soilData = values
      soilKeys.forEach((key) => {
        const _data: string = soilData[key].toString()
        if (types[key] === 'number') soilData[key] = parseFloat(_data)
        else if (types[key] === 'string') soilData[key] = _data
        else if (types[key] === 'number[]')
          soilData[key] = _data.split(',').map((i) => parseFloat(i))
      })
      setValidateBtn('valid')
      setSoilData!(soilData)
    } else {
      setValidateBtn('invalid')
      setSoilData!(null)
    }
  }

  const { setValue, handleSubmit, control, getValues } = useForm<any>()
  const onSubmit = handleSubmit((data) => {
    const soilData = data
    soilKeys.forEach((key) => {
      const _data: string = data[key].toString()
      if (types[key] === 'number') soilData[key] = parseFloat(_data)
      else if (types[key] === 'string') soilData[key] = _data
      else if (types[key] === 'number[]') soilData[key] = _data.split(',').map((i) => parseFloat(i))
    })
    axios
      .post(`${URI}/soil`, soilData)
      .then((res) => {
        const data: any = res.data
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
          <Typography variant='h4'>Soil Data</Typography>
          <Divider />
        </Grid>

        <ItemInput title={'Soil Name'} data={data.nameData} control={control} />
        <ItemInput
          title={'Soil Water Retention'}
          data={data.soilWaterRetentionData}
          control={control}
        />
        <ItemInput
          title={'Hydraulic Conductivity'}
          data={data.hydraulicConductivityData}
          control={control}
        />

        <ItemInput
          title={'Soil Workability Parameters'}
          data={data.soilWorkabilityParametersData}
          control={control}
        />

        <Grid item xs={12}>
          <ButtonGroup variant='outlined' sx={{ mr: 2 }} ref={anchorRef} aria-label='split button'>
            <Button size='large' disabled={selectedIndex === 0} onClick={handleClick}>
              {selectedIndex !== 0
                ? `Click to Load ${soilList[selectedIndex]['SOLNAM']}`
                : 'Select soil data'}
            </Button>
            <Button
              size='small'
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label='select merge strategy'
              aria-haspopup='menu'
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>

          <Button size='large' variant='outlined' component='label'>
            Load from File
            <input hidden type='file' onChange={handleFileInput} />
          </Button>
          <Button size='large' variant='outlined' type='submit' sx={{ ml: 2 }}>
            Save
          </Button>
          {setSoilData && (
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

      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu' autoFocusItem>
                  {soilList.map((option, index) =>
                    index === 0 ? (
                      'none'
                    ) : (
                      <MenuItem
                        key={option['id']}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option['SOLNAM']}
                      </MenuItem>
                    ),
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Item>
  )
}

export default NewSoil
