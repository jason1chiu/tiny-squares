import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      journals {
        _id
        name
        category
        entries {
          _id
          note
          date
          legend {
            name
            color
          }
        }
      }
    }
  }
`;

export const GET_JOURNAL = gql`
  query getJournal($id: ID!) {
    journal(id: $id) {
      _id
      name
      entries {
        _id
        note
        date
        legend {
          name
          color
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
      entries {
        _id
        note
        date
        legend {
          name
          color
        }
      }
    }
  }
`;

export const GET_JOURNALS_DASHBOARD = gql`
  query getJournals {
    journals {
      _id
      name
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
