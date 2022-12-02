import React, { FC, useState, memo } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import CodeIcon from '@mui/icons-material/Code'

import { useTheme } from '@mui/material/styles'

import Editor from '@monaco-editor/react'

const YamlEditor: FC<{
  yaml: any
  setYaml?: any
  title?: any
  readOnly?: boolean
  height?: string
}> = ({ yaml, setYaml, title, readOnly = false, height = '450px' }) => {
  const theme = useTheme()
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardHeader
        sx={{ pb: 0 }}
        avatar={
          <Avatar aria-label='code'>
            <CodeIcon />
          </Avatar>
        }
        title={!title ? 'Enter agromanagement data in yaml format.' : title}
      />
      <CardContent>
        <Editor
          options={{ readOnly }}
          height={height}
          width='100%'
          language={'yaml'}
          theme={theme.palette.mode === 'dark' ? 'vs-dark' : 'vs-light'}
          value={yaml}
          onChange={(e: any) => {
            if (setYaml) setYaml(e)
          }}
        />
      </CardContent>
    </Card>
  )
}

export default memo(YamlEditor)
