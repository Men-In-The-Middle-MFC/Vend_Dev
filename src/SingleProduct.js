import { Box, Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SingleProduct = ({ history, match, user, setUser }) => {
	const [data, setData] = useState()
	const [hide, setHide] = useState(true)

	const hideMail = () => {
		setHide(true)
	}

	const showMail = () => {
		setHide(false)
	}

	useEffect(() => {
		axios(`http://localhost:5000/api/v1/products/${match.params.id}`).then(
			(res) => setData(res.data.data)
		)
	}, [])

	const handleBook = () => {
		if (user === undefined) {
			window.open('http://localhost:5000/auth/google', '_self')
		} else {
			if (user.email === data.product.listedBy.email) {
				alert('You listed that product!')
				return
			}
			const interests = user.interests.filter(
				(interest) => interest._id !== data.product._id
			)
			interests.push(data.product)
			fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true,
				},
				body: JSON.stringify({
					interests,
				}),
			})
				.then((res) => res.json())
				.then((data) => setUser(data.data.user))
		}
	}
	return (
		<div>
			{data === undefined ? (
				<h1>Loading...</h1>
			) : (
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: '1.7fr 1fr',
						padding: '0 1rem',
						height: '81vh',
					}}
				>
					<Box
						sx={{
							overflow: 'hidden',
							background: `url(${data.product.img})`,
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
						}}
					>
						{/* <img
							src={data.product.img}
							alt={data.product.title}
							style={{
								// width: '100%',
								objectFit: 'cover',
								objectPosition: 'center',
							}} 
						/>*/}
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							justifySelf: 'center',
							alignSelf: 'center',
							gap: '0.8rem',
							width: '70%',
							padding: '3rem',
							border: '1px solid silver',
						}}
					>
						<h1>{data.product.title}</h1>
						<p>{data.product.desc}</p>
						<p>Price: {data.product.price}</p>
						<p onMouseEnter={showMail} onMouseLeave={hideMail}>
							Listed By:{' '}
							{!hide
								? data.product.listedBy.email
								: data.product.listedBy.name}
						</p>
						<Button onClick={handleBook} variant='contained'>
							Book
						</Button>
					</Box>
				</Box>
			)}
		</div>
	)
}

export default SingleProduct
