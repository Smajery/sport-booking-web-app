import { gql } from "@apollo/client";

export const GET_ALL_CITIES_QUERY = gql`
  query {
    findAllCities {
      id
      name
    }
  }
`;

export const GET_ALL_CITY_DISTRICTS_QUERY = gql`
  query findAllDistricts($cityId: Float!) {
    findAllDistricts(cityId: $cityId) {
      id
      name
    }
  }
`;
