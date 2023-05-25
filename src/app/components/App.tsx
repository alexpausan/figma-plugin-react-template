import React from 'react'
import '../styles/ui.css'

import Tabs from './tabs'

function App() {
  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`)
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
