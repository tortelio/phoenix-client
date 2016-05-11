import WebSocketHandler from './webSocketHandler'

class Communication {
  encode (type, value) {
    return {type: type, value: value}
  }

  decode (obj) {
    return obj.value
  }

  reqAndRes (type, data) {
    return this.wsh.sendForResponse(this.encode(type, data))
      .then((res) => this.decode(res))
  }

  // TODO
  req (type, data) {
    return this.wsh.send(this.encode(type, data))
  }

  constructor (url) {
    this.wsh = new WebSocketHandler(url)
  }

  login (user) {
    return this.reqAndRes('login', user)
  }

  getUserData (user) {
    return this.reqAndRes('get_user_data', user)
  }

  addItem (item) {
    return this.reqAndRes('add_item', item)
  }

  updateItem (item) {
    return this.reqAndRes('update_item', item)
  }
}

export default Communication
