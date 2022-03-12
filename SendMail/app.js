require("dotenv").config();
const sgMail = require('@sendgrid/mail')
const validator = require("validator");

const express = require("express");
const app = express();

app.use(express.json())
app.use(express.static("./public"));


app.post("/send", async(req, res) => {
	try {
		if(!req.body.email)
			return res.status(400).json({ok: false, message: "Email je obavezan"})
		if(!req.body.subject)
			return res.status(400).json({ok: false, message: "Subject je obavezan"})
		if(!req.body.text)
			return res.status(400).json({ok: false, message: "Text je obavezan"})

		if(!validator.isEmail(req.body.email))
			return res.status(400).json({ok: false, message: "Neispravan email"})

		sgMail.setApiKey(process.env.SENDGRID_API_KEY)
		const msg = {
			to: req.body.email, // Change to your recipient
			from: "", // Change to your verified sender
			subject: req.body.subject,
			text: req.body.text
		}
		const info = await sgMail.send(msg);
		console.log(info);
		console.log(req.body);
		res.json({ok: true, info});
	} catch (error) {
		console.error(error);
		res.status(500).json({ok: false, massage: error.massage})
	}
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App running on port ${port}...`))