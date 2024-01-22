"use client"
import { useState } from "react"
import { useSocket } from "../hooks/useSocket"
import classes from "./page.module.css"

export default function Page() {
	const { sendMessage } = useSocket()

	const [message, setMessage] = useState("")

	return (
		<div className={classes["chat-container"]}>
			<div className="heading">
				<h1>Messages will appear here </h1>
			</div>
			<div className={classes["input-div"]}>
				<input className={classes["chat-input"]}
					onChange={(e) => setMessage(e.target.value)}
					type="text" placeholder="type something..."></input>
				<button
					onClick={(e) => sendMessage(message)}
					className={classes["button"]}>Send</button>
			</div>
		</div>
	)
}
