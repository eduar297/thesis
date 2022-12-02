import { FC } from 'react'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const Loading: FC<{ text?: string }> = ({ text }) => (
  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
    {text && <p>{text}</p>}
    <CircularProgress color='inherit' />
  </Backdrop>
)

export default Loading
