// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 400, height: 500 })

// Skip over invisible nodes and their descendants inside instances
// for faster performance.
figma.skipInvisibleInstanceChildren = true

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-rectangles') {
    const nodes = []

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle()
      rect.x = i * 150
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }]
      figma.currentPage.appendChild(rect)
      nodes.push(rect)
    }

    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${msg.count} Rectangles`,
    })
  }

  figma.closePlugin()
}
