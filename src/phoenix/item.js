import m from 'mithril'

import Component from '../component'
import Tack from './tack'

class Item extends Component {
  init (ctrl) {
    let props = this.props

    // necessary because of redrawing on upper level
    ctrl.reset = function () {
      ctrl.details = {description: m.prop(''), done: m.prop(false)}
    }
    ctrl.reset()

    // model
    ctrl.user = props.user

    // view properties
    ctrl.button = props.button || 'OK'
    ctrl.submit = props.submit

    if (props.details) {
      ctrl.details.description(props.details.description)
      ctrl.details.done(props.details.done)
    }

    ctrl.delete = props.delete
    ctrl.tack = new Tack({size: 40, r: 20}).instance()
  }

  view (ctrl) {
    let x = ctrl.delete ? m('span', {onclick: ctrl.delete.bind(ctrl)},'x') : []
    return m('div.item.sticky', [
      m('div.row.right.x', x),
      m('div.row.centered', ctrl.tack.render()),
      // Text of item
      m('div.row', [
        m('input', {
          type: 'text',
          value: ctrl.details.description(),
          onchange: m.withAttr('value', ctrl.details.description)
        })
      ]),

      // Done
      m('div.row', [
        m('label', 'ready'),
        m('input', {
          type: 'checkbox',
          value: ctrl.details.done(),
          onchange: m.withAttr('value', ctrl.details.done)
        })
      ]),
      // Action button
      m('button', {
        onclick: ctrl.submit.bind(ctrl),
        type: 'submit'
      }, ctrl.button)
    ])
  }
}

export default Item
