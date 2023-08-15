const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    avatar: String
    cover: String
    journals: [Journal]
    premium: Boolean
    currentStripeSessionId: String
  }

  type Journal {
    _id: ID
    name: String
    category: String
    image: String
    entries: [Entry]
    legends: [Legend]
    createdAt: String
    updatedAt: String
  }

  type Legend {
    _id: ID
    label: String
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
    journal(id: ID!): Journal
    legends(id: ID!): [Legend]
  }

  input JournalInput {
    name: String
    category: String
    image: String
  }

  input EntryInput {
    date: String
    legendId: ID
    note: String
  }

  type PayLoad {
    token: String
    user: User
  }

  type Mutation {
    updateUserPremiumStatus(userId: ID!, premium: Boolean!): User
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, avatar: String!, cover: String!): User
    logout(email: String!): User
    createLegend(journalId: ID!, label: String!, color: String!): [Legend]
    updateLegend(journalId: ID!, label: String!, color: String!, legendId: ID!): Legend
    deleteLegend(journalId: ID!, legendId: ID!): Journal
    purchaseProduct: PayLoad
    addJournal(name: String!, category: String!, image: String!): User
    removeJournal(journalId: ID!): String!
    addEntry(journalId: ID!, input: EntryInput): Journal
    removeEntry(journalId: ID!, entryId: ID!): Journal
  }
`;

// export the typeDefs
module.exports = typeDefs;
