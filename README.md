# svelte-tree-viewer

[![Build Status](https://app.travis-ci.com/kpulkit29/svelte-tree-viewer.svg?branch=main)](https://app.travis-ci.com/kpulkit29/svelte-tree-viewer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.badgesize.io/kpulkit29/svelte-tree-viewer/main/dist/index.mjs.svg?&label=size)](https://github.com/ngryman/badge-size)


Easy and compact svelte component library to generate tree view.


## Usage
## Creating a Tree structure that svelte-tree-viewer can interpret

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
then use it in you component
```
 <TreeViewer tree={tree} onSelectCallback={YOUR_CALLBACK_FUNCTION_HERE}/>
```

This component will expect the following props
 - tree -> Tree
 - onSelectCallback(optional): (key) => {....your implementation} -> a callback function that will be called when any leaf node is clicked
 - secondaryIcon(optional): Fa icon or image src
 - faIcon: boolean ->
                      - true: if the secondary icon is a font awesome icon
                      - false: if it is an image url

**Note: onSelectCallback will be called only when a click event is registered on the leaf nodes**

## Using secondary icons
svelte-tree-viewer supports font awesome icons and uses [svelte-fa](https://cweili.github.io/svelte-fa/) to render those. if you want the secondary icon to be visible on the screen, then there are two possible ways to pass it on to svelte-tree-viewer

1. Using font awesome
```
 import { faBookDead } from '@fortawesome/free-solid-svg-icons';

 // Note: faIcon is true here since faBookDead is a font awesome icon
 <TreeViewer tree={tree} secondaryIcon={faBookDead} onSelectCallback={YOUR_CALLBACK_FUNCTION_HERE} faIcon={true}/>
```

2. Using custom image url
```
 // Note: faIcon is false here
 <TreeViewer tree={tree} secondaryIcon={'[YOUR_IMAGE_SRC]'} onSelectCallback={YOUR_CALLBACK_FUNCTION_HERE} faIcon={false}/>
```
