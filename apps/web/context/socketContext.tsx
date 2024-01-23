"use client"
import React, { useState, useCallback, useEffect } from "react"
import { createContext } from "react"
import { io, Socket } from "socket.io-client"

interface SocketProviderProps {
	children?: React.ReactNode
}

interface SocketContextStructure {
	sendMessage: (message: string) => any;
	messages: string[]
}

export const SocketContext = createContext<SocketContextStructure | null>(null)


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket>()
	const [messages, setMessages] = useState<string[]>([])

	const sendMessage: SocketContextStructure["sendMessage"] = useCallback((message) => {
		if (socket) {
			socket.emit("event:message", { message: message })
		}
	}, [socket])

	const onMessageRec = useCallback((msg: string) => {
		const { message } = JSON.parse(msg) as { message: string }
		setMessages((prev) => [...prev, message])
	}, [])


	useEffect(() => {
		const _socket = io("http://localhost:8000")

		_socket.on("message", onMessageRec)

		_socket.on("connect_error", (error) => {
			console.error("Connection error", error)

		})

		setSocket(_socket)

		return () => {
			_socket.off("message", onMessageRec)
			_socket.disconnect()
			setSocket(undefined)
		}
	}, [])
	return (
		<SocketContext.Provider value={{ sendMessage, messages }}>
			{children}
		</SocketContext.Provider>
	)
}

