import { AuthenticationError } from 'apollo-server-errors';
import { comparePasswords, createJwt, hashPassword } from '../utils/auth.js';

export const userResolvers = {
	Query: {
		me: async (_, __, { prisma, user }) => {
			if (!user) {
				throw new AuthenticationError('You must be logged in !');
			}

			try {
				const userData = await prisma.user.findUnique({
					where: {
						id: user.id,
					},
				});

				return userData;
			} catch (error) {
				throw new Error('Unable to retrieve user data');
			}
		},
		users: async (_, __, { prisma }) => {
			return await prisma.user.findMany({});
		},
		user: async (_, { id }, { prisma }) => {
			return await prisma.user.findUnique({
				where: { id },
			});
		},
	},
	Mutation: {
		signup: async (_, { username, email, password }, { prisma }) => {
			const hashedPassword = await hashPassword(password, 10);

			const user = await prisma.user.create({
				data: {
					username,
					email,
					password: hashedPassword,
				},
			});

			const token = createJwt(user);

			return {
				token,
				user,
			};
		},
		login: async (_, { username, password }, { prisma }) => {
			const user = await prisma.user.findUnique({
				where: { username },
			});

			if (!user) {
				throw new Error('Invalid username or password !');
			}

			const validPassword = await comparePasswords(password, user.password);

			if (!validPassword) {
				throw new Error('Invalid username or password !');
			}

			const token = createJwt(user);

			return {
				token,
				user,
			};
		},
	},
};
