import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import SpaIcon from '@mui/icons-material/Spa'

import { useTheme } from '@mui/material/styles'
import { format } from 'date-fns'

import { ReactComponent as FarmerSvg } from './../../assets/farmer-using-smart-farm-application.svg'

const Home = () => {
  const theme = useTheme()
  return (
    <>
      <Grid container direction='row' justifyContent='center' alignItems='center' pt={10}>
        <Grid item xs={6}>
          <FarmerSvg />
        </Grid>
        <Grid xs={6}>
          <Grid item xs={12}>
            <Typography
              lineHeight={'1'}
              sx={{ fontSize: '7rem' }}
              color={theme.palette.success.main}
              fontFamily={'\'Rubik Marker Hatch\', cursive;'}
            >
              Crop Simulator
            </Typography>
            <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}>
              <Typography variant='h2'>with intuitive UI</Typography>
              <SpaIcon color={'success'} sx={{ fontSize: '4rem' }} />
            </Grid>
            <Grid xs={12}>
              <Divider sx={{ my: 2, backgroundColor: theme.palette.success.main }} />
              <Typography variant={'h5'} color={'GrayText'}>
                Crop Simulator offers a complete set of user interface tools to assist you in crop
                simulation through the WOFOST model.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant={'caption'} sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        {`Copyright © ${format(new Date(), 'yyyy')} Eduar297 All Rights Reserved.`}
        <SpaIcon color={'success'} sx={{ fontSize: '15px' }} />
      </Typography>
    </>
  )
}

export default Home
