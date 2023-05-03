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

	type Post {
		id: ID!
		title: String!
		content: String!
		published: Boolean!
		authorId: ID!
		author: User!
	}

	input CreatePostInput {
		title: String!
		content: String!
		published: Boolean!
	}

	type Query {
		me: User
		users: [User!]!
		user(id: ID!): User!
		posts: [Post!]!
		post(id: ID!): Post!
	}

	type Mutation {
		login(username: String!, password: String!): AuthPayload
		signup(username: String!, email: String!, password: String!): AuthPayload
		createPost(input: CreatePostInput!): Post!
	}
`;
