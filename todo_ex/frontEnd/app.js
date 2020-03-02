;(() => {
  const routes = [
    // {
    //   hash: 'addEdit',
    //   name: 'edit-add-form',
    //   ctrl: RenderEditFormCtrl
    // },
    // {
    //   hash: 'list',
    //   name: 'list-form',
    //   templateName: '',
    //   // default: true,
    //   ctrl: RenderListCtrl
    // },
    {
      hash: 'list',
      name: 'list-workshops',
      default: true,
      ctrl: ListCtrl,
      template: listTemplate
    },
    {
      hash: 'edit',
      name: 'edit-workshop',
      ctrl: EditCtrl,
      template: editTemplate
    }
  ]

  const init = () => {
    const root = document.getElementById('root')
    router = new Router(routes, root)
    console.log(routes)
  }

  document.addEventListener('load', init())
})()
