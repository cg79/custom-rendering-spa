// function subscribe(element, event, cb) {
//   element.addEventListener(event, cb)
//   return element.removeEventListener.bind(this, event, cb)
// }

const textToHtmlText = (text, data) => {
  const props = text.match(/(\{)(.*?)(\})/gi)
  var pName = ''
  props.forEach(p => {
    pName = p.replace('{', '').replace('}', '')
    text = text.replace(p, data[pName])
  })
  return text
}

const insertElement = (parentId, text, data) => {
  const htmlText = textToHtmlText(text, data)
  getElId(parentId).insertAdjacentHTML('beforeEnd', htmlText)

  return this
}

// const replaceElement = (id, parentId, text, data) => {
//   const htmlText = textToHtmlText(text, data)

//   let el = news.map((itemList) => {
//     if (itemList.id === id) {
//       return itemList
//     }
//   })
//   el.parentId.replaceChild(htmlText, el)
// }

const removeElement = id => {
  const htmlElement = getElId(id)
  if (!htmlElement) {
    throw new Error(`no html element for ${id}`)
  }
  htmlElement.parentNode.removeChild(htmlElement)
}

const removeList = element => {
  var element = getElId(element)
  element.parentNode.removeChild(element.children)
}

const assignEv = (id, evName, func) => {
  let htmlElement = null
  const exec = el => func(el, id)
  htmlElement = getElId(id)
  if (!htmlElement) {
    throw new Error(`no html element for ${id}`)
  }
  const eventDestroyer = htmlElement.addEventListener(evName, element => {
    exec(element)
  })
  return eventDestroyer
}

const parentTemplate = `
    <div id="{id}"></div>
  `
