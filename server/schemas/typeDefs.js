const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  type User {
    _id: ID
    username: String
    email: String
    journals: [Journal]
  }

  type Journal {
    _id: ID
    title: String
    category: String
    entries: [Entry]
  }

  type Entry {
    date: String
    legend: Legend
  }

  type Legend {
    color: String
    description: String
  }

  type Auth {
    token: ID
    user: User
  }

  input JournalInput {
    title: String
    category: String
  }

  input EntryInput {
    date: String
    legend: LegendInput
  }

  input LegendInput {
    color: String
    description: String
  }

  type Query {
    me: User
    journals: [Journal]
    journal(_id: ID!): Journal
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addJournal(input: JournalInput): User
    removeJournal(journalId: ID!): User
    addEntry(journalId: ID!, input: EntryInput): Journal
    removeEntry(journalId: ID!, entryId: ID!): Journal
  }
`;

// export the typeDef
module.exports = typeDefs; 