import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const ControllableStates: React.FC<{
  label: string
  options: string[]
  value: string | null
  setValue: React.Dispatch<React.SetStateAction<string | null>>
}> = ({ label, options, value, setValue }) => {
  const [inputValue, setInputValue] = React.useState('')

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        id='controllable-states-demo'
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  )
}

export default ControllableStates
