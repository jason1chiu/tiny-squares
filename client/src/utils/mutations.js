import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String!) {
    updateUser(username: $username) {
      _id
      username
      email
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Logout($email: String!) {
    logout(email: $email) {
      email
    }
  }
`;

export const ADD_JOURNAL = gql`
  mutation addJournal($name: String!, $category: String!) {
    addJournal(name: $name, category: $category) {
      journals {
        _id
        name
        category
      }
    }
  }
`;

export const REMOVE_JOURNAL = gql`
  mutation removeJournal($journalId: ID!) {
    removeJournal(journalId: $journalId) 
  }
`;

export const ADD_ENTRY = gql`
  mutation addEntry($journalId: ID!, $input: EntryInput!) {
    addEntry(journalId: $journalId, input: $input) {
      _id
      name
      entries {
        _id
        note
        date
        legend {
          _id
          label
          color
        }
      }
      legends {
        _id
        label
        color
      }
    }
  }
`;

export const REMOVE_ENTRY = gql`
  mutation removeEntry($journalId: ID!, $entryId: ID!) {
    removeEntry(journalId: $journalId, entryId: $entryId) {
      _id
      name
      entries {
        _id
        description
        date
        status
      }
    }
  }
`;

export const UPDATE_ENTRY = gql`
  mutation updateEntry(
    $journalId: ID!
    $entryId: ID!
    $description: String
    $date: String
    $status: String
  ) {
    updateEntry(
      journalId: $journalId
      entryId: $entryId
      description: $description
      date: $date
      status: $status
    ) {
      _id
      title
      entries {
        _id
        description
        date
        status
      }
    }
  }
`;

export const CREATE_LEGEND = gql`
  mutation createLegend($label: String!, $color: String!, $journalId: ID!) {
    createLegend(label: $label, color: $color, journalId: $journalId) {
      _id
      label
      color
    }
  }
`;

export const UPDATE_LEGEND = gql`
  mutation updateLegend(
    $legendId: ID!
    $label: String!
    $color: String!
    $journalId: ID!
  ) {
    updateLegend(
      legendId: $legendId
      label: $label
      color: $color
      journalId: $journalId
    ) {
      _id
      label
      color
    }
  }
`;

export const DELETE_LEGEND = gql`
  mutation deleteLegend($legendId: ID!, $journalId: ID!) {
    deleteLegend(legendId: $legendId, journalId: $journalId) {
      _id
    }
  }
`;