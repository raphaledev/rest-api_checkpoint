const express = require("express");
require('dotenv').config({ path:'config/.env'})
const mongoose = require("mongoose");
const User = require("./models/User");
const router = express.Router();

const app = express()
app.use(express.json());
app.use('/', router);
app.listen(5000, () => {
    console.log("Server has started!")
})

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true}).then(() => {
        console.log('Database connection successful')})
    .catch(err => {
        console.error(err.message)})

// Get all users
router.get("/users", async (req, res) => {
	const users = await User.find()
	res.send(users)
})

// Get an individual user by his id
router.get("/users/:id", async (req, res) => {
	const user = await User.findOne({ _id: req.params.id })
	res.send(user)
})

// Add a new user
router.post("/users", async (req, res) => {
	const user = new User({
		name: req.body.name,
		age: req.body.age,
        email: req.body.email
	})
	await user.save()
	res.send(user)
})

// Edit a user by id
router.put("/users/:id", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id })

		if (req.body.name) {
			post.name = req.body.name
		}

		if (req.body.age) {
			post.age = req.body.age
		}
        if (req.body.email) {
			post.email = req.body.email
		}
		await user.save()
		res.send(user)
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
})

// Remove a user by id 
router.delete("/users/:id", async (req, res) => {
	try {
		await User.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
})