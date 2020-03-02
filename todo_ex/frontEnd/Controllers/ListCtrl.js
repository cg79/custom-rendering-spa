class ListCtrl extends Ctrl {
  constructor(router) {
    super()
    this.router = router
    this.resultCategory = 'default'
    // this.dropdownTitle = dropdownTitle
    // this.dropdownOptions = dropdownOptions
  }
  itemTemplate = `
          <div class="{id}" id="id{id}">
                    <label>{id}</label>
                    <label>{title}</label>
                    <label>{category}</label>
                    <button id="{id}btn2" hash="#div3" class='edit-button'> edit</button>
            <button id="{id}btn" class='delete-button'> delete</button>
                </div>
            `

  init = async () => {
    const btn = document.getElementById('add-workshop')
    this.subscribe(btn, 'click', this.handleAddWorkshop)
    let news = await getWorkshops()
    this.renderList(news)
    this.populateDropdown()
  }

  renderList = news => {
    this.emptyElement('list-container')
    news.forEach(newsElement => {
      // if (newsElement.category === this.resultCategory || this.resultCategory == 'default') {
      this.insertElement('list-container', this.itemTemplate, newsElement)
      this.handleDeleteTrigger(newsElement.id)
      this.handleEditTrigger(newsElement.id)
      // }
    })
  }

  handleAddWorkshop = () => {
    this.router.navigate('edit')
  }

  handleDeleteTrigger = id => {
    const btn = document.getElementById(`${id}btn`)
    this.subscribe(btn, 'click', () => {
      this.removeElement(`id${id}`)
      deleteWorkshop(id)
    })
  }

  handleEditTrigger = id => {
    const btn = document.getElementById(`${id}btn2`)
    this.subscribe(btn, 'click', () => {
      this.router.navigate('edit', id)
    })
  }

  populateDropdown = async categoryList => {
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
      this.createOption(categoryList[index])
    }
    const btn = document.querySelector('.dropDown .title')
    this.subscribe(btn, 'change', this.handleDropdownOptionChange)
  }

  createOption = arrElement => {
    var x = getElClass('select-css')[0]
    var option = document.createElement('option')
    option.text = arrElement
    x.add(option)
  }

  handleDropdownOptionChange = async e => {
    this.resultCategory = e.target.value
    let news = await getWorkshops()
    // filter news by resultCategory
    let filteredNews = news.filter(n => n.category === this.resultCategory || this.resultCategory === 'default')
    this.renderList(filteredNews)
    return e.target.value
  }
  // dropdownTitle = document.querySelector('.dropDown .title')
  // dropdownOptions = document.querySelectorAll('.dropDown .option')

  // dropdownOptions.forEach(option => option.addEventListener('click', handleDropdownOptionSelected))

  // document.querySelector('.dropDown .title').addEventListener('change', handleDropdownOptionChange))
}
