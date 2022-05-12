import { useState, forwardRef, useImperativeHandle } from 'react'
import { Box, Button } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = visible ? 'none' : 'flex'
  const showWhenVisible = visible ? '' : 'none'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <Box
        sx={{
          display: hideWhenVisible,
          justifyContent: 'center',
          p: 2,
        }}>
        <Button variant='contained' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>
      <div
        style={{
          display: showWhenVisible,
        }}>
        {props.children}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' onClick={toggleVisibility}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.defaultProps = {
  buttonLabel: 'Show',
}

export default Togglable
