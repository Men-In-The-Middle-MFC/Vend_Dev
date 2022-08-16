import { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import ListProduct from './ListProduct'
import Nav from './Nav'
import SingleProduct from './SingleProduct'
import UserProducts from './UserProducts'
import axios from 'axios'
import './App.css'
function App() {
	const [isLoggedIn, setLoggedIn] = useState(false)
	const [user, setUser] = useState()
	const [isFetching, setFetching] = useState(false)
	const [filterString, setFilter] = useState('')

	useEffect(() => {
		const fetchUser = async () => {
			setFetching(true)
			// fetch('https://vend-o-vit.herokuapp.com/auth/login/success', {
			// 	method: 'GET',
			// 	credentials: 'include',
			// 	headers: {
			// 		Accept: 'application/xml',
			// 		'Content-Type': 'application/json',
			// 		'Access-Control-Allow-Credentials': true,
			// 	},
			// })
			// 	.then((res) => {
			// 		// if (res.status === 200) return res.json()
			// 		// throw new Error('authentication failed')
			// 		return res.json()
			// 	})
			// 	.then((data) => {
			// 		// setUser(data.user)
			// 		// setLoggedIn(true)
			// 		console.log(data)
			// 	})
			// 	.catch((err) => console.log(err))
			const { data } = await axios.get(
				'http://localhost:5000/auth/login/success',
				{ withCredentials: true }
			)
			setUser(data.user)
			setLoggedIn(true)
		}
		fetchUser()
		setFetching(false)
	}, [])

	const deleteUserItem = (product) => {
		// const updatedLists = user.listedItems.filter((p) => p._id !== product)
		// const updatedUser = { ...user, listedItems: updatedLists }
		// fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
		// 	method: 'PATCH',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ ...updatedUser }),
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		console.log(data)
		// 		setUser(updatedUser)
		// 	})
		// 	.catch((err) => console.log(err))
		fetch(`http://localhost:5000/api/v1/products/${product}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		}).then((res) => (window.location = '/'))
	}

	return isFetching ? (
		<div>Loading...</div>
	) : (
		<div className='App'>
			<Nav isLoggedIn={isLoggedIn} user={user} setFilter={setFilter} />
			<Switch>
				<Route
					exact
					path={`/`}
					render={(routeProps) => (
						<Dashboard
							user={user}
							{...routeProps}
							setUser={setUser}
							filterString={filterString}
						/>
					)}
				/>
				{/* Protected Route */}
				<Route
					exact
					path={`/listProduct`}
					render={(rp) => {
						return isLoggedIn === true ? (
							<ListProduct
								{...rp}
								user={user}
								setUser={setUser}
							/>
						) : (
							<Redirect to={`/`} exact />
						)
					}}
				/>
				{/* Protected Route */}
				<Route
					exact
					path={`/userProducts`}
					render={(rp) =>
						isLoggedIn ? (
							<UserProducts
								{...rp}
								user={user}
								deleteUserItem={deleteUserItem}
							/>
						) : (
							<Redirect to={`/`} exact />
						)
					}
				/>
				<Route
					exact
					path={`/product/:id`}
					render={(rp) => (
						<SingleProduct {...rp} user={user} setUser={setUser} />
					)}
				/>
				<Route render={() => <h1>404</h1>} />
			</Switch>
		</div>
	)
}

export default App
