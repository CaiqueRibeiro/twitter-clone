import { Socket } from 'socket.io'
function listenAllSockets(socket: Socket) {
  socket.emit('new-tweets', {
    userId: 1,
    tweetId: 14,
    message: 'aaaaaaa',
  })
}
export { listenAllSockets }
