const db = require("../database")

// GET all users from the database
exports.getAllUsers = (_req, res) => {
	db.all("SELECT * FROM users", [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message })
		} else {
			res.json(rows)
		}
	})
}

// GET one car based on its ID
exports.getOneUserById = (req, res) => {
	const { id } = req.params
	// find the user with this ID,
	db.get("SELECT * FROM users WHERE id = ?", [parseInt(id)], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message })
		} else {
			if (!rows) {
				return res
					.status(404)
					.json({ error: "user not found with this ID: " + id })
			} else {
				return res.status(200).json(rows)
			}
		}
	})
}

// POST create a new user
exports.signUp = (req, res) => {
	const { firstName, lastName } = req.body

	// Lancez la requête pour ajouter des voitures à la base de données.
	db.run(
		"INSERT INTO users (carName,carYear, carImage ) VALUES (?, ?, ?)",
		[carName, carYear, carImage],
		function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
			} else {
				res.status(201).json({ id: this.lastID, carName })
			}
		}
	)
}

exports.updateCarById = (req, res) => {
	const { id } = req.params
	console.log(id)

	// Lancez la requête pour la mise à jour.
	res.status(200).json({ message: "Car updated !" })
}

// DELETE car based on its ID
exports.deleteCarById = (req, res) => {
	const { id } = req.params

	// run the query
	db.run("DELETE FROM cars WHERE id = ?", [id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message })
		} else if (this.changes === 0) {
			// if nothing found
			res.status(404).json({ message: "Car not found" })
		} else {
			// is successful
			res.status(200).json({ message: "Car deleted !" })
		}
	})
}
