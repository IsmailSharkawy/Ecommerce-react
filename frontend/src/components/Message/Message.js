import React from 'react'

import './Message.css'

import ReactEmoji from 'react-emoji'

const Message = ({ message: { text, user }, name }) => {
	let isSentByCurrentUser = false

	if (user === name) {
		isSentByCurrentUser = true
	}

	return isSentByCurrentUser ? (
		<div className='messageContainer justifyEnd'>
			<h6>{name}:</h6>
			<div className='messageBox backgroundBlue'>
				<p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
			</div>
		</div>
	) : (
		<div className='messageContainer justifyStart'>
			<h6>{user}:</h6>
			<div className='messageBox backgroundLight'>
				<p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
			</div>
		</div>
	)
}

export default Message
