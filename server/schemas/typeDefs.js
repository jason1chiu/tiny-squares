const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    journals: [Journal]
    legends: [Legend]
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
    legends(userId: ID!): [Legend]
  }

  type Legend {
    id: ID!
    label: String
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
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!): User
    logout(email: String!): User
    purchaseProduct: PayLoad
    addJournal(name: String!, category: String!): User
    removeJournal(journalId: ID!): String!
    addEntry(journalId: ID!, input: EntryInput): Journal
    removeEntry(journalId: ID!, entryId: ID!): Journal
    createLegend(label: String!, color: String!, userId: ID!): Legend!
    updateLegend(id: ID!, label: String!, color: String!): Legend!
    deleteLegend(id: ID!): String!
  }
`;

// export the typeDefs
module.exports = typeDefs;
