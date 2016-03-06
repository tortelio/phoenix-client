import WebSocketHandler from "./webSocketHandler"
import Index from "./phoenix/index"

class Phoenix {
  constructor(url) {
    this.wsh = new WebSocketHandler(url);
    this.index = Index.init();
  }
}

export default Phoenix
