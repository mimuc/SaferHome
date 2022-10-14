/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDashboard = /* GraphQL */ `
  query GetDashboard($id: ID!) {
    getDashboard(id: $id) {
      id
      userId
      row
      column
      boards {
        width
        height
        slots {
          type
        }
      }
      name
      createdAt
      updatedAt
    }
  }
`;
export const listDashboards = /* GraphQL */ `
  query ListDashboards(
    $filter: ModelDashboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDashboards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        row
        column
        boards {
          width
          height
        }
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
