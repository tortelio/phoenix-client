import m from 'mithril'

import SessionHandler from './sessionHandler'

import Index from './phoenix/index'
import User from './phoenix/user'

class Phoenix {
  constructor (url, element = document.body) {
    this.session = new SessionHandler(url)
    this.element = element
    this.setupRouting()
  }

  setupRouting () {
    m.route.mode = 'hash'
    m.route(this.element, '/', {
      '/': new Index({session: this.session}),
      '/users/:userId': new User({session: this.session})
    })
  }
}

export default Phoenix
