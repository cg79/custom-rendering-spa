// class RenderEditFormCtrl {
//   constructor(router) {
//     this.router = router
//   }

//   init = async id => {}

//   destroy = () => {
//     console.log('destroy Form')
//   }

//   // View
//   populateUpdateForm = async id => {
//     let news = await getWorkshops()
//     news.map(itemList => {
//       if (itemList.id === id) {
//         getElId('id').value = itemList.id
//         getElId('title').value = itemList.title
//         getElId('startDate').value = itemList.startDate
//         getElId('endDate').value = itemList.endDate
//         getElId('startTime').value = itemList.startTime
//         getElId('endTime').value = itemList.endTime
//         getElId('location').value = itemList.location
//         getElId('category').value = itemList.category
//       }
//     })
//   }

//   // Events
//   attachDeleteTrigger = id => {
//     assignEv(`${id}btn`, 'click', () => {
//       removeElement(`id${id}`)
//       deleteWorkshop(`${id}`)
//     })
//   }

//   attachEditTrigger = id => {
//     assignEv(`${id}btn2`, 'click', async () => {
//       this.router.navigate('addEdit')
//       await this.populateUpdateForm(`${id}`)
//     })
//   }

//   handleAddClick = async () => {
//     let title = isAlphanumeric(getValueFromInputField('title')) ? getValueFromInputField('title') : 'no title'
//     let startDate = getValueFromInputField('startDate')
//     let endDate = getValueFromInputField('endDate')
//     let startTime = getValueFromInputField('startTime')
//     let endTime = getValueFromInputField('endTime')
//     let location = isAlphanumeric(getValueFromInputField('location'))
//       ? getValueFromInputField('location')
//       : 'no location'
//     let category = isAlphanumeric(getValueFromInputField('category'))
//       ? getValueFromInputField('category')
//       : 'no category'

//     const addWorkshopResponse = await addWorkshop({
//       title,
//       startDate,
//       endDate,
//       startTime,
//       endTime,
//       location,
//       category
//     })
//     console.log(`addWorkshopResponse: ${JSON.stringify(addWorkshopResponse.news)}`) // error handling
//     return addWorkshopResponse.news
//   }

//   handleUpdateClick = async () => {
//     let title = isAlphanumeric(getValueFromInputField('title')) ? getValueFromInputField('title') : 'no title'
//     let startDate = getValueFromInputField('startDate')
//     let endDate = getValueFromInputField('endDate')
//     let startTime = getValueFromInputField('startTime')
//     let endTime = getValueFromInputField('endTime')
//     let location = isAlphanumeric(getValueFromInputField('location'))
//       ? getValueFromInputField('location')
//       : 'no location'
//     let category = isAlphanumeric(getValueFromInputField('category'))
//       ? getValueFromInputField('category')
//       : 'no category'

//     let id = getValueFromInputField('id')

//     const updateWorkshopResponse = await updateWorkshop({
//       title,
//       startDate,
//       endDate,
//       startTime,
//       endTime,
//       location,
//       category,
//       id
//     })

//     console.log(updateWorkshopResponse) // error handling
//     return updateWorkshopResponse.news
//   }
// }
