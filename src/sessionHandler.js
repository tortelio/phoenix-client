import Communication from './communication'
import Store from './store'

import Cookies from './cookies'

// 'Static' private member
var communication

class SessionHandler {
  constructor (url = '/ws') {
    communication = new Communication(url)
    this.store = new Store()
  }

  registerUser (user) {
    this.setUser(user)
    Cookies.setCookie('PhUser', user.id)
    return user
  }
  // NOTE this is neccessary cuz of scoping
  login (user) {
    return communication.login(user)
      .then((user) => this.registerUser(user))
  }

  logout () {
    Cookies.eraseCookie('PhUser')
  }

  setUser (user) {
    if (user.id) { this.store.user().id = user.id }
    if (user.name) { this.store.user().name = user.name }
    if (user.items) { user.items.map((item) => this.store.user().items.set(item.id, item)) }

    return user
  }

  setItem (item) {
    this.store.user().items.set(item.id, item)

    return item
  }

  getUserData () {
    let user = {id: Cookies.getCookie('PhUser')}

    return communication.getUserData(user)
      .then((user) => this.setUser(user))
  }

  addItem (userId, details) {
    let item = {id: userId, details: details}
    return communication.addItem(item)
      .then((item) => this.setItem(item))
  }

  updateItem (item) {
    return communication.updateItem(item)
      .then((item) => this.setItem(item))
  }
}

export default SessionHandler
