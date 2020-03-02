class Router {
  constructor(routes, rootElement) {
    this._routes = routes
    this._root = rootElement
    this._currentCtrl = null
    this._currentRoute = null
    if (routes.length) {
      this.defaultRoute = routes.filter(route => route.default)[0] // de verificat daca [].length > 0
      this.navigate(this.defaultRoute.hash)
      window.addEventListener('hashchange', event => {
        const hash = event.target.location.hash
        let arr = decodeURI(hash).split('')
        arr.shift()
        const curatedHash = arr.join('')
        this.navigate(curatedHash)
      })
    } else {
      alert(`there are no routes available`)
    }
  }

  navigate = (hash, params) => {
    this.transitionToNextPage(hash, params)

    const routeIndex = this._routes.findIndex(r => r.hash === hash)

    if (routeIndex === -1) {
      window.history.replaceState(null, null, '#' + this.defaultRoute.hash)
      // this.showCurrentDiv(this.defaultRoute.name, params)
    } else {
      const route = this._routes[routeIndex]
      window.history.pushState(null, null, '#' + route.hash)
    }
  }

  transitionToNextPage = (hash, params) => {
    // destroy page
    if (this._currentRoute !== null) {
      this.destroyPage(this._currentRoute)
    }

    // init page
    var hashInfo = this._routes.filter(h => {
      return h.hash === hash
    })[0]

    if (hash && hashInfo) {
      this.initPage(hashInfo, params)
    } else {
      console.log("we couldn't find a route with this name" + hash)
    }
  }
  //  explain initPage?
  initPage = (route, params) => {
    const { ctrl, name } = route
    // insert parentElement in #root
    const element = document.createElement('div')
    element.setAttribute('id', route.name)

    // fetch template based on router convention
    element.insertAdjacentHTML('beforeEnd', route.template)

    // insert into parent
    this._root.appendChild(element)

    this._currentRoute = route
    this._currentCtrl = new ctrl(this)
    this._currentCtrl.init(params)
  }

  destroyPage = route => {
    // call destroy function for current controller
    if (this._currentCtrl !== null && this._currentCtrl !== undefined) {
      // clean parent element #root
      this._currentCtrl.destroy()
      this._currentCtrl = null
      delete this._currentCtrl
    }
    // DOM manipulation
    const element = document.getElementById(route.name)
    if (this._root.hasChildNodes) {
      this._root.removeChild(element)
    }
  }
}
