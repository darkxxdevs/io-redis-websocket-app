import { useContext } from "react";
import { SocketContext } from "../context/socketContext";

interface UseSocketDataStructure {
	sendMessage: (message: string) => any
	messages: string[]
}


export const useSocket = (): UseSocketDataStructure => {
	const { sendMessage, messages } = useContext(SocketContext)

	if (!sendMessage && !messages) throw new Error("No is undefined!")

	return {
		sendMessage,
		messages
	}
}

