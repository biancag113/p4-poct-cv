/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTests = /* GraphQL */ `
  query GetTests($id: ID!) {
    getTests(id: $id) {
      id
      name
      description
      image
      created
      createdAt
      updatedAt
    }
  }
`;
export const listTestss = /* GraphQL */ `
  query ListTestss(
    $filter: ModelTestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        created
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
