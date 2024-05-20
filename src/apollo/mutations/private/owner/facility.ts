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

export const UPDATE_FACILITY_MUTATION = gql`
  mutation UpdateFacility($input: UpdateFacilityInput!) {
    updateFacility(updateFacilityInput: $input) {
      facility {
        id
        name
        address
        sportType
        coveringType
        facilityType
        description
        isWorking
        minBookingTime
      }
    }
  }
`;

export const UPDATE_FACILITY_PHOTOS_MUTATION = gql`
  mutation UploadFacilityPhotos($facilityId: Float!, $photos: [Upload!]!) {
    uploadFacilityPhotos(facilityId: $facilityId, photos: $photos) {
      id
      image
    }
  }
`;

export const CREATE_SCHEDULE_MUTATION = gql`
  mutation CreateSchedule($createScheduleInput: CreateScheduleInput!) {
    createSchedule(createScheduleInput: $createScheduleInput) {
      dayOfWeek
      endTime
      facilityId
      price
      startTime
    }
  }
`;

export const UPDATE_SCHEDULE_MUTATION = gql`
  mutation UpdateTimeSlots($updateTimeSlotsInput: UpdateTimeSlotsInput!) {
    updateTimeSlots(updateTimeSlotsInput: $updateTimeSlotsInput) {
      id
    }
  }
`;
