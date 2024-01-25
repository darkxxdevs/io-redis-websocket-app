import { Server } from "socket.io"
import Redis from "ioredis"
import prismaClient from "./prisma"


const pub = new Redis({
	host: "",
	port: 0,
	username: "",
	password: ""
})
const sub = new Redis({
	host: "",
	port: 0,
	username: "",
	password: ""
})

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
		sub.subscribe("MESSAGES")
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

		sub.on("message", async (channel, message) => {
			if (channel == "MESSAGES") {
				console.log("Message emitted!.....")
				io.emit("message", message)
				await prismaClient.messages.create({
					data: {
						text: message
					}
				})
			}
		})
	}

	get io(): Server {
		return this._io
	}
}

export default SocketService
