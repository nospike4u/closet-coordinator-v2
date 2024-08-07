import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/usersModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/auth.js';

export const register = async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(user)
    const createdUser = await user.save();
    console.log(createdUser);

    const token = generateToken(createdUser);
    // res.status(201).json({ token });
    res.status(201).json({ message: 'First time login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const login = asyncHandler(async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  if (!email || !password) {
    return next(new ErrorResponse('invalid input!', 400));
  }

  const data = await User.findOne({ email });
  if (!data || !bcrypt.compareSync(password, data.password)) {
    return next(new ErrorResponse('invalid input!', 400));
  }

  const user = { id: data._id, userName: data.userName, role: data.role };
  const token = generateToken(user);

  res.status(200).json({ success: true, user: {token,userDetails:data} });

  res.status(200).json({ success: true, data: token, user: user });

});

export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(201)
    .json({ success: true, data: { message: `Logout successful` } });
});
