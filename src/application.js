import Phoenix from "./phoenix"

let url = "ws://0.0.0.0:8080/websocket";

var Application = new Phoenix(url),
    ApplicationElement = document.getElementById("application");

m.route.mode = "hash";
m.route(ApplicationElement, "/", {
  "/": Application.index,
  "/users/:userId": Application.users
});
