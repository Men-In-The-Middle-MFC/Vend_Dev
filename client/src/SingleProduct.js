import {
	Box,
	Button,
	Container,
	Stack,
	styled,
	Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
const BookButton = styled(Button)`
	background: #ea7979;
	&:hover {
		background: #f85f5f;
	}
`

const SingleProduct = ({ history, match, user, setUser }) => {
	const [data, setData] = useState()
	const [hide, setHide] = useState(true)
	const [desc, setDesc] = useState()
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
	}, [match.params.id])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const page = await wiki.page(`${data.product.title}`)
				const summary = await page.summary()
				setDesc(data.product.desc + '.\n' + summary.extract)
			} catch (error) {
				setDesc(data.product.desc)
			}
		}
		data && data.product.desc.length < 50 && fetchData()
	}, [data])

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
		<Box>
			{data === undefined ? (
				<h1>Loading...</h1>
			) : (
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						padding: '0 5rem',
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
					></Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							justifySelf: 'center',
							alignSelf: 'center',
							gap: '1rem',
							width: '90%',
							padding: '3rem',
							border: '1px solid silver',
						}}
					>
						<h2 style={{ fontSize: 42 }}>{data.product.title}</h2>
						<h6 style={{ fontSize: 18, marginBottom: -10 }}>
							Price: {data.product.price}
						</h6>
						<p
							style={{ fontSize: 15, color: 'rgba(0,0,0,0.7)' }}
							onMouseEnter={showMail}
							onMouseLeave={hideMail}
						>
							Listed By:{' '}
							{!hide
								? data.product.listedBy.email
								: data.product.listedBy.name}
						</p>
						<p
							style={{
								lineHeight: '1.5rem',
								color: 'rgba(0,0,0,0.9)',
								fontSize: '16px',
							}}
						>
							{/* {data.product.desc}
							 */}
							{desc}
						</p>

						<BookButton onClick={handleBook} variant='contained'>
							Book
						</BookButton>
					</Box>
				</Box>
			)}
		</Box>
	)
}

export default SingleProduct
