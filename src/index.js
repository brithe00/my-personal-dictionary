import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { typeDefs } from './schema/schema.js';
import { userResolvers } from './resolvers/user.js';
import { prisma } from './config/db.js';
import { isAuthenticated } from './utils/auth.js';

const server = new ApolloServer({
	typeDefs,
	resolvers: userResolvers,
	context: ({ req }) => {
		const token = req.headers.authorization || '';
		const user = isAuthenticated(token);
		return {
			user,
			prisma,
		};
	},
});

const app = express();

const start = async () => {
	await server.start();
	server.applyMiddleware({ app });
};

start();

app.listen({ port: 8000 }, () =>
	console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`)
);
