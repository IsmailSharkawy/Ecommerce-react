import React from 'react'
import './InfoBar.css'

const InfoBar = ({ room }) => {
	return (
		<div className='infoBar'>
			<div className='leftInnerContainer'>
				<h3>Room:{room}</h3>
			</div>
			<div className='rightInnerContainer'>
				<a href='/'>
					<i className='fas fa-times-circle fa-3x'></i>
				</a>
			</div>
		</div>
	)
}

export default InfoBar
