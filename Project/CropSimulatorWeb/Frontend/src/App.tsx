import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import NewCrop from './pages/Crop/NewCrop'
import NewSite from './pages/Site/NewSite'
import NewSoil from './pages/Soil/NewSoil'
import NewAgromanagement from './pages/Agromanagement/NewAgromanagement'
import Dashboard from './pages/Dashboard'
import MiniDrawer from './components/MiniDrawer'
import NewModel from './pages/Model/CreateNew'
import NewDailyWeather from './pages/DailyWeatherObservations/NewDailyWeather'
import Model from './pages/Model'
import Home from './pages/Home'
import About from './pages/About'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

const Content: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/model/:model_id' element={<Model />} />
      <Route path='/model/new' element={<NewModel />} />
      <Route path='/crop_data/new' element={<NewCrop />} />
      <Route path='/soil_data/new' element={<NewSoil />} />
      <Route path='/site_data/new' element={<NewSite />} />
      <Route path='/agromanagement/new' element={<NewAgromanagement />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/*' element={<p>No match</p>} />
    </Routes>
  )
}

const App = () => {
  return <MiniDrawer Content={Content} />
}
