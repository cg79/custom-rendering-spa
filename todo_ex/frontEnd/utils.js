const getElId = id => {
  if (id) {
    return document.getElementById(id)
  }
}

const getElClass = className => {
  if (className) {
    return document.getElementsByClassName(className)
  }
}

const removeDuplicates = list => {
  return [...new Set(list)]
}

const getValueFromInputField = value => {
  if (value) {
    return getElId(value).value
  }
}

const isAlphanumeric = inputText => {
  if (inputText) {
    var letterNumber = /^[\w _\-]*$/
    if (inputText.match(letterNumber)) {
      return true
    } else {
      alert('You have entered forbidden characters :' + inputText)
      return false
    }
  }
  return
}
