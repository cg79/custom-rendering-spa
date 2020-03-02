// class RenderListCtrl {
//   constructor(router) {
//     this.router = router
//   }

//   init = async () => {
//     let news = await getWorkshops()
//     this.renderList(news)
//     this.attachAddWorkshopTrigger()
//     populateDropdown()
//   }

//   destroy = () => {
//     console.log('destroy List')
//   }

//   renderList = news => {
//     insertElement('list-container', parentTemplate, { id: 'a' })
//     news.forEach(newsElement => {
//       if (newsElement.category === resultCategory || resultCategory == 'default') {
//         insertElement('a', itemTemplate, newsElement)
//         this.attachDeleteTrigger(newsElement.id)
//         this.attachEditTrigger(newsElement.id)
//       }
//     })
//   }

//   attachDeleteTrigger = id => {
//     assignEv(`${id}btn`, 'click', () => {
//       removeElement(`id${id}`)
//       deleteWorkshop(id)
//     })
//   }

//   attachEditTrigger = id => {
//     assignEv(`${id}btn2`, 'click', () => {
//       this.router.navigate('addEdit', id)
//     })
//   }
//   attachAddWorkshopTrigger = () => {
//     assignEv('add-workshop', 'click', () => {
//       this.router.navigate('addEdit')
//     })
//   }
// }
// const renderListCtrl = new RenderListCtrl()
