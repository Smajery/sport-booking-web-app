"use client";

import React from "react";
import { TUser } from "@/types/private/user/profileTypes";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserCardFrame from "@/components/molecules/private/user/Frames/UserCardFrame/UserCardFrame";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ApolloError, useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "@/apollo/mutations/private/user/profile";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import UpdateUserFormContent from "@/components/molecules/private/user/Contents/UpdateUserFormContent/UpdateUserFormContent";
import _ from "lodash";
import { GET_USER_QUERY } from "@/apollo/query/private/user/profile";
import UserInfoFrame from "@/components/molecules/private/user/Frames/UserInfoFrame/UserInfoFrame";
import ShowErrorModal from "@/components/molecules/public/Modals/ShowErrorModal/ShowErrorModal";
import CropUserProfileAvatarFrame from "@/components/molecules/private/user/Frames/CropUserProfileAvatarFrame/CropUserProfileAvatarFrame";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IUpdateUserForm {
  user: TUser;
  isBecameOwner: boolean;
}

const updateUserSchema = z.object({
  fullname: z.string().min(6).max(20),
  avatar: z.any().optional(),
  dateOfBirth: z.string().nullable(),
});

const UpdateUserFrame: React.FC<IUpdateUserForm> = ({
  user,
  isBecameOwner,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [requestError, setRequestError] = React.useState<
    ApolloError | undefined
  >(undefined);

  const { fullname, dateOfBirth, avatar, userOwner, isActivated } = user;

  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullname: fullname ?? "",
      avatar: avatar,
      dateOfBirth: dateOfBirth,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    const changedValues: { [key: string]: any } = {};
    Object.keys(values).forEach((key: string) => {
      const valuesKey = key as keyof typeof values;
      if (
        form.formState.defaultValues &&
        !_.isEqual(values[valuesKey], form.formState.defaultValues[valuesKey])
      ) {
        changedValues[valuesKey] = values[valuesKey];
      }
    });
    if (Object.keys(changedValues).length !== 0) {
      const { avatar, ...otherChangedValues } = changedValues;
      //Temporary solution
      const headers: {
        "Content-Type"?: string;
        "apollo-require-preflight": boolean;
      } = {
        "apollo-require-preflight": true,
      };
      if (avatar) {
        headers["Content-Type"] = "multipart/form-data";
      }
      //
      try {
        await updateUser({
          refetchQueries: [
            { query: GET_USER_QUERY, context: { authRequired: true } },
          ],
          context: {
            headers: headers,
            authRequired: true,
          },
          variables: {
            profileInput: {
              ...otherChangedValues,
            }, //Temporary solution
            avatar: avatar,
          },
        });
        handleCancel();
      } catch (e) {
        setRequestError(e as ApolloError);
        ErrorHandler.handle(e, { componentName: "UpdateUserForm__onSubmit" });
      }
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    form.reset();
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-y-5"
          encType="multipart/form-data"
        >
          <div className="flex justify-between">
            <CropUserProfileAvatarFrame
              isEdit={isEdit}
              user={user}
              form={form}
            />
            {isEdit ? (
              <UpdateUserFormContent form={form} user={user} />
            ) : (
              <UserCardFrame user={user} />
            )}
          </div>
          {userOwner && (
            <div className="ml-[310px] flex gap-10">
              <UserInfoFrame
                title="phone"
                info={userOwner.phone}
                isCheck={false}
              />
              <UserInfoFrame
                title="organizationName"
                info={userOwner.organizationName}
                className="w-full"
              />
            </div>
          )}
          {isActivated ? (
            <Separator className="mt-5" />
          ) : (
            <>
              <div className="flex gap-x-1 pl-[80px] italic text-sm text-muted-foreground">
                <p>{tTtl("yourEmailIsNotActivated")}</p>
              </div>
              <Separator />
            </>
          )}
          {!isBecameOwner && (
            <div className="pl-[80px] flex justify-between gap-x-3">
              {isEdit ? (
                <div className="flex gap-x-5">
                  <Button
                    variant="outline"
                    size="md"
                    type="button"
                    disabled={loading}
                    onClick={handleCancel}
                  >
                    {tTtl("cancel")}
                  </Button>{" "}
                  <Button variant="primary" size="md" disabled={loading}>
                    {!loading ? tTtl("save") : tTtl("loading")}
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outlineSecondary"
                  size="md"
                  type="button"
                  onClick={() => setIsEdit(true)}
                >
                  {tTtl("edit")}
                </Button>
              )}
              <Button
                variant="outlineSecondary"
                size="md"
                type="button"
                disabled
              >
                {tTtl("changePassword")}
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
      <ShowErrorModal error={requestError} setError={setRequestError} />
    </>
  );
};

export default UpdateUserFrame;
