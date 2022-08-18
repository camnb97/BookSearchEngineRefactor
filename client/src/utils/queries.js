// This will hold the query `GET_ME`, which will execute the `me` query set up using Apollo Server.

import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

//should it be book or books
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      book {
        _id
        bookName
        bookAuthor
      }
    }
  }
`;


export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
