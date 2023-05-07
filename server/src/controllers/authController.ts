import User from '../models/user';

export const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long', showToast: true });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match', showToast: true });
  }

  try {
    let user = await User.findOne({ email });

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
