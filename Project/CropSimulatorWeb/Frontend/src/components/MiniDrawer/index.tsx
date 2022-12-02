import React, { FC, useState, useEffect } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars-2'
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse'

import GrassIcon from '@mui/icons-material/Grass'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InfoIcon from '@mui/icons-material/Info'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import DeleteIcon from '@mui/icons-material/Delete'
import SpaIcon from '@mui/icons-material/Spa'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ApprovalIcon from '@mui/icons-material/Approval'

import AppBar from '../AppBar'
import { ColorModeContext } from '../../App'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const drawerWidth = 350

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

const URI = 'http://localhost:5000'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const MiniDrawer: FC<{ Content: FC }> = ({ Content }) => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  const [open, setOpen] = React.useState(false)
  const location = useLocation()
  const [idToDelete, setIdToDelete] = React.useState<number>(-1)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const handleOpen = (id: number) => {
    setIdToDelete(id)
    setOpenDeleteModal(true)
  }
  const handleClose = () => {
    setIdToDelete(-1)
    setOpenDeleteModal(false)
  }

  const navigate = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const settings: {
    label: string
    Icon: React.ReactElement
    linkTo: string
    description: string
  }[] = [
    { label: 'Home', Icon: <HomeIcon />, linkTo: '/', description: 'go to home' },
    // {
    //   label: 'Dashboard',
    //   Icon: <DashboardIcon />,
    //   linkTo: 'dashboard',
    //   description: 'go to dashboard',
    // },
    { label: 'About', Icon: <InfoIcon />, linkTo: 'about', description: 'go to about' },
  ]

  const options: {
    label: string
    Icon: React.ReactElement
    linkTo: string
    description: string
    children: { label: string; Icon: React.ReactElement; linkTo: string; description: string }[]
  }[] = [
    {
      label: 'Create new model',
      Icon: <AddBoxIcon />,
      linkTo: 'model/new',
      description: 'create new model',
      children: [],
    },
    {
      label: 'Add New',
      Icon: <AddIcon />,
      linkTo: '#',
      description: 'add new...',
      children: [
        {
          label: 'Crop Data',
          Icon: <GrassIcon color='success' />,
          linkTo: 'crop_data/new',
          description: 'crop data',
        },
        {
          label: 'Soil Parameters',
          Icon: <GrassIcon sx={{ color: '#522a09' }} />,
          linkTo: 'soil_data/new',
          description: 'soil parameters',
        },
        {
          label: 'Site Parameters',
          Icon: <ApprovalIcon color='info' />,
          linkTo: 'site_data/new',
          description: 'site parameters',
        },
        {
          label: 'AgroManagement',
          Icon: <CalendarMonthIcon />,
          linkTo: 'agromanagement/new',
          description: 'agroManagement',
        },
      ],
    },
  ]

  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionClick = (optionLabel: string) => {
    if (selectedOption === optionLabel) setSelectedOption(null)
    else setSelectedOption(optionLabel)
  }

  const [models, setModels] = useState<any[]>([])

  const handleDeleteModel = () => {
    handleClose()
    axios
      .delete(`${URI}/model/${idToDelete}`)
      .then((res) => {
        const data: any = res.data
        // TODO... to close env
        setModels(models.filter((model) => model['id'] != idToDelete))
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    axios
      .get(`${URI}/model`)
      .then((res) => {
        const data: any = res.data
        setModels(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [location.pathname])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={open ? <ListSubheader>Settings</ListSubheader> : null}
          >
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Tooltip
                title={theme.palette.mode === 'dark' ? 'set light mode' : 'set dark mode'}
                arrow
                placement='right'
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={colorMode.toggleColorMode}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={`${theme.palette.mode} mode`}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
            {settings.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: 'block' }}
                selected={location.pathname === `/${item.linkTo}`}
              >
                <Tooltip title={item.description} arrow placement='right'>
                  <ListItemButton
                    component={RouterLink}
                    to={item.linkTo}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.Icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>

          <Divider />

          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={open ? <ListSubheader>Options</ListSubheader> : null}
          >
            {options.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: 'block' }}
                selected={item.children.length === 0 && location.pathname === `/${item.linkTo}`}
              >
                <Tooltip title={item.description} arrow placement='right'>
                  <ListItemButton
                    onClick={() => {
                      if (item.children.length !== 0) handleOptionClick(item.label)
                    }}
                    component={RouterLink}
                    to={item.linkTo}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.Icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                    {item.children.length === 0 ? null : selectedOption &&
                      selectedOption === item.label ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                </Tooltip>
                <Collapse in={selectedOption === item.label} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    {item.children.map((item2, index2) => (
                      <ListItem
                        key={index2}
                        disablePadding
                        sx={{ display: 'block', pl: 2 }}
                        selected={location.pathname === `/${item2.linkTo}`}
                      >
                        <Tooltip title={item2.description} arrow placement='right'>
                          <ListItemButton
                            component={RouterLink}
                            to={item2.linkTo}
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 2.5,
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              {item2.Icon}
                            </ListItemIcon>
                            <ListItemText primary={item2.label} sx={{ opacity: open ? 1 : 0 }} />
                          </ListItemButton>
                        </Tooltip>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            subheader={open ? <ListSubheader>Models</ListSubheader> : null}
          >
            {models.map((model) => (
              <ListItem
                key={model['id']}
                disablePadding
                sx={{ display: 'block' }}
                selected={location.pathname === `/model/${model['id']}`}
              >
                <Tooltip title={model['name']} arrow placement='right'>
                  <ListItemButton
                    component={RouterLink}
                    to={`/model/${model['id']}`}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <SpaIcon color='success' />
                    </ListItemIcon>
                    <ListItemText primary={model['name']} sx={{ opacity: open ? 1 : 0 }} />

                    <Tooltip title={'remove model'} arrow placement='bottom'>
                      <IconButton
                        aria-label='delete'
                        onClick={(e) => {
                          e.preventDefault()

                          handleOpen(model['id'])
                        }}
                      >
                        <DeleteIcon color='error' sx={{ fontSize: '18px' }} />
                      </IconButton>
                    </Tooltip>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Scrollbars>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Content />
        <Modal
          open={openDeleteModal}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Delete Model
            </Typography>
            <Typography id='modal-modal-description' sx={{ my: 2 }}>
              Are you sure you want to delete?
            </Typography>
            <Grid container direction='row' justifyContent='center' alignItems='center'>
              <Button variant='outlined' onClick={handleClose} color='primary' sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant='outlined' onClick={handleDeleteModel} color='error'>
                Yes, Delete
              </Button>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}

export default MiniDrawer
