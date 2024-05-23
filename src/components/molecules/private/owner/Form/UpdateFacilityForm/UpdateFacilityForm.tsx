"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ApolloError, useMutation } from "@apollo/client";
import {
  DELETE_FACILITY_MUTATION,
  UPDATE_FACILITY_MUTATION,
  UPDATE_FACILITY_PHOTOS_MUTATION,
} from "@/apollo/mutations/private/owner/facility";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { TFacility } from "@/types/private/owner/facilityTypes";
import UpdateFacilityFormContent from "@/components/molecules/private/owner/Contents/UpdateFacilityFormContent/UpdateFacilityFormContent";
import FacilityCardFrame from "@/components/molecules/private/owner/Frames/FacilityCardFrame/FacilityCardFrame";
import _ from "lodash";
import ApproveActionCard from "@/components/atoms/private/user/Cards/ApproveActionCard/ApproveActionCard";
import ShowErrorModal from "@/components/molecules/public/Modals/ShowErrorModal/ShowErrorModal";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";

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
    .min(1, "At least one sport type"),
  coveringType: z.object({
    key: z.string(),
    name: z.string(),
  }),
  facilityType: z.object({
    key: z.string(),
    name: z.string(),
  }),
  minBookingTime: z.string().optional(),
  description: z.string().min(1),
  isWorking: z.boolean().optional(),
  photos: z.any().optional(),
});

interface IUpdateFacilityForm {
  facility: TFacility;
}

const UpdateFacilityForm: React.FC<IUpdateFacilityForm> = ({ facility }) => {
  const { push } = useRouter();
  const {
    id,
    name,
    description,
    address,
    sportType,
    facilityType,
    coveringType,
    images,
  } = facility;

  const [isEditFacility, setIsEditFacility] = React.useState<boolean>(false);
  const [requestError, setRequestError] = React.useState<
    ApolloError | undefined
  >(undefined);

  const [updateFacility, { loading: updateFacilityLoading }] = useMutation(
    UPDATE_FACILITY_MUTATION,
  );
  const [updateFacilityPhotos, { loading: updateFacilityPhotosLoading }] =
    useMutation(UPDATE_FACILITY_PHOTOS_MUTATION);

  const [deleteFacility, { loading: deleteFacilityLoading }] = useMutation(
    DELETE_FACILITY_MUTATION,
  );

  const form = useForm<z.infer<typeof updateFacilityFormSchema>>({
    resolver: zodResolver(updateFacilityFormSchema),
    defaultValues: {
      name: name,
      address: address,
      description: description,
      sportType: sportType.map((sport) => ({ key: sport, name: sport })),
      coveringType: { key: coveringType, name: coveringType },
      facilityType: { key: facilityType, name: facilityType },
      photos: images,
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
            variables: {
              input: {
                ...otherChangedValues,
                id: id,
              },
            },
          });
          window.location.reload();
        }
        if (photos.length) {
          await updateFacilityPhotos({
            context: {
              headers: headers,
              authRequired: true,
            },
            variables: {
              facilityId: id,
              photos: photos,
            },
          });
        }
      } catch (e) {
        ErrorHandler.handle(e, {
          componentName: "UpdateFacilityForm__onSubmit",
        });
      }
    }
  };

  const handleDeleteFacility = async () => {
    try {
      await deleteFacility({
        context: {
          authRequired: true,
        },
        variables: {
          id,
        },
      });
      push(routes.USER_FACILITIES);
    } catch (e) {
      setRequestError(e as ApolloError);
      ErrorHandler.handle(e, {
        componentName: "UpdateFacilityForm__handleDeleteFacility",
      });
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditFacility(false);
  };

  return (
    <>
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
          <Separator />
          <div className="flex gap-x-2">
            {isEditFacility ? (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  type="button"
                  onClick={handleCancel}
                  disabled={
                    updateFacilityLoading || updateFacilityPhotosLoading
                  }
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  disabled={
                    updateFacilityLoading || updateFacilityPhotosLoading
                  }
                >
                  {!updateFacilityLoading && !updateFacilityPhotosLoading
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
            <ApproveActionCard
              handleApprove={handleDeleteFacility}
              alertDescription="This action cannot be undone. This will permanently delete your
            facility and remove its data from our servers."
            >
              <Button
                type="button"
                variant="outlineDestructive"
                size="lg"
                className="ml-auto"
                disabled={isEditFacility || true}
              >
                Delete Facility
              </Button>
            </ApproveActionCard>
          </div>
        </form>
      </FormProvider>
      <ShowErrorModal error={requestError} setError={setRequestError} />
    </>
  );
};

export default UpdateFacilityForm;
