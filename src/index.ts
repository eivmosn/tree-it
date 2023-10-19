type TreeitNode = Record<string, any>

interface TreeitOption {
  target: TreeitNode[]
  childrenField?: string | string[]
}

export class Treeit {
  _target: TreeitNode[]
  _treeNode: TreeitNode[]
  _childrenField: string | string[]
  constructor(option: TreeitOption) {
    this._target = option.target
    this._childrenField = option.childrenField || 'children'
    this._treeNode = this.recursionTree(option.target)
  }

  set(field: string, value: string | number | boolean, insert = false) {
    const cloneTraget = [...this._target]
    this.recursionTree(cloneTraget, [], (node) => {
      if (insert) {
        node[field] = value
      }
      else {
        if (node[field])
          node[field] = value
      }
    })
    return cloneTraget
  }

  flat() {
    return this._treeNode
  }

  get(field: string, value: string | number | boolean) {
    return this._treeNode.find(node => node[field] === value)
  }

  recursionTree(tree: TreeitNode[], result: TreeitNode[] = [], callbackfn?: (node: TreeitNode) => void) {
    for (const node of tree) {
      callbackfn && callbackfn(node)
      result.push(node)
      if (typeof this._childrenField === 'string') {
        if (node[this._childrenField])
          this.recursionTree(node[this._childrenField], result)
      }
      else {
        this._childrenField.forEach((field) => {
          if (node[field])
            this.recursionTree(node[field], result)
        })
      }
    }
    return result
  }
}
