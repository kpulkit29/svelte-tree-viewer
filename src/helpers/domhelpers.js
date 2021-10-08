/**
 * Expand/Shrink child nodes
 * @param {HTMLElement} node
 * @param {HTMLElement} child
 * @param {HTMLElement} reverse reverse denotes shrink
 */
export function fixClickedElementCSS (node, child, reverse) {
  if (!reverse) {
    child.style.transform = 'scale(1,1)'
    child.style.height = 'auto'
  } else {
    child.style.transform = 'scale(1,0)'
    child.style.height = '0px'
  }
  fixArrowPositioning(node, reverse)
}

/**
 * rotates chevronon the basis on a flag named reverse
 * @param {HTMLElement} node
 * @param {HTMLElement} reverse reverse denotes shrink
 */
export function fixArrowPositioning (node, reverse) {
  if (!reverse) {
    node.style.transform = 'rotate(90deg)'
  } else {
    node.style.transform = ''
  }
}
