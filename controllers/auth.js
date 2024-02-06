const User = require("../models/User")

exports.register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(200).json({ user: { name: user.name }, token })
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = user.createJWT();
  
  res.status(201).json({ user: { name: user.name, userID: user.id }, token });
};

