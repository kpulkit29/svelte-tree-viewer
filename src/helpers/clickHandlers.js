import { fixClickedElementCSS } from './domhelpers'
/**
 * fetches the currenty clicked node
 * looks for the very first child node
 * applies CSS to rotate the chevron and expand the child node
 * @param {DOM Click} event
 */
export function clickHandler (event) {
  const node = event.currentTarget
  // nodeParent will give us the complete node so that we can query for
  // the child nodes
  const nodeParent = node.parentNode
  const treeChild = nodeParent.querySelector('.tree-child')
  const nodeDesc = nodeParent.querySelector('.node-desc .chev-right')
  // CTO -> boolean
  // True -> child node is in expanded state
  // False -> child node is in shrinked state
  if (node.CTO) {
    node.CTO = !node.CTO
    treeChild && fixClickedElementCSS(nodeDesc, treeChild, true)
    return
  }
  node.CTO = true
  treeChild && fixClickedElementCSS(nodeDesc, treeChild)
}
