class Event {
  constructor(name) {
    this.callbacks = []
  }

  registerCallback(callback) {
    this.callbacks.push(callback);
  }

  unregisterCallback(callback) {
    this.callbacks.filter(x => x == callback);
  }
}

export default Event
