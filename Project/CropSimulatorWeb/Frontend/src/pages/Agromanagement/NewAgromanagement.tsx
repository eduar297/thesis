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
import YamlEditor from '../../components/YamlEditor'
import Item from '../../components/Item'

type FormData = {
  name: string
  agroYaml: string
}

const URI = 'http://localhost:5000'

const NewAgromanagement: FC<{ setAgroData?: React.Dispatch<any> }> = ({ setAgroData }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [agroList, setAgroList] = useState<any[]>(['none'])

  const [validateBtn, setValidateBtn] = useState<'invalid' | 'valid' | 'idle'>('idle')

  const handleClick = () => {
    const data: any = agroList[selectedIndex]
    setValue('name', data['name'])
    setValue('agroYaml', data['agroYaml'])
  }

  const setYaml = (yaml: string) => {
    setValue('agroYaml', yaml)
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
    formData.append('agro-file', file)

    axios
      .post(`${URI}/agro/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const data: any = res.data
        console.log(data)
        setValue('name', data['name'])
        setValue('agroYaml', data['agroYaml'])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleToggle = () => {
    axios
      .get(`${URI}/agro`)
      .then((res) => {
        const data: any = res.data
        setAgroList(['none', ...data])
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
    const valid = values['name'] && values['agroYaml']
    if (valid) {
      const agroData = values
      setValidateBtn('valid')
      setAgroData!(agroData)
    } else {
      setValidateBtn('invalid')
      setAgroData!(null)
    }
    console.log()
  }

  const { setValue, handleSubmit, control, getValues, watch } = useForm<any>()
  const onSubmit = handleSubmit((data) => {
    const agroData = data

    axios
      .post(`${URI}/agro`, agroData)
      .then((res) => {
        const data: any = res.data
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  const editorRef = useRef(null)

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
          <Typography variant='h4'>Agromanagement</Typography>
          <Divider />
        </Grid>

        <Grid item xs={3}>
          <Item elevation={3}>
            <Grid item xs={12} marginBottom={2}>
              <Typography variant='subtitle2'>Agromanagement Name</Typography>
              <Divider />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Controller
                  name={'name'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Tooltip title={'agro name ---- (enter a string)'} arrow>
                      <TextField
                        required
                        fullWidth
                        placeholder={'agro_name'}
                        onChange={onChange}
                        value={value}
                        label={'Agro name'}
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
              <Typography variant='subtitle2'>Agromanagement Data (YAML)</Typography>
              <Divider />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <YamlEditor yaml={watch('agroYaml')} setYaml={setYaml} />
              </Grid>
            </Grid>
          </Item>
        </Grid>

        <Grid item xs={12}>
          <ButtonGroup variant='outlined' sx={{ mr: 2 }} ref={anchorRef} aria-label='split button'>
            <Button size='large' disabled={selectedIndex === 0} onClick={handleClick}>
              {selectedIndex !== 0
                ? `Click to Load ${agroList[selectedIndex]['name']}`
                : 'Select agromanagement data'}
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
          {setAgroData && (
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
                  {agroList.map((option, index) =>
                    index === 0 ? (
                      'none'
                    ) : (
                      <MenuItem
                        key={option['id']}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option['name']}
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

export default NewAgromanagement
