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

  registerUser (userId) {
    let user = this.setUser({id: userId})
    Cookies.setCookie('PhUser', userId)
    return user
  }

  throwError(error) {  throw error; return error }

  signupErrors () { return ['already_registered'] }

  signup (user) {
    return communication.signup(user)
      .then((response) => this.signupErrors().indexOf(response) >= 0 ? this.throwError(response) : this.registerUser(response))
  }

  loginErrors () { return ['not_registered', 'bad_password'] }

  // NOTE this is neccessary cuz of scoping
  login (user) {
    return communication.login(user)
      .then((response) => this.loginErrors().indexOf(response) >= 0 ? this.throwError(response) : this.registerUser(response))
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

  removeItem (itemId) {
    this.store.user().items.delete(itemId)
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
      .then((itemId) => this.setItem(itemId))
  }

  deleteItem (item) {
    return communication.deleteItem(item)
      .then((itemId) => this.removeItem(itemId))
  }
}

export default SessionHandler
