/* eslint-disable */
export const getScrollParent = (node: Element) => {
  const regex = /(auto|scroll)/
  const parents: (_node: Node | null, ps: Node[]) => any = (
    _node: Node | null,
    ps: Node[]
  ) => {
    if (!_node || _node.parentNode === null) {
      return ps
    }
    return parents(_node.parentNode, ps.concat([_node]))
  }

  const style = (_node: Element, prop: string) =>
    getComputedStyle(_node, null).getPropertyValue(prop)
  const overflow = (_node: Element) =>
    style(_node, 'overflow') +
    style(_node, 'overflow-y') +
    style(_node, 'overflow-x')
  const scroll = (_node: Element) => regex.test(overflow(_node))

  const scrollParent = (_node: Element) => {
    if (!(_node instanceof HTMLElement || _node instanceof SVGElement)) {
      return
    }

    const ps = parents(_node.parentNode, [])
    for (let i = 0; i < ps.length; i += 1) {
      if (scroll(ps[i])) {
        return ps[i]
      }
    }
    return document.scrollingElement || document.documentElement
  }

  return scrollParent(node)
}
/* eslint-enable */
