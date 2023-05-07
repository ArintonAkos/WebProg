import User from '../models/user';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log(name, email);
    let user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', showToast: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message, showToast: true });
  }
};
