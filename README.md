#svelte-tree-viewer

Easy and compact svelte component library to generate tree view.


#Usage
## creating a Tree structure that svelte-tree-viewer can interpret

```
type Node =  {
    desc: string;
    key?: string;
    child?: Array<Node>;
}
```

```
const Tree: Array<Node> = [{
  desc: 'parent',
  child: [{
    key: 'child',
    desc: 'child'
  }]
}, {
  desc: 'parent 2 it is',
  child: [{
    desc: 'child 2 it is',
    child: [{
      desc: 'child 2-1 it is',
      key: 'child-2-1'
    }]
  }]
}]
 
```
Should be an array of objects where  each object denotes a tree node and can have the following properties
 - key -> a unique key name that would be forwarded as the onSelectCallback parameter. Not required on a non-leaf node.
 - desc -> text to be shown on UI
 - child -> denotes children of the current node. Don't pass it on if a node does have any children.

## import it in your svelte component
```
import { TreeViewer } from "TreeViewer";
```


This component will expect the following props
 - tree -> Tree
 - onSelectCallback(optional): (key) => {....your implementation} -> a callback function that will be called when any leaf node is clicked
 - secondaryIcon(optional): "string"

**Note: onSelectCallback will be called only when a click event is registered on the leaf nodes**