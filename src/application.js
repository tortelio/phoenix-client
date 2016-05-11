import Phoenix from './phoenix'

let url = 'ws://localhost:8888/websocket'
let element = document.getElementById('application')

document.Application = new Phoenix(url, element)
