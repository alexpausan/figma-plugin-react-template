import React from 'react'
import '../styles/ui.css'

import Tabs from './tabs'

function App() {
  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage

      if (type === 'changed-selection') {
        console.log(JSON.parse(message))
        return
      }
    }
  }, [])

  return (
    <div>
      <Tabs />
    </div>
  )
}

export default App
