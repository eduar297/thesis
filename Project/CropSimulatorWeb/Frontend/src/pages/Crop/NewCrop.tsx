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
import { descriptions, cropKeys, types } from './data'
import Item from '../../components/Item'

type FormData = {
  CRPNAM: string
  TBASEM: string
  TEFFMX: string
  TSUMEM: string
  IDSL: string
  DLO: string
  DLC: string
  TSUM1: string
  TSUM2: string
  DTSMTB: string
  DVSI: string
  DVSEND: string
  TDWI: string
  LAIEM: string
  RGRLAI: string
  SLATB: string
  SPA: string
  SSATB: string
  SPAN: string
  TBASE: string
  KDIFTB: string
  EFFTB: string
  AMAXTB: string
  TMPFTB: string
  TMNFTB: string
  CVL: string
  CVO: string
  CVR: string
  CVS: string
  Q10: string
  RML: string
  RMO: string
  RMR: string
  RMS: string
  RFSETB: string
  FRTB: string
  FLTB: string
  FSTB: string
  FOTB: string
  PERDL: string
  RDRRTB: string
  RDRSTB: string
  CFET: string
  DEPNR: string
  IAIRDU: string
  IOX: string
  RDI: string
  RRI: string
  RDMCR: string
  NMINSO: string
  NMAXSO: string
  PMINSO: string
  PMAXSO: string
  KMINSO: string
  KMAXSO: string
  NMINVE: string
  NMAXVE: string
  PMINVE: string
  PMAXVE: string
  KMINVE: string
  KMAXVE: string
  YZERO: string
  NFIX: string
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
                          : 'crop_name'
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

const NewCrop: FC<{ setCropData?: React.Dispatch<any> }> = ({ setCropData }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [cropList, setCropList] = useState<any[]>(['none'])

  const [validateBtn, setValidateBtn] = useState<'invalid' | 'valid' | 'idle'>('idle')

  const handleClick = () => {
    const data: any = cropList[selectedIndex]
    cropKeys.forEach((key) => {
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
    formData.append('crop-file', file)

    axios
      .post(`${URI}/crop/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const data: any = res.data
        console.log(data)
        cropKeys.forEach((key) => {
          setValue(key, data[key])
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleToggle = () => {
    axios
      .get(`${URI}/crop`)
      .then((res) => {
        const data: any = res.data
        setCropList(['none', ...data])
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
    cropKeys.forEach((key) => {
      if (values[key] === undefined) valid = false
      return
    })
    if (valid) {
      const cropData = values
      cropKeys.forEach((key) => {
        const _data: string = cropData[key].toString()
        if (types[key] === 'number') cropData[key] = parseFloat(_data)
        else if (types[key] === 'string') cropData[key] = _data
        else if (types[key] === 'number[]')
          cropData[key] = _data.split(',').map((i) => parseFloat(i))
      })
      setValidateBtn('valid')
      setCropData!(cropData)
    } else {
      setValidateBtn('invalid')
      setCropData!(null)
    }
  }

  const { setValue, handleSubmit, control, getValues } = useForm<any>()
  const onSubmit = handleSubmit((data) => {
    const cropData = data
    cropKeys.forEach((key) => {
      const _data: string = data[key].toString()
      if (types[key] === 'number') cropData[key] = parseFloat(_data)
      else if (types[key] === 'string') cropData[key] = _data
      else if (types[key] === 'number[]') cropData[key] = _data.split(',').map((i) => parseFloat(i))
    })
    axios
      .post(`${URI}/crop`, cropData)
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
          <Typography variant='h4'>Crop Data</Typography>
          <Divider />
        </Grid>

        <ItemInput title={'Crop Name'} data={data.nameData} control={control} />
        <ItemInput title={'Emergence'} data={data.emergenceData} control={control} />
        <ItemInput title={'Initial'} data={data.initialData} control={control} />
        <ItemInput title={'Death Rates'} data={data.deathRatesData} control={control} />
        <ItemInput title={'Water Use'} data={data.waterUseData} control={control} />
        <ItemInput
          title={'Conversion Of Assimilates Into Biomass'}
          data={data.conversionOfAssimilatesIntoBiomassData}
          control={control}
        />
        <ItemInput title={'Rooting'} data={data.rootingData} control={control} />
        <ItemInput title={'Partitioning'} data={data.partitioningData} control={control} />
        <ItemInput title={'Green Area'} data={data.greenAreaData} control={control} />
        <ItemInput title={'Assimilation'} data={data.assimilationData} control={control} />
        <ItemInput
          title={'Maintenance Respiration'}
          data={data.maintenanceRespirationData}
          control={control}
        />
        <ItemInput title={'Phenology'} data={data.phenologyData} control={control} />

        <Grid item xs={12}>
          <Item elevation={3}>
            <Grid item xs={12} marginBottom={2}>
              <Typography variant='subtitle2'>Nutrients</Typography>
              <Divider />
            </Grid>

            <Grid item container spacing={1}>
              <ItemInput
                title={'In Storage Organs'}
                data={data.inStorageOrgansData}
                control={control}
              />
              <ItemInput
                title={'In Vegetative Organs'}
                data={data.inVegetativeOrgansData}
                control={control}
              />

              <Grid item xs={3} key={'YZERO'}>
                <Controller
                  name={'YZERO'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Tooltip title={`${descriptions['YZERO']} ---- (enter a number)`} arrow>
                      <TextField
                        required
                        placeholder={'0.0'}
                        onChange={onChange}
                        value={value}
                        label={'YZERO'}
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

              <Grid item xs={3} key={'NFIX'}>
                <Controller
                  name={'NFIX'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Tooltip title={`${descriptions['NFIX']} ---- (enter a number)`} arrow>
                      <TextField
                        required
                        placeholder={'0.0'}
                        onChange={onChange}
                        value={value}
                        label={'NFIX'}
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

        <Grid item xs={12}>
          <ButtonGroup variant='outlined' sx={{ mr: 2 }} ref={anchorRef} aria-label='split button'>
            <Button size='large' disabled={selectedIndex === 0} onClick={handleClick}>
              {selectedIndex !== 0
                ? `Click to Load ${cropList[selectedIndex]['CRPNAM']}`
                : 'Select crop data'}
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
          {setCropData && (
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
                  {cropList.map((option, index) =>
                    index === 0 ? (
                      'none'
                    ) : (
                      <MenuItem
                        key={option['id']}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option['CRPNAM']}
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

export default NewCrop
