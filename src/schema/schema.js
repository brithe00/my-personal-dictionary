import { gql } from 'apollo-server-express';

export const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		password: String!
		email: String!
	}

	type AuthPayload {
		token: String!
		user: User!
	}

	type Query {
		me: User
	}

	type Mutation {
		login(username: String!, password: String!): AuthPayload
		signup(username: String!, email: String!, password: String!): AuthPayload
	}
`;
