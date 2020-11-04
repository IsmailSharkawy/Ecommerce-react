import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'
import InfoBar from '../components/InfoBar'
import Messages from '../components/Messages'

import './LiveChatScreen.css'
import {
	setUserInChat,
	userEditDetails,
	userUpdateDetails,
} from '../actions/userActions'
import { USER_EDIT_RESET } from '../constants/userConstants'

let socket
const LiveChatScreen = ({ match, history }) => {
	const dispatch = useDispatch()
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userId = match.params.id
	const ENDPOINT = 'localhost:5000'

	useEffect(() => {
		dispatch(
			userEditDetails({
				_id: userInfo._id,
				inChat: true,
				isAdmin: userInfo.isAdmin,
			})
		)
		if (!userInfo) {
			history.push('/login')
		} else {
			socket = io(ENDPOINT)
			console.log(socket)

			socket.emit('join', { name: userInfo.name, room: userId }, () => {
				// if (!userInfo.idAdmin) {
				userInfo.inChat = true
				console.log(userInfo.inChat)
				// }
			})
		}
	}, [ENDPOINT, userId, userInfo])

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			socket.on('message', (message) => {
				setMessages([...messages, message])
			})
			console.log(messages)
		}
	}, [messages, userInfo])
	const sendMessage = (event) => {
		event.preventDefault()

		if (message) {
			socket.emit(
				'sendMessage',
				{ room: userId, name: userInfo.name },
				message,
				() => setMessage('')
			)
		}
	}

	return (
		<div className='outerContainer'>
			<div className='liveContainer'>
				{userInfo && (
					<>
						<InfoBar room={userId} name={userInfo.name} />

						<Messages messages={messages} name={userInfo.name} />
						<form className='form'>
							<input
								className='input'
								type='text'
								placeholder='Type a message...'
								value={message}
								onChange={({ target: { value } }) => setMessage(value)}
								onKeyPress={(event) =>
									event.key === 'Enter' ? sendMessage(event) : null
								}
							/>
							<button className='sendButton' onClick={(e) => sendMessage(e)}>
								Send
							</button>
						</form>
					</>
				)}
			</div>
			{/* <TextContainer users={users}/> */}
		</div>
	)
}

export default LiveChatScreen
