import * as React from 'react'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/material'

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
			}}
		>
			<TextField
				label='Search Product'
				variant='filled'
				fullWidth
				onChange={handleChange}
				value={input}
			/>
		</Box>
	)
}
