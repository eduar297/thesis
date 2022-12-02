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
import { descriptions, siteKeys, types } from './data'
import Item from '../../components/Item'

type FormData = {
  SITENAM: string
  IFUNRN: string
  NOTINF: string
  SSI: string
  SSMAX: string
  WAV: string
  SMLIM: string
}

const ItemInput: FC<{
  title: string
  data: string[]
  control: Control<FormData, any>
  required: boolean
}> = ({ title, data, control, required }) => {
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
                      required={required}
                      placeholder={
                        types[item] === 'number[]'
                          ? '1,2,3'
                          : types[item] === 'number'
                          ? '0.0'
                          : 'site_name'
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

const NewSite: FC<{ setSiteData?: React.Dispatch<any> }> = ({ setSiteData }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [siteList, setsiteList] = useState<any[]>(['none'])

  const [validateBtn, setValidateBtn] = useState<'invalid' | 'valid' | 'idle'>('idle')

  const handleClick = () => {
    const data: any = siteList[selectedIndex]
    siteKeys.forEach((key) => {
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

  const handleToggle = () => {
    axios
      .get(`${URI}/site`)
      .then((res) => {
        const data: any = res.data
        setsiteList(['none', ...data])
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
    siteKeys.forEach((key) => {
      if (values[key] === undefined) valid = false
      return
    })
    if (valid) {
      const siteData = values
      siteKeys.forEach((key) => {
        const _data: string = siteData[key].toString()
        if (types[key] === 'number') siteData[key] = parseFloat(_data)
        else if (types[key] === 'string') siteData[key] = _data
        else if (types[key] === 'number[]')
          siteData[key] = _data.split(',').map((i) => parseFloat(i))
      })
      setValidateBtn('valid')
      setSiteData!(siteData)
    } else {
      setValidateBtn('invalid')
      setSiteData!(null)
    }
  }

  const { setValue, handleSubmit, control, getValues } = useForm<any>()
  const onSubmit = handleSubmit((data) => {
    const siteData = data
    siteKeys.forEach((key) => {
      const _data: string = data[key].toString()
      if (types[key] === 'number') siteData[key] = parseFloat(_data)
      else if (types[key] === 'string') siteData[key] = _data
      else if (types[key] === 'number[]') siteData[key] = _data.split(',').map((i) => parseFloat(i))
    })
    axios
      .post(`${URI}/site`, siteData)
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
          <Typography variant='h4'>Site Data</Typography>
          <Divider />
        </Grid>

        <ItemInput title={'Site Name'} data={data.nameData} control={control} required={true} />
        <ItemInput title={'Site Data'} data={data.siteData} control={control} required={true} />

        <Grid item xs={12}>
          <ButtonGroup variant='outlined' sx={{ mr: 2 }} ref={anchorRef} aria-label='split button'>
            <Button size='large' disabled={selectedIndex === 0} onClick={handleClick}>
              {selectedIndex !== 0
                ? `Click to Load ${siteList[selectedIndex]['SITENAM']}`
                : 'Select site data'}
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

          <Button size='large' variant='outlined' type='submit' sx={{ ml: 2 }}>
            Save
          </Button>
          {setSiteData && (
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
                  {siteList.map((option, index) =>
                    index === 0 ? (
                      'none'
                    ) : (
                      <MenuItem
                        key={option['id']}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option['SITENAM']}
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

export default NewSite
