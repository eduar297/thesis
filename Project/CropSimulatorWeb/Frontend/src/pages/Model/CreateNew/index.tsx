import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import FrmModelType from './FrmModelType'
import NewCrop from '../../Crop/NewCrop'
import NewSoil from '../../Soil/NewSoil'
import NewSite from '../../Site/NewSite'
import NewAgromanagement from '../../Agromanagement/NewAgromanagement'
import NewDailyWeather from '../../DailyWeatherObservations/NewDailyWeather'
import AddModel from './AddModel'

const steps = [
  'Model type',
  'Crop data',
  'Soil parameters',
  'Site parameters',
  'AgroManagement',
  'Daily weather observations',
  'Create and add',
]

export default function CreateNewModel() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())

  const [modelType, setModelType] = React.useState<string | null>('')
  const [cropData, setCropData] = React.useState<any | null>(null)
  const [soilData, setSoilData] = React.useState<any | null>(null)
  const [siteData, setSiteData] = React.useState<any | null>(null)
  const [agroData, setAgroData] = React.useState<any | null>(null)
  const [geolocationData, setGeolocationData] = React.useState<any | null>(null)

  const isStepOptional = (step: number) => {
    // return step === 1
    return false
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const CanNext = () => {
    switch (activeStep) {
      case 0:
        if (modelType) return true
        break
      case 1:
        if (cropData) return true
        break
      case 2:
        if (soilData) return true
        break
      case 3:
        if (siteData) return true
        break
      case 4:
        if (agroData) return true
        break
      case 5:
        if (geolocationData) return true
        break
      default:
        break
    }
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error('You can\'t skip a step that isn\'t optional.')
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant='caption'>Optional</Typography>
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box
            sx={{ mt: 2, mb: 1 }}
            display='flex'
            flex-direction='row'
            justifyContent='center'
            alignItems='center'
          >
            {activeStep === 0 && <FrmModelType modelType={modelType} setModelType={setModelType} />}
            {activeStep === 1 && <NewCrop setCropData={setCropData} />}
            {activeStep === 2 && <NewSoil setSoilData={setSoilData} />}
            {activeStep === 3 && <NewSite setSiteData={setSiteData} />}
            {activeStep === 4 && <NewAgromanagement setAgroData={setAgroData} />}
            {activeStep === 5 && <NewDailyWeather setGeolocationData={setGeolocationData} />}
            {activeStep === 6 && (
              <AddModel
                agroData={agroData}
                cropData={cropData}
                geolocationData={geolocationData}
                modelType={modelType}
                siteData={siteData}
                soilData={soilData}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color='inherit' onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext} disabled={!CanNext()}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  )
}
