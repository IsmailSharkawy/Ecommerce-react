import React from 'react'
import './InfoBar.css'

const InfoBar = ({ room }) => {
	return (
		<div className='infoBar'>
			<div className='leftInnerContainer'>
				<h6>Room:{room}</h6>
			</div>
			<div className='rightInnerContainer'>
				<a href='/'>
					<i className='fas fa-times-circle fa-2x'></i>
				</a>
			</div>
		</div>
	)
}

export default InfoBar
