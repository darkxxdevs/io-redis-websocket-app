import { Server } from "socket.io"
import Redis from "ioredis"

const pub = new Redis({
	host: 'redis-1bb8d00-some-project.a.aivencloud.com',
	port: 20759,
	username: 'default',
	password: 'AVNS_NWEtZ58J-UL_D6LK6A5'
})
const sub = new Redis(

)

class SocketService {
	private _io: Server
	constructor() {
		console.log("initlializing socket server ....")
		this._io = new Server(
			{
				cors: {
					allowedHeaders: ['*'],
					origin: '*'
				}
			}
		)
	}

	public initListeners() {
		const io = this.io
		console.log("initlializing socket listeners....")
		io.on("connect", (socket) => {
			console.log("New socket connected !", socket.id)

			socket.on("event:message", async ({ message }: { message: string }) => {
				console.log("New message recived", message)
				await pub.publish("MESSAGES", JSON.stringify({ message }))
			})

			socket.on("disconnect", async () => {
				console.log("Socket disconnected!")
			})
		})

		sub.on("message", (channel, message) => {
			if (channel == "MESSAGES") {
				io.emit("message", message)
			}
		})
	}

	get io(): Server {
		return this._io
	}
}

export default SocketService
