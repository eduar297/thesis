import React, { FC } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { Scrollbars } from 'react-custom-scrollbars-2'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Grid
      xs={12}
      p={3}
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Scrollbars style={{ width: '100%', height: '100%' }}>
        {value === index && (
          <Grid item xs={12} m={1}>
            {children}
          </Grid>
        )}
      </Scrollbars>
    </Grid>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const VerticalTabs: FC<{
  InitialModelInfo: FC
  Simulation: FC
  Charts: FC
  startedEnv: boolean
}> = ({ InitialModelInfo, Simulation, Charts, startedEnv }) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: '38rem',
      }}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label='Initial Model Info' {...a11yProps(0)} />
        <Tab label='Simulation' {...a11yProps(1)} />
        <Tab disabled={!startedEnv} label='Charts' {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <InitialModelInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Simulation />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Charts />
      </TabPanel>
    </Box>
  )
}

export default VerticalTabs
