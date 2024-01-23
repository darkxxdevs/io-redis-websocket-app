"use client"
import { useState } from "react"
import { useSocket } from "../hooks/useSocket"
import classes from "./page.module.css"

export default function Page() {
	const { sendMessage, messages } = useSocket()

	const [message, setMessage] = useState("")

	return (
		<div className={classes["chat-container"]}>
			<div className="heading">
				<h1>CHAT INTERFACE </h1>
			</div>
			<div className={classes["msg-div"]}>
				{
					messages.map((message) => (
						<li>{message}</li>
					))
				}
			</div>
			<div className={classes["input-div"]}>
				<input className={classes["chat-input"]}
					onChange={(e) => setMessage(e.target.value)}
					type="text" placeholder="type something..."></input>
				<button
					onClick={() => sendMessage(message)}
					className={classes["button"]}>Send</button>
			</div>
		</div>
	)
}
