import m from 'mithril'

import Component from '../component'

class Tack extends Component {
  init (ctrl) {
    let props = this.props

    ctrl.r = props.r ? props.r : 30
    ctrl.width = ctrl.height = props.size ? props.size : 60

    ctrl.cx = ctrl.width * 0.5
    ctrl.cy = ctrl.height * 0.5
  }
  view (ctrl) {
    return m('svg', {width: ctrl.width, height: ctrl.height}, [
      m('circle', {
        cx: ctrl.cx,
        cy: ctrl.cy,
        r: ctrl.r,
        fill:"#f00"
      }),
      m('circle', {
        cx: ctrl.cx - ctrl.r*0.1 + 1,
        cy: ctrl.cy - ctrl.r*0.2 + 1,
        r: ctrl.r*0.75 + 1,
        fill:"#f44"
      }),
      m('circle', {
        cx: ctrl.cx - ctrl.r*0.1,
        cy: ctrl.cy - ctrl.r*0.2,
        r: ctrl.r*0.75,
        fill:"#f22"
      })
    ])
  }
}

export default Tack
