import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      avatar
      cover
      friends {
        _id
        username
        avatar
      }
      premium
      journals {
        _id
        name
        category
        image
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
      }
      notifications {
        id
        content
        type
        read
      }
    }
  }
`;

export const GET_JOURNAL = gql`
  query journal($id: ID!) {
    journal(id: $id) {
      _id
      name
      category
      image
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

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      avatar
      journals {
        entries {
          _id
        }
      }
    }
  }
`;

export const GET_JOURNALS = gql`
  query getJournals {
    journals {
      _id
      name
      category
      image
      updatedAt
      createdAt
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
    }
  }
`;

export const GET_STATS = gql`
  query getStats($userId: ID!) {
    stats(userId: $userId) {
      category
      totalEntries
    }
  }
`;

export const GET_LEGENDS = gql`
  query legends($id: ID!) {
    legends(id: $id) {
      _id
      label
      color
    }
  }
`;
