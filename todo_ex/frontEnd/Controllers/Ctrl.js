class Ctrl {
  constructor() {
    this.events = []
  }
  unsubscribe = () => {
    this.events.forEach(el => {
      const { element, event, callback } = el
      element.removeEventListener(event, callback)
    })
  }
  subscribe = (el, ev, cb) => {
    el.addEventListener(ev, cb)
    this.events.push({ element: el, event: ev, callback: cb })
  }

  destroy = () => {
    console.log('Destroy %o', this)
    this.unsubscribe()
  }

  textToHtmlText = (text, data) => {
    const props = text.match(/(\{)(.*?)(\})/gi)
    var pName = ''
    props.forEach(p => {
      pName = p.replace('{', '').replace('}', '')
      text = text.replace(p, data[pName])
    })
    return text
  }

  insertElement = (parentId, text, data) => {
    const htmlText = textToHtmlText(text, data)
    return document.getElementById(parentId).insertAdjacentHTML('beforeEnd', htmlText)
  }

  removeElement = id => {
    const htmlElement = getElId(id)
    if (!htmlElement) {
      throw new Error(`no html element for ${id}`)
    }
    htmlElement.parentNode.removeChild(htmlElement)
  }

  emptyElement = id => {
    const htmlElement = getElId(id)
    if (!htmlElement) {
      throw new Error(`no html element for ${id}`)
    }
    const children = Array.prototype.slice.call(htmlElement.children)
    children.forEach(child => {
      htmlElement.removeChild(child)
    })
  }
}
