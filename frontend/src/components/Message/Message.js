import React from 'react'

import './Message.css'

import ReactEmoji from 'react-emoji'

const Message = ({ message: { text, user }, name }) => {
	let isSentByCurrentUser = false

	if (user === name) {
		isSentByCurrentUser = true
	}

	return isSentByCurrentUser ? (
		<>
			<h6 style={{ marginRight: '10px', textAlign: 'right' }}>{name}:</h6>
			<div className='messageContainer justifyEnd'>
				<div className='messageBox backgroundBlue'>
					<p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
				</div>
			</div>
			<br />
		</>
	) : (
		<>
			<h6 style={{ marginLeft: '10px' }}>{user}:</h6>
			<div className='messageContainer justifyStart'>
				<div className='messageBox backgroundLight'>
					<p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
				</div>
			</div>
			<br />
		</>
	)
}

export default Message
