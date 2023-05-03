import { AuthenticationError } from 'apollo-server-errors';

export const postResolvers = {
	Query: {
		posts: async (_, __, { prisma }) => {
			return await prisma.post.findMany({
				include: {
					author: true,
				},
			});
		},
		post: async (_, { id }, { prisma }) => {
			return await prisma.post.findUnique({
				where: { id },
				include: {
					author: true,
				},
			});
		},
	},
	Mutation: {
		createPost: async (_, { input }, { prisma, user }) => {
			if (!user) {
				throw new AuthenticationError('You must be logged in !');
			}

			return await prisma.post.create({
				data: { ...input, authorId: user.id },
				include: { author: true },
			});
		},
	},
};
