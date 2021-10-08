import { render, cleanup, fireEvent } from '@testing-library/svelte'
import Tree from './Tree.svelte'
import { tree } from './test-data'

describe('Tree component', () => {
  afterEach(() => {
    cleanup()
  })

  test('should render the description for parent and child nodes', () => {
    const { getByText } = render(Tree, {
      props: {
        tree
      }
    })

    expect(getByText('parent 2 it is')).toBeInTheDocument()
    expect(getByText('child 2-1 it is')).toBeInTheDocument()
  })

  test('should render correct no. of children', () => {
    const { container } = render(Tree, {
      props: {
        tree
      }
    })

    const firstElementDiv = container.querySelector('.complete-tree-node')
    expect(firstElementDiv.querySelectorAll('.tree-child').length).toEqual(1)
    expect(container.querySelectorAll('.tree-child').length).toEqual(3)
  })

  test('should assign a class called leaf-node to the nodes with no child', () => {
    const { container } = render(Tree, {
      props: {
        tree
      }
    })

    expect(container.querySelectorAll('.leaf-node').length).toEqual(2)
  })

  test("should add CTO flag to the clicked node's parent and should set it to false when clicked again", async () => {
    const { container } = render(Tree, {
      props: {
        tree
      }
    })

    const chevron = container.querySelector('.chev-right')
    await fireEvent(chevron, new MouseEvent('click', {
      bubbles: true
    }))

    // the parent of this chevron will have CTO set to true
    expect(container.querySelector('.node-desc').CTO).toBeTruthy()
    await fireEvent(chevron, new MouseEvent('click', {
      bubbles: true
    }))
    expect(container.querySelector('.node-desc').CTO).toBeFalsy()
  })

  test('should call the provided callback when leaf node is clicked', async () => {
    const { getByText } = render(Tree, {
      props: {
        tree,
        onSelectCallback: function (key) {
          expect(key).toEqual('child-2-1')
        }
      }
    })
    const chevron = getByText('child 2-1 it is')
    await fireEvent(chevron, new MouseEvent('click', {
      bubbles: true
    }))
  })

  test('should ignore the triggering the callback when node is clicked and callback is not provided', async () => {
    const { getByText } = render(Tree, {
      props: {
        tree
      }
    })
    const chevron = getByText('child 2-1 it is')
    await fireEvent(chevron, new MouseEvent('click', {
      bubbles: true
    }))
    expect(chevron.CTO).toBeFalsy()
  })
})
