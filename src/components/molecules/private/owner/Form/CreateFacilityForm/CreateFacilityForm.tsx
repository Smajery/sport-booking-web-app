import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import { facilityConfig } from "@/config/public/facility";
import SingleSelectField from "@/components/molecules/private/owner/Fields/SingleSelectField/SingleSelectField";
import MultiSelectField from "@/components/molecules/private/owner/Fields/MultiSelectField/MultiSelectField";
import InputField from "@/components/molecules/private/owner/Fields/InputField/InputField";
import TextareaField from "@/components/molecules/private/owner/Fields/TextareaField/TextareaField";
import SelectCityAndDistrictField from "@/components/molecules/private/owner/Fields/SelectCityAndDistrictField/SelectCityAndDistrictField";
import SelectLocationField from "@/components/molecules/private/owner/Fields/SelectLocationField/SelectLocationField";
import { useMutation } from "@apollo/client";
import { CREATE_FACILITY_MUTATION } from "@/apollo/mutations/private/owner/facility";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import ImageAvatarField from "@/components/molecules/private/owner/Fields/ImageAvatarField/ImageAvatarField";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";
import FormErrorsFrame from "@/components/molecules/public/Frames/FormErrorsFrame/FormErrorsFrame";

const createFacilityFormSchema = z.object({
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
  location: z.string(),
  districtId: z.string(),
  cityId: z.string(),
  description: z.string().min(1),
  photo: z.any().optional(),
});

const CreateFacilityForm = () => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { push } = useRouter();
  const [createFacility, { loading }] = useMutation(CREATE_FACILITY_MUTATION);

  const form = useForm<z.infer<typeof createFacilityFormSchema>>({
    resolver: zodResolver(createFacilityFormSchema),
    defaultValues: {
      sportType: [],
      name: "",
      address: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createFacilityFormSchema>) => {
    const { photo, cityId, ...otherValues } = values;
    const { sportType, coveringType, districtId, facilityType } = otherValues;
    const modifiedOtherValues = {
      ...otherValues,
      sportType: sportType.map((sport) => sport.key),
      coveringType: coveringType.key,
      facilityType: facilityType.key,
      districtId: Number(districtId),
    };
    //Temporary solution
    const headers: {
      "Content-Type"?: string;
      "apollo-require-preflight": boolean;
    } = {
      "apollo-require-preflight": true,
    };
    if (photo) {
      headers["Content-Type"] = "multipart/form-data";
    }
    try {
      await createFacility({
        context: {
          headers: headers,
          authRequired: true,
        },
        variables: {
          input: modifiedOtherValues,
          photo: photo,
        },
      });
      handleCancel();
    } catch (e) {
      ErrorHandler.handle(e, { componentName: "CreateFacilityForm__onSubmit" });
    }
  };

  const handleCancel = () => {
    push(routes.OWNER_FACILITIES);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col py-5 pl-5 gap-y-5"
        encType="multipart/form-data"
      >
        <ImageAvatarField
          form={form}
          name="photo"
          imagesName="Facility image"
          className="h-[460px] rounded-2xl"
        />
        <div className="flex justify-between mt-5">
          <div className="w-[700px] flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <InputField
                form={form}
                name="name"
                type="text"
                labelText="name"
                placeholder="facilityName"
                maxLength={100}
              />
              <SelectCityAndDistrictField
                form={form}
                name="districtId"
                cityName="cityId"
                labelText="cityDistrict"
              />
              <InputField
                form={form}
                name="address"
                type="text"
                labelText="address"
                placeholder="facilityAddress"
                maxLength={100}
              />
              <SelectLocationField
                form={form}
                name="location"
                labelText="location"
                className="bg-border rounded-xl h-[400px]"
              />
            </div>
            <Separator />
            <div className="w-full flex flex-col gap-y-2 text-lg">
              <MultiSelectField
                form={form}
                name="sportType"
                labelText="sport"
                selectableItems={facilityConfig.sportType}
                className="w-full"
              />
              <SingleSelectField
                form={form}
                name="facilityType"
                labelText="facility"
                selectableItems={facilityConfig.facilityType}
                className="w-full"
              />
              <SingleSelectField
                form={form}
                name="coveringType"
                labelText="covering"
                selectableItems={facilityConfig.coveringType}
                className="w-full"
              />
            </div>
            <Separator />
            <TextareaField
              form={form}
              name="description"
              labelText="description"
              className="max-h-[200px] min-h-[98px]"
              placeholder="facilityDescription"
              maxLength={400}
            />
          </div>
        </div>
        <Separator className="mt-5" />
        <div className="w-[700px] flex justify-end gap-x-2">
          <Button
            variant="outline"
            size="lg"
            type="button"
            onClick={handleCancel}
            disabled={loading}
          >
            {tTtl("cancel")}
          </Button>
          <Button variant="primary" size="lg" disabled={loading}>
            {!loading ? tTtl("save") : tTtl("loading")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateFacilityForm;
