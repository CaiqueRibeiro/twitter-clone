import { server } from './http'

import './websocket'

const port: number = Number(process.env.PORT) || 3333

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
