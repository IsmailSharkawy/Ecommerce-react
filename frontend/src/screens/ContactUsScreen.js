import React from 'react'
import { useSelector } from 'react-redux'
import Faq from 'react-faq-component'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const ContactUsScreen = () => {
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const data = {
		title: 'FAQ (How it works)',
		rows: [
			{
				title:
					'Can I ever possibly get any sort of refund whatsoever for any kind of reason at all?',
				content: 'No.',
			},
			{
				title:
					'If I were to politely ask for a refund, would it be considered since I very urgently need the money to feed my children',
				content:
					'No, but you could get a job for the next 9 months and try again. Welcome.',
			},
			{
				title: 'Curabitur laoreet, mauris vel blandit fringilla',
				content:
					'Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc',
			},
			{
				title: 'What is the package version',
				content: 'v1.0.5',
			},
		],
	}
	return (
		<>
			<div style={{ margin: '20px 0' }}>
				<Faq data={data} />
			</div>
			<h1>didnt answer your question?</h1>
			<LinkContainer to={`/livesupport/${userInfo._id}`}>
				<Button variant='outline-info'>
					<i className='fas fa-headset'></i>
					{'     '}
					<strong style={{ fontSize: '15px' }}>Live Support</strong>
				</Button>
			</LinkContainer>
		</>
	)
}

export default ContactUsScreen
