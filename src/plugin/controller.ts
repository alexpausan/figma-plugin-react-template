// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

import { nodeToObject } from '@figma-plugin/helpers'
import { getSimplifiedObject } from '../utils/utils'

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 400, height: 500 })

// Skip over invisible nodes and their descendants inside instances
// for faster performance.
figma.skipInvisibleInstanceChildren = true

figma.on('selectionchange', () => {
  updateSelection()
})

const updateSelection = async () => {
  const selection = figma.currentPage.selection

  if (!selection.length || selection.length > 1) {
    return
  }

  const selectedItem = nodeToObject(selection[0])

  const payload = {
    type: 'figma',
    data: getSimplifiedObject(selectedItem),
  }

  console.log('selectedItem', payload.data)

  const apiRequest = await fetch('http://localhost:3000/magic-layout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify(payload),
  })

  const serverResponse = await apiRequest.json()

  console.log('serverResponse', serverResponse)

  // if (updatedLayout && updatedLayout.length) {
  // console.log('server', updatedLayout?.[0])

  // figma.ui.postMessage({
  //   type: 'changed-selection',
  //   message: JSON.stringify(updatedLayout),
  // })
}

function createSolidRectangles(count: number) {
  const nodes = []

  for (let i = 0; i < count; i++) {
    const rect = figma.createRectangle()
    rect.x = i * 150
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }]
    figma.currentPage.appendChild(rect)
    nodes.push(rect)
  }

  return nodes
}

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-rectangles') {
    if (!Number.isInteger(msg.count) || msg.count < 0) {
      figma.ui.postMessage({
        type: 'error',
        message: `Invalid count value: ${msg.count}`,
      })
      return
    }

    const nodes = createSolidRectangles(msg.count)

    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)

    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${msg.count} Rectangles`,
    })
  }
}
