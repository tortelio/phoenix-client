import m from 'mithril'

import Component from '../component'
import Item from './item'

class User extends Component {
  init (ctrl) {
    let props = this.props
    ctrl.session = props.session

    ctrl.items = m.prop([])

    ctrl.session.getUserData()
      .then(function (user) {
        user.items.forEach(function (item) {
          var submit = function (event) {
            item.details.description = this.details.description()
            item.details.done = this.details.done()

            ctrl.session.updateItem(item)
          }

          ctrl.items().push(new Item({
            user: ctrl.session.store.user().id,
            details: item.details,
            button: 'Save',
            submit: submit
          }).instance())
        })

        m.redraw()
      })

    ctrl.newItem = new Item({
      user: ctrl.session.store.user,
      submit: function (event) {
        let details = {
          description: this.details.description(),
          done: this.details.done()
        }

        ctrl.session.addItem(this.user().id, details)
          .then((_) => this.reset())
          .then((_) => m.redraw())
      }
    }).instance()

    ctrl.logout = function () {
      ctrl.session.logout()
      m.route('/login')
    }
  }

  view (ctrl) {
    return [
      ctrl.session.store.user().name,
      m('button', {onclick: ctrl.logout}, 'Log Out'),
      ctrl.newItem.render(),
      ctrl.items().map((item) => item.render())
    ]
  }
}

export default User