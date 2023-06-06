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
    removeJournal(journalId: $journalId) {
      _id
      journals {
        _id
        title
      }
    }
  }
`;

export const ADD_ENTRY = gql`
  mutation addEntry( $journalId: ID!, $description: String!, $date: String!, $status: String!) {
    addEntry(
      journalId: $journalId
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

export const REMOVE_ENTRY = gql`
  mutation removeEntry($journalId: ID!, $entryId: ID!) {
    removeEntry(journalId: $journalId, entryId: $entryId) {
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
  mutation CreateLegend($label: String!, $color: String!, $userId: ID!) {
    createLegend(label: $label, color: $color, userId: $userId) {
      id
      label
      color
    }
  }
`;

export const UPDATE_LEGEND = gql`
  mutation UpdateLegend($id: ID!, $label: String!, $color: String!) {
    updateLegend(id: $id, label: $label, color: $color) {
      id
      label
      color
    }
  }
`;

export const DELETE_LEGEND = gql`
  mutation DeleteLegend($id: ID!) {
    deleteLegend(id: $id)
  }
`;


