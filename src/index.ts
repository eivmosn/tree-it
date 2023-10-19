type TreeNode = Record<string, any>

interface TreeLitOption {
  target: TreeNode[]
  childrenField?: string | string[]
}

export class Treeit {
  _target: TreeNode[]
  _treeNode: TreeNode[]
  _childrenField: string | string[]
  constructor(option: TreeLitOption) {
    this._target = option.target
    this._childrenField = option.childrenField || 'children'
    this._treeNode = this.recursionTree(option.target)
  }

  /**
   * set value
   * @param field
   * @param value
   * @param insert
   */
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

  /**
   * get flatten tree array
   */
  flat() {
    return this._treeNode
  }

  /**
   * get object form tree
   * @param field
   * @param value
   */
  get(field: string, value: string | number | boolean) {
    return this._treeNode.find(node => node[field] === value)
  }

  recursionTree(tree: TreeNode[], result: TreeNode[] = [], callbackfn?: (node: TreeNode) => void) {
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
