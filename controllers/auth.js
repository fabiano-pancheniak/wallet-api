const User = require("../models/User")

exports.register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(200).json({ user: { name: user.name }, token })
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new Error('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new Error('Invalid Credentials')
  }
  const token = user.createJWT()
  res.status(201).json({ user: { name: user.name, userID: user.id }, token })
}
