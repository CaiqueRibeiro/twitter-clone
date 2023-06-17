import { io } from './http'
import { listenAllSockets } from './websocket/listeners'

io.on('connection', socket => {
  console.log(`A user connected at ${new Date().toISOString()}\n
    connected: ${socket.connected},
    origin: ${socket.handshake.headers.origin},
  `)
  listenAllSockets(socket)
  socket.on('disconnect', () => {
    console.log(`A user disconnected at ${new Date().toISOString()}\n
    connected: ${socket.connected},
    origin: ${socket.handshake.headers.origin},
    `)
  })
})
