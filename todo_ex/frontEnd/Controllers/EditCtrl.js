class EditCtrl extends Ctrl {
  constructor(router) {
    super()
    this.router = router
  }

  init = async id => {
    this.handleBackTrigger()
    if (id) {
      this.populateUpdateForm(id)
      const btn = document.getElementById('update')
      this.subscribe(btn, 'click', this.update)
    } else {
      const btn1 = document.getElementById('add')
      this.subscribe(btn1, 'click', this.add)
    }
  }

  add = async () => {
    const addResponse = await this.handleAddClick()
    const { id } = addResponse
    console.log(`addResponse: ${addResponse}`)

    this.router.navigate('list')
  }

  update = async () => {
    const updateResponse = await this.handleUpdateClick()
    this.router.navigate('list')
  }

  switch = () => {
    this.router.navigate('list')
  }

  handleBackTrigger = () => {
    const btn = document.getElementById('backTo-list')
    this.subscribe(btn, 'click', this.switch)
  }

  populateUpdateForm = async id => {
    let news = await getWorkshops()
    news.map(itemList => {
      if (itemList.id == id) {
        getElId('id').value = itemList.id
        getElId('title').value = itemList.title
        getElId('startDate').value = itemList.startDate
        getElId('endDate').value = itemList.endDate
        getElId('startTime').value = itemList.startTime
        getElId('endTime').value = itemList.endTime
        getElId('location').value = itemList.location
        getElId('category').value = itemList.category
      }
    })
  }

  handleAddClick = async () => {
    let title = isAlphanumeric(getValueFromInputField('title')) ? getValueFromInputField('title') : 'no title'
    let startDate = getValueFromInputField('startDate')
    let endDate = getValueFromInputField('endDate')
    let startTime = getValueFromInputField('startTime')
    let endTime = getValueFromInputField('endTime')
    let location = isAlphanumeric(getValueFromInputField('location'))
      ? getValueFromInputField('location')
      : 'no location'
    let category = isAlphanumeric(getValueFromInputField('category'))
      ? getValueFromInputField('category')
      : 'no category'

    const addWorkshopResponse = await addWorkshop({
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      category
    })
    if (!addWorkshopResponse) {
      alert('something went wrong!')
    }
    console.log(`addWorkshopResponse: ${JSON.stringify(addWorkshopResponse.news)}`) // error handling
    return addWorkshopResponse.news
  }

  handleUpdateClick = async () => {
    let title = isAlphanumeric(getValueFromInputField('title')) ? getValueFromInputField('title') : 'no title'
    let startDate = getValueFromInputField('startDate')
    let endDate = getValueFromInputField('endDate')
    let startTime = getValueFromInputField('startTime')
    let endTime = getValueFromInputField('endTime')
    let location = isAlphanumeric(getValueFromInputField('location'))
      ? getValueFromInputField('location')
      : 'no location'
    let category = isAlphanumeric(getValueFromInputField('category'))
      ? getValueFromInputField('category')
      : 'no category'

    let id = getValueFromInputField('id')

    const updateWorkshopResponse = await updateWorkshop({
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      category,
      id
    })
    if (!updateWorkshopResponse) {
      alert('something went wrong!')
    }
    console.log(updateWorkshopResponse) // error handling
    return updateWorkshopResponse.news
  }
}
