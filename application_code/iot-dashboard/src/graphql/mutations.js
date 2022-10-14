/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDashboard = /* GraphQL */ `
  mutation CreateDashboard(
    $input: CreateDashboardInput!
    $condition: ModelDashboardConditionInput
  ) {
    createDashboard(input: $input, condition: $condition) {
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
export const updateDashboard = /* GraphQL */ `
  mutation UpdateDashboard(
    $input: UpdateDashboardInput!
    $condition: ModelDashboardConditionInput
  ) {
    updateDashboard(input: $input, condition: $condition) {
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
export const deleteDashboard = /* GraphQL */ `
  mutation DeleteDashboard(
    $input: DeleteDashboardInput!
    $condition: ModelDashboardConditionInput
  ) {
    deleteDashboard(input: $input, condition: $condition) {
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
