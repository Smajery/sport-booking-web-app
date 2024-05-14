import { gql } from "@apollo/client";

export const CREATE_FACILITY_MUTATION = gql`
  mutation CreateFacility($input: CreateFacilityInput!, $photo: Upload) {
    createFacility(createFacilityInput: $input, photo: $photo) {
      facility {
        name
        address
        sportType
        coveringType
        facilityType
        location
        district {
          id
        }
        description
      }
      photo {
        id
      }
    }
  }
`;
