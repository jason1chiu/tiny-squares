const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID
  username: String
  email: String
  journals: [Journal]
}

type Journal {
  name: String
  category: String
  entries: [Entry]
  legends: [Legend]
  createdAt: String
  updatedAt: String
}

type Entry {
  date: String
  color: String
}

type Auth {
  token: ID
  user: User
}

type Query {
  me: User
  journals: [Journal]
  journal(_id: ID!): Journal
}

type Legend {
  name: String
  color: String
}

input JournalInput {
  name: String
  category: String
}

input EntryInput {
  date: String
  color: String
}

type PayLoad {
  token: String
  user: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(user: String!, email: String!, password: String!): Auth
  purchaseProduct: PayLoad
  addJournal(input: JournalInput): User
  removeJournal(journalId: ID!): User
  addEntry(journalId: ID!, input: EntryInput): Journal
  removeEntry(journalId: ID!, entryId: ID!): Journal
}

`;

// export the typeDefs
module.exports = typeDefs;