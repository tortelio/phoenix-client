
class User{
  constructor(name = m.prop("")) {
    this.name = name;
  }
}

let Index = {
  init(wsh) {
    this.wsh = wsh;
  }
};

Index.controller = function() {
  let user = new User();
  return {
    user,
    login(e) {
      console.log(user.name());
    }
  };
};

Index.view = function(ctrl) {
  return [
    m("input", {value: ctrl.user.name(), onchange: m.withAttr("value", ctrl.user.name)}),
    m("button", {onclick: e => ctrl.login(e)}, "Log in")
  ];
};

export default Index
