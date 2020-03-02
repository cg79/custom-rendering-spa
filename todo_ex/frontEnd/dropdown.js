let resultCategory = 'default'

const populateDropdown = async categoryList => {
  var categoryList = []
  let news = await getWorkshops()
  news.map(newsItem => {
    if (newsItem.category == '') {
      newsItem.category = 'no category'
    }
    categoryList.push(newsItem.category)
    categoryList = removeDuplicates(categoryList)
  })
  for (let index = 0; index < categoryList.length; index++) {
    createOption(categoryList[index])
  }
}

const createOption = arrElement => {
  var x = getElClass('select-css')[0]
  var option = document.createElement('option')
  option.text = arrElement
  x.add(option)
}

const handleDropdownOptionChange = async e => {
  resultCategory = e.target.value
  let news = await getWorkshops()
  removeList('a')
  renderListCtrl.renderList(news)
  return e.target.value
}
const dropdownTitle = getElClass('.dropDown .title')
const dropdownOptions = document.querySelectorAll('.dropDown .option')
dropdownOptions.forEach(option => option.addEventListener('click', handleDropdownOptionSelected))

document.querySelector('.dropDown .title').addEventListener('change', handleDropdownOptionChange)
