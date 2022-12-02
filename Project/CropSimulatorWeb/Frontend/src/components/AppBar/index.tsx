import { FC } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink } from 'react-router-dom'

import SpaIcon from '@mui/icons-material/Spa'

const drawerWidth = 350

interface StyledAppBarProps extends MuiAppBarProps {
  open?: boolean
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<StyledAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const AppBar: FC<{ open: boolean; handleDrawerOpen: () => void }> = ({
  open,
  handleDrawerOpen,
}) => {
  const theme = useTheme()
  return (
    <StyledAppBar color='default' position='fixed' open={open}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Link color='inherit' underline='none' component={RouterLink} to='/'>
          <Typography
            variant='button'
            component='div'
            sx={{ flexGrow: 1 }}
            color={theme.palette.success.main}
            fontFamily={'\'Rubik Marker Hatch\', cursive;'}
          >
            Crop Simulator
            <SpaIcon sx={{ fontSize: '20px' }} />
          </Typography>
        </Link>
      </Toolbar>
    </StyledAppBar>
  )
}

export default AppBar
