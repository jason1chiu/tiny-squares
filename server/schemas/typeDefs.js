const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  me: User
  journals: [Journal]
  journal(_id: ID!): Journal
}

type Mutation {
  addUser: AuthPayload
  login(email: String!, password: String!): AuthPayload
  addJournal(input: JournalInput): User
  removeJournal(journalId: ID!): User
  addEntry(journalId: ID!, input: EntryInput): Journal
  removeEntry(journalId: ID!, entryId: ID!): Journal
}

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

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;