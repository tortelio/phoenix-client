import m from 'mithril'

import Component from '../component'

class Index extends Component {
  init (ctrl) {
    let props = this.props
    ctrl.session = props.session

    ctrl.user = {name: m.prop('')}
    ctrl.login = function (e) {
      ctrl.session.login(ctrl.user)
        .then((user) => m.route(`/users/${user.id}`))
    }
  }

  view (ctrl) {
    return [
      m('input', {value: ctrl.user.name(), onchange: m.withAttr('value', ctrl.user.name)}),
      m('button', {onclick: ctrl.login}, 'Log in')
    ]
  }
}

export default Index
