import m from 'mithril'

class Store {
  constructor () {
    this.user = m.prop({id: '', name: '', items: new Map()})
  }
}

export default Store
