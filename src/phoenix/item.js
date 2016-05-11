import m from 'mithril'

import Component from '../component'

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
  }

  view (ctrl) {
    return m('div.item', [
      // Text of item
      m('input', {
        type: 'text',
        value: ctrl.details.description(),
        onchange: m.withAttr('value', ctrl.details.description)
      }),
      // Done
      m('input', {
        type: 'checkbox',
        value: ctrl.details.done(),
        onchange: m.withAttr('value', ctrl.details.done)
      }),
      // Action button
      m('button', {
        onclick: ctrl.submit.bind(ctrl),
        type: 'submit'
      }, ctrl.button)
    ])
  }
}

export default Item
