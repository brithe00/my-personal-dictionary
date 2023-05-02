import { AuthenticationError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const hashPassword = (password) => {
	return bcrypt.hash(password, 10);
};

export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

export const createJwt = (user) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET
	);
	return token;
};

export const isAuthenticated = (token) => {
	try {
		if (!token) {
			return null;
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded.id) {
			return null;
		}

		return decoded;
	} catch (error) {
		throw new AuthenticationError('Not authenticated !');
	}
};
