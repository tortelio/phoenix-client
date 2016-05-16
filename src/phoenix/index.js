import m from 'mithril'

import Component from '../component'

import Tack from './tack'

class Index extends Component {
  init (ctrl) {
    let props = this.props
    ctrl.session = props.session

    ctrl.user = {name: m.prop(''), password: m.prop('')}
    ctrl.bad_user = m.prop(false)
    ctrl.bad_password = m.prop(false)
    ctrl.login = function (e) {
      ctrl.session.login(ctrl.user)
        .then(function (user) {
          m.route(`/users/${user.id}`)
          return user
        })
        .catch(function (error) {
          if (error === 'not_registered') {
            ctrl.bad_user(true)
          } else if (error === 'bad_password'){
            ctrl.bad_password(true)
          }
          m.redraw()
        })
    }

    ctrl.signupUser = {name: m.prop(''), password: m.prop('')}
    ctrl.signup = function (e) {
      ctrl.session.signup(ctrl.signupUser)
        .then(function (user) {
          m.route(`/users/${user.id}`)
          return user
        })
        .catch(function (error) {
        // TODO password and user errors
        })
    }

    ctrl.tack = new Tack({size: 60}).instance()
  }

  view (ctrl) {
    return m('div.login.full.table', [
      m('div.table-cell.vertical-mid', [
        m('div.login-container.centered.centered-container', [
          m('div.login-header', 'Phoenix'),
          m('div.login-body.sticky', [
            ctrl.tack.render(),
            m('div.form', [
              m('h2', 'Log in'),
              m('div.row', {class: ctrl.bad_user() ? 'error' : ''}, [
                m('label', 'Username'),
                m('input', {
                  type: 'text',
                  value: ctrl.user.name(),
                  onchange: m.withAttr('value', ctrl.user.name),
                }),
                // TODO
                m('div.error-message', 'wrong user')
              ]),
              m('div.row', {class: ctrl.bad_password() ? 'error' : ''}, [
                m('label', 'Password'),
                m('input', {
                  type: 'password',
                  value: ctrl.user.password(),
                  onchange: m.withAttr('value', ctrl.user.password)
                }),
                // TODO
                m('div.error-message', 'wrong password')
              ]),
              m('div.row', [
                m('button.submit', {onclick: ctrl.login}, 'Log in')
              ])
            ])
          ]),
          // TODO check datas
          m('div.login-body.sticky', [
            ctrl.tack.render(),
            m('div.form', [
              m('h2', 'Get a new account'),
              m('div.row', [
                m('label', 'Username'),
                m('input', {
                  type: 'text',
                  value: ctrl.signupUser.name(),
                  onchange: m.withAttr('value', ctrl.signupUser.name)
                  //class: ctrl.bad_user() ? 'error' : ''
                })
              ]),
              m('div.row', [
                m('label', 'Password'),
                m('input', {
                  type: 'password',
                  value: ctrl.signupUser.password(),
                  onchange: m.withAttr('value', ctrl.signupUser.password)
                  //class: ctrl.bad_password() ? 'error' : ''
                })
              ]),
              m('div.row', [
                m('button.submit', {onclick: ctrl.signup}, 'Sign up')
              ])
            ])
          ])
        ])
      ])
    ])
  }
}

export default Index
