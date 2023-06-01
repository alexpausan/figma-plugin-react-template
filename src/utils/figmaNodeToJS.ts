export const processFigmaNodesToJS = (node: any) => {
  let { children } = node

  const newNode = figmaNodeToJS(node)

  if (children) {
    children = children.map((child: any) => processFigmaNodesToJS(child))
  }

  return {
    ...newNode,
    children,
  }
}

const figmaNodeToJS = (node: any) => {
  const { type } = node

  if (type === 'GROUP') {
    
  }

  if (type === 'INSTANCE') {
    const newNode = processFigmaNodesToJS(node)

    return newNode
  }
}
