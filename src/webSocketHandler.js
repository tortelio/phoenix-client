import Event from "./event"

class WebSocketHandler {
  constructor(hostname) {
    this.ready = false;
    this.ws = new WebSocket(hostname);
    this.ws.addEventListener("open", event => this.onopen);
  }

  onopen() {
    this.events = [];
    this.ws.addEventListener("message",  event => this.onmessage);
    this.ready = true;
  }

  send(data) {
    let serializedData = JSON.stringify(data);
    this.ws.send(serializedData);
  }

  registerEvent(event) {
    this.events[event] = new Event(event);
  }

  addEventListener(event, callback) {
    if(! this.events.hasOwnProperty(event)) { this.registerEvent(event); }
    this.events[event].registerCallback(callback);
  }

  removeEventListener(event, callback) {
    if(this.events.hasOwnProperty(event)) {
      let index = this.events[event].callbacks.indexOf(callback);
      if(index == -1) {
        console.error(`Tried to remove an unregistered callback function`);
      } else {
        if(this.events[event].callbacks.length == 1) {
          delete this.events[event];
        } else {
          this.events[event].callbacks[index] = this.events[event].callbacks.pop();
        }
      }
    }
  }

  onmessage(event) {
    let data = JSON.parse(e.data);
    this.dispatchEvent(date.type, data);
  }

  dispatchEvent(event, state) {
    if(this.events.hasOwnProperty(event)) {
      this.events[event].callbacks.map(callback => callback(state));
    } else {
      console.error(`${event} is not registered.`);
    }
  }
}

export default WebSocketHandler;
