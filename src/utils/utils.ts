export const getSimplifiedObject = (node: any) => {
  let { children } = node

  const newNode = filterProperties(node)

  if (children) {
    children = children.map((child: any) => getSimplifiedObject(child))
  }

  // @ts-ignore
  newNode.children = children
  return newNode
}

// @TODO: improve the function by excluding props that are empty or default
function filterProperties(obj) {
  const propsToKeep = obj.type === 'FRAME' ? COMMON_PROPS.concat(FRAME_PROPS) : COMMON_PROPS

  const newObj = {}
  for (const prop of propsToKeep) {
    if (obj.hasOwnProperty(prop) && !(prop in DEFAULT_VALUES)) {
      newObj[prop] = obj[prop]
    }
  }
  return newObj
}

const DEFAULT_VALUES = {
  visible: true,
  opacity: 1,
  fills: [],
  strokes: [],
  strokeWeight: 1,
  blendMode: 'PASS_THROUGH',
  effects: [],
  effectStyleId: '',
  rotation: 0,
  layoutAlign: 'INHERIT',
  layoutGrow: 0,
  cornerRadius: 0,
  topLeftRadius: 0,
  topRightRadius: 0,
  bottomLeftRadius: 0,
  bottomRightRadius: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  layoutMode: 'NONE',
  primaryAxisSizingMode: 'AUTO',
  counterAxisSizingMode: 'AUTO',
  itemSpacing: 0,
  primaryAxisAlignItems: 'MIN',
  counterAxisAlignItems: 'MIN',
  layoutGrids: [],
  gridStyleId: '',
  clipContent: false,
  guides: [],
}

const COMMON_PROPS = [
  'id',
  'type',
  'name',
  'visible',
  'opacity',
  'fills',
  'strokes',
  'strokeWeight',
  'absoluteBoundingBox',
  'relativeTransform',
  'blendMode',
  'effects',
  'effectStyleId',
  'width',
  'height',
  'x',
  'y',
  'rotation',
  'layoutAlign',
  'layoutGrow',
  'parent',
  'cornerRadius',
  'topLeftRadius',
  'topRightRadius',
  'bottomLeftRadius',
  'bottomRightRadius',
]

const FRAME_PROPS = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'layoutMode',
  'primaryAxisSizingMode',
  'counterAxisSizingMode',
  'itemSpacing',
  'primaryAxisAlignItems',
  'counterAxisAlignItems',
  'layoutGrids',
  'gridStyleId',
  'clipsContent',
  'guides',
]
