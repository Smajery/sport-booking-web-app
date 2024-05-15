"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import {
  UPDATE_FACILITY_MUTATION,
  UPDATE_FACILITY_PHOTOS_MUTATION,
} from "@/apollo/mutations/private/owner/facility";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { TFacility } from "@/types/private/owner/facilityTypes";
import UpdateFacilityFormContent from "@/components/molecules/private/owner/Contents/UpdateFacilityFormContent/UpdateFacilityFormContent";
import FacilityCardFrame from "@/components/molecules/private/owner/Frames/FacilityCardFrame/FacilityCardFrame";
import _ from "lodash";
import { GET_ONE_FACILITY_QUERY } from "@/apollo/query/private/owner/facility";

type TItem = {
  key: string;
  name: string;
};

const updateFacilityFormSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  sportType: z
    .array(
      z.object({
        key: z.string(),
        name: z.string(),
      }),
    )
    .min(1, "At least 1 sport type"),
  coveringType: z.object({
    key: z.string(),
    name: z.string(),
  }),
  facilityType: z.object({
    key: z.string(),
    name: z.string(),
  }),
  minBookingTime: z.string(),
  // location: z.string(),
  // districtId: z.string(),
  // cityId: z.string(),
  description: z.string().min(1),
  isWorking: z.boolean(),
  photos: z.any().optional(),
});

interface IUpdateFacilityForm {
  facility: TFacility;
}

const UpdateFacilityForm: React.FC<IUpdateFacilityForm> = ({ facility }) => {
  const {
    id,
    name,
    description,
    address,
    // district,
    sportType,
    facilityType,
    coveringType,
    // location,
    images,
  } = facility;

  const [isEditFacility, setIsEditFacility] = React.useState<boolean>(false);

  const [updateFacility, { loading: facilityLoading }] = useMutation(
    UPDATE_FACILITY_MUTATION,
  );
  const [updateFacilityPhotos, { loading: facilityPhotosLoading }] =
    useMutation(UPDATE_FACILITY_PHOTOS_MUTATION);

  const form = useForm<z.infer<typeof updateFacilityFormSchema>>({
    resolver: zodResolver(updateFacilityFormSchema),
    defaultValues: {
      name: name,
      address: address,
      description: description,
      sportType: sportType.map((sport) => ({ key: sport, name: sport })),
      coveringType: { key: coveringType, name: coveringType },
      facilityType: { key: facilityType, name: facilityType },
      // districtId: String(district.id),
      // cityId: String(district.city.id),
      // location: location,
      photos: images,
      minBookingTime: "60", //Temporary solution
      isWorking: false, //Temporary solution
    },
  });

  const onSubmit = async (values: z.infer<typeof updateFacilityFormSchema>) => {
    const transformDictionary = {
      sportType: (value: TItem[]) => value.map((sport) => sport.key),
      coveringType: (value: TItem) => value.key,
      facilityType: (value: TItem) => value.key,
      districtId: (value: string) => Number(value),
    };
    const applyTransformation = (
      key: keyof typeof transformDictionary,
      value: any,
    ) => {
      return transformDictionary[key] ? transformDictionary[key](value) : value;
    };

    const changedValues: { [key: string]: any } = {};

    Object.keys(values).forEach((key: string) => {
      const valuesKey = key as keyof typeof values;
      if (
        form.formState.defaultValues &&
        !_.isEqual(values[valuesKey], form.formState.defaultValues[valuesKey])
      ) {
        changedValues[valuesKey] = applyTransformation(
          valuesKey as keyof typeof transformDictionary,
          values[valuesKey],
        );
      }
    });

    if (Object.keys(changedValues).length !== 0) {
      const { photos, ...otherChangedValues } = changedValues;
      const headers: {
        "Content-Type"?: string;
        "apollo-require-preflight": boolean;
      } = {
        "Content-Type": "multipart/form-data",
        "apollo-require-preflight": true,
      };
      try {
        if (Object.keys(otherChangedValues).length !== 0) {
          await updateFacility({
            context: {
              authRequired: true,
            },
            refetchQueries: [
              {
                query: GET_ONE_FACILITY_QUERY,
                variables: { id: id },
              },
            ],
            variables: {
              input: {
                ...otherChangedValues,
                minBookingTime: 60,
                isWorking: false,
                id: id,
              },
            },
          });
        }
        if (photos.length) {
          await updateFacilityPhotos({
            context: {
              headers: headers,
              authRequired: true,
            },
            refetchQueries: [
              {
                query: GET_ONE_FACILITY_QUERY,
                variables: { id: id },
              },
            ],
            variables: {
              facilityId: id,
              photos: photos,
            },
          });
        }
        handleCancel();
      } catch (e) {
        ErrorHandler.handle(e, {
          componentName: "UpdateFacilityForm__onSubmit",
        });
      }
    }
  };

  const handleCancel = () => {
    setIsEditFacility(false);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col py-5 pl-5 gap-y-5"
        encType="multipart/form-data"
      >
        {isEditFacility ? (
          <UpdateFacilityFormContent form={form} />
        ) : (
          <FacilityCardFrame facility={facility} />
        )}
        <Separator className="mt-5" />
        <div className="flex gap-x-2">
          {isEditFacility ? (
            <>
              <Button
                variant="outlineSecondary"
                size="lg"
                type="button"
                onClick={handleCancel}
                disabled={facilityLoading || facilityPhotosLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                disabled={facilityLoading || facilityPhotosLoading}
              >
                {!facilityLoading && !facilityPhotosLoading
                  ? "Save"
                  : "Loading..."}
              </Button>
            </>
          ) : (
            <Button
              variant="outlineSecondary"
              size="lg"
              type="button"
              onClick={() => setIsEditFacility(true)}
            >
              Edit Facility
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateFacilityForm;
