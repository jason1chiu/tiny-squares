const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    journals: [Journal]
  }

  type Journal {
    _id: ID
    name: String
    category: String
    entries: [Entry]
    legends: [Legend]
    createdAt: String
    updatedAt: String
  }

  type Legend {
    name: String
    color: String
  }

  type Entry {
    _id: ID
    date: String
    note: String
    legend: Legend
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
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!): User
    logout(email: String!): User
    addLegend(id: ID!, name: String!, color: String!): Journal
    updateLegend(id: ID!, name: String!, color: String!): Journal
    removeLegend(id: ID!, legendId: ID!): Journal
    purchaseProduct: PayLoad
    addJournal(name: String!, category: String!): User
    removeJournal(journalId: ID!): User
    addEntry(journalId: ID!, input: EntryInput): Journal
    removeEntry(journalId: ID!, entryId: ID!): Journal
  }
`;

// export the typeDefs
module.exports = typeDefs;
