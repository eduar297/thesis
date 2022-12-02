import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React, { FC } from 'react'
import Item from '../../../components/Item'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Modal from '@mui/material/Modal'

import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import axios from 'axios'
import EnhancedTable from './EnhancedTable'
import { TOutput } from '..'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Chip, FormControl, FormHelperText, InputLabel, Snackbar } from '@mui/material'
import { stringify } from 'yaml'

const options = ['Run 1 day', 'Run 5 days', 'Run 10 days', 'Run 30 days', 'Run till terminate']

const URI = 'http://localhost:5000'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
}

type TSelectedSetVar =
  | 'DVS'
  | 'LAI'
  | 'RB'
  | 'SM'
  | 'TAGP'
  | 'TRA'
  | 'TWLV'
  | 'TWRT'
  | 'TWSO'
  | 'TWST'
  | 'WWLOW'

const Simulation: FC<{
  model: any
  startedEnv: boolean
  setStartedEnv: React.Dispatch<React.SetStateAction<boolean>>
  output: TOutput[]
  setOutput: React.Dispatch<React.SetStateAction<TOutput[]>>
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}> = ({ model, startedEnv, setStartedEnv, output, setOutput, selectedIndex, setSelectedIndex }) => {
  const [open, setOpen] = React.useState(false)
  const [openResetVar, setOpenResetVar] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const [loadingStart, setLoadingStart] = React.useState<boolean>(false)
  const [loadingReset, setLoadingReset] = React.useState<boolean>(false)
  const [loadingRun, setLoadingRun] = React.useState<boolean>(false)
  const [loadingResetVar, setLoadingResetVar] = React.useState<boolean>(false)

  const [selectedSetVar, setSelectedSetVar] = React.useState<TSelectedSetVar>('LAI')
  const [selectedSetValue, setSelectedSetValue] = React.useState<number>(0)

  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false)
  const [varIncrements, setVarIncrements] = React.useState<any>()

  const handleChangeSelectedSetVar = (event: SelectChangeEvent) => {
    setSelectedSetVar(event.target.value as TSelectedSetVar)
  }

  const handleRunClick = () => {
    setLoadingRun(true)
    let runTillTerminate = false
    const opt = options[selectedIndex]
    let days = 0

    if (opt === 'Run till terminate') runTillTerminate = true
    else if (opt === 'Run 1 day') days = 1
    else if (opt === 'Run 5 days') days = 5
    else if (opt === 'Run 10 days') days = 10
    else if (opt === 'Run 30 days') days = 30

    const uri = runTillTerminate
      ? `${URI}/simulation/run/${model['id']}`
      : `${URI}/simulation/run/${model['id']}?days=${days}`
    axios
      .get(uri)
      .then((res) => {
        const out: TOutput[] = res.data

        setOutput(out)

        setLoadingRun(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleResetVar = () => {
    setOpenResetVar(true)
  }

  const handleCloseResetVar = () => {
    setOpenResetVar(false)
  }

  const handleSetVar = () => {
    handleCloseResetVar()
    const uri = `${URI}/simulation/set/${model['id']}`
    axios
      .post(uri, { varname: selectedSetVar, value: selectedSetValue })
      .then((res) => {
        const varIncrements = res.data['var_increments']

        setVarIncrements(varIncrements)
        setSnackbarOpen(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

  async function load(ms: number, max: number, cb: () => void) {
    for (let i = 0; i < max; i++) {
      cb()
      await delay(ms)
    }
  }

  const handleAutomaticRunClick = () => {
    setLoadingRun(true)
    let runTillTerminate = false
    const opt = options[selectedIndex]
    let days = 0

    if (opt === 'Run till terminate') runTillTerminate = true
    else if (opt === 'Run 1 day') days = 1
    else if (opt === 'Run 5 days') days = 5
    else if (opt === 'Run 10 days') days = 10
    else if (opt === 'Run 30 days') days = 30

    const uri = `${URI}/simulation/run/${model['id']}?days=${1}`

    load(1000, days, () => {
      axios
        .get(uri)
        .then((res) => {
          const out: TOutput[] = res.data
          setOutput(out)
        })
        .catch((err) => {
          console.log(err)
        })
    })

    setLoadingRun(false)
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleStartEnv = () => {
    setLoadingStart(true)

    axios
      .get(`${URI}/simulation/init/${model['id']}`)
      .then((res) => {
        const out: TOutput[] = res.data

        setOutput(out)

        setLoadingStart(false)
        setStartedEnv(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleResetEnv = () => {
    setLoadingReset(true)

    axios
      .get(`${URI}/simulation/init/${model['id']}`)
      .then((res) => {
        const out: TOutput[] = res.data

        setOutput(out)

        setLoadingReset(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Grid item xs={12}>
      <Grid container spacing={1} justifyContent='center'>
        <Grid container xs={12} spacing={1} direction='row' justifyContent='start' mb={4}>
          <Grid item>
            <LoadingButton
              disabled={startedEnv}
              color='success'
              onClick={handleStartEnv}
              loading={loadingStart}
              variant='outlined'
            >
              {startedEnv ? 'Started Environment' : 'Start Environment'}
            </LoadingButton>
          </Grid>

          <Grid item>
            <LoadingButton
              disabled={!startedEnv}
              color='secondary'
              onClick={handleResetEnv}
              loading={loadingReset}
              variant='outlined'
            >
              Reset Environment
            </LoadingButton>
          </Grid>

          <Grid item mr={4}>
            <LoadingButton
              disabled={!startedEnv}
              color='primary'
              onClick={handleResetVar}
              loading={loadingResetVar}
              variant='outlined'
            >
              Set Variable
            </LoadingButton>
          </Grid>

          <Grid item>
            <ButtonGroup
              disabled={!startedEnv}
              variant='outlined'
              ref={anchorRef}
              aria-label='split button'
            >
              <LoadingButton
                startIcon={<PlayCircleOutlinedIcon />}
                onClick={handleRunClick}
                loadingPosition='start'
                loading={loadingRun}
                variant='outlined'
              >
                {options[selectedIndex]}
              </LoadingButton>
              <Button
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-label='select merge strategy'
                aria-haspopup='menu'
                onClick={handleToggle}
              >
                <ArrowDropDownIcon color='warning' />
              </Button>
              <LoadingButton
                startIcon={<AllInclusiveIcon />}
                onClick={handleAutomaticRunClick}
                loadingPosition='start'
                loading={loadingRun}
                variant='outlined'
              >
                Automatic run
              </LoadingButton>
            </ButtonGroup>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <EnhancedTable tableTitle='Results' output={output} />
        </Grid>
      </Grid>

      {/*  */}
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
                  {options.map((option, index) => (
                    <>
                      {index === options.length - 1 && <Divider />}
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    </>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Modal
        open={openResetVar}
        onClose={handleCloseResetVar}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Grid xs={12} direction='column' textAlign={'center'} mt={-1} mb={2}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Set Variable
            </Typography>
            <Divider />
          </Grid>

          <Grid
            container
            direction='row'
            justifyContent='space-around'
            alignItems='center'
            sx={{ py: 1 }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
              <InputLabel id='demo-simple-select-helper-label'>Variable</InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={selectedSetVar}
                label='Variable'
                onChange={handleChangeSelectedSetVar}
              >
                <MenuItem value={'DVS'}>DVS</MenuItem>
                <MenuItem value={'LAI'}>LAI</MenuItem>
                <MenuItem value={'RB'}>RB</MenuItem>
                <MenuItem value={'SM'}>SM</MenuItem>
                <MenuItem value={'TAGP'}>TAGP</MenuItem>
                <MenuItem value={'TRA'}>TRA</MenuItem>
                <MenuItem value={'TWLV'}>TWLV</MenuItem>
                <MenuItem value={'TWRT'}>TWRT</MenuItem>
                <MenuItem value={'TWSO'}>TWSO</MenuItem>
                <MenuItem value={'TWST'}>TWST</MenuItem>
                <MenuItem value={'WWLOW'}>WWLOW</MenuItem>
              </Select>
            </FormControl>
            <Chip
              label={
                output.length > 0 &&
                `current value: ${
                  output[output.length - 1][
                    selectedSetVar as
                      | 'DVS'
                      | 'LAI'
                      | 'RD'
                      | 'SM'
                      | 'TAGP'
                      | 'TRA'
                      | 'TWLV'
                      | 'TWRT'
                      | 'TWSO'
                      | 'TWST'
                      | 'WWLOW'
                  ]
                }`
              }
              variant='outlined'
            />

            <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
              <TextField
                sx={{ mr: 2, width: '8rem' }}
                id='outlined-number'
                size={'small'}
                label='New value'
                type='number'
                onChange={(e: any) => {
                  setSelectedSetValue(e.target.value)
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button variant='outlined' color='success' onClick={handleSetVar}>
                Set Value
              </Button>
            </Box>
          </Grid>

          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            sx={{ mt: 2 }}
          >
            <Button variant='outlined' onClick={handleCloseResetVar} color='primary' sx={{ mr: 2 }}>
              Cancel
            </Button>
          </Grid>
        </Box>
      </Modal>
      {/*  */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        onClose={() => {
          setSnackbarOpen(false)
        }}
        message={stringify(varIncrements)}
      />
    </Grid>
  )
}

export default Simulation
