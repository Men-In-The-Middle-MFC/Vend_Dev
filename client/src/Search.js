import * as React from 'react'
import TextField from '@mui/material/TextField'
import { Box, Icon } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function Search({ setFilter }) {
	const [input, setInput] = React.useState('')
	const handleChange = (e) => {
		setInput(e.target.value)
		setFilter(e.target.value)
	}
	return (
		<Box
			sx={{
				width: 300,
				borderRadius: 0,
				display: 'flex',
			}}
		>
			<TextField
				label='Search Product'
				fullWidth
				onChange={handleChange}
				value={input}
				sx={{
					backgroundColor: '#e1e5ef',
				}}
			/>
		</Box>
	)
}
