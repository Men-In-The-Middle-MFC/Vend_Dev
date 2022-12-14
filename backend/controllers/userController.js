const User = require('../models/user')

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find()
		res.status(200).json({
			status: 'success',
			results: users.length,
			data: {
				users: users,
			},
		})
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err.message,
		})
	}
}
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
			.populate('interests')
			.populate('listedItems')
		res.status(200).json({
			status: 'success',
			data: { user: user },
		})
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: 'no such user exists',
		})
	}
}
exports.addUser = async (req, res) => {
	try {
		const newUser = await User.create(req.body)
		res.status(200).json({
			status: 'success',
			data: {
				user: newUser,
			},
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		})
	}
}
exports.updateUser = async (req, res) => {
	try {
		console.log(req.body)
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
			},
			{ new: true }
		)
			.populate('interests')
			.populate('listedItems')
		res.status(200).json({
			status: 'success',
			data: {
				user: updatedUser,
			},
		})
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		})
	}
}
exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)
		res.status(204).json({
			status: 'success',
			data: { user: user },
		})
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		})
	}
}
