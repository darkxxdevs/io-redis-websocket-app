"use client"
import React, { useState, useCallback, useEffect } from "react"
import { createContext } from "react"
import { io, Socket } from "socket.io-client"

interface SocketProviderProps {
	children?: React.ReactNode
}

interface SocketContextStructure {
	sendMessage: (message: string) => any;
}

export const SocketContext = createContext<SocketContextStructure | null>(null)


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket>()

	const sendMessage: SocketContextStructure["sendMessage"] = useCallback((message) => {
		console.log(message)

		if (socket) {
			socket.emit("event:message", { message: message })
		}
	}, [socket])

	useEffect(() => {
		const _socket = io("http://localhost:8000")

		_socket.on("connect_error", (error) => {
			console.error("Connection error", error)
		})

		setSocket(_socket)

		return () => {
			_socket.disconnect()
			setSocket(undefined)
		}
	}, [])
	return (
		<SocketContext.Provider value={{ sendMessage }}>
			{children}
		</SocketContext.Provider>
	)
}
