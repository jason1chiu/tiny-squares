import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      journals {
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
  }
`;

export const GET_JOURNAL = gql`
  query getJournal($id: ID!) {
    journal(id: $id) {
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

export const GET_JOURNALS = gql`
  query getJournals {
    journals {
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

// export const GET_STATS = gql`
//   query getStats($userId: ID!) {
//     stats(userId: $userId) {
//       category
//       totalEntries
//     }
//   }
// `;