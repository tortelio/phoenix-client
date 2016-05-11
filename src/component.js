export default class Component {
  constructor (props) {
    this.props = props || {}

    var component = this
    this.controller = function () {
      var ctrl = {}
      component.init(ctrl)
      return ctrl
    }
    this.controller.$original = this.init
  }

  init (ctrl) {
  }

  instance () {
    var component = this
    var controller = new this.controller() // eslint-disable-line new-cap
    controller.render = function () {
      return component.view(controller)
    }
    return controller
  }
}
