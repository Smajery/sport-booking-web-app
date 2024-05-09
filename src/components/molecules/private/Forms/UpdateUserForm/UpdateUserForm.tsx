"use client";

import React from "react";
import { TUser } from "@/types/private/profileTypes";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserCardFrame from "@/components/molecules/private/Frames/UserCardFrame/UserCardFrame";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ApolloError, useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "@/apollo/mutations/private/profile";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import UpdateUserFormContent from "@/components/molecules/private/Contents/UpdateUserFormContent/UpdateUserFormContent";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import ApolloErrorFrame from "@/components/molecules/common/Frames/ApolloErrorFrame/ApolloErrorFrame";
import _ from "lodash";
import UserProfileAvatar from "@/components/atoms/private/Avatars/UserProfileAvatar/UserProfileAvatar";
import { GET_USER_QUERY } from "@/apollo/query/admin/user";

interface IUpdateUserForm {
  user: TUser;
}

const updateUserSchema = z.object({
  fullname: z.string().min(6).max(20),
  avatar: z.any(),
  dateOfBirth: z.string().nullable(),
});

const UpdateUserFrame: React.FC<IUpdateUserForm> = ({ user }) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [requestError, setRequestError] = React.useState<
    ApolloError | undefined
  >(undefined);

  const { fullname, dateOfBirth, avatar } = user;

  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries: [{ query: GET_USER_QUERY }],
    onError: (e) => setRequestError(e),
  });

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
          context: {
            headers: headers,
          },
          variables: {
            profileInput: {
              ...otherChangedValues,
              dateOfBirth: values.dateOfBirth,
            }, //Temporary solution
            avatar: avatar,
          },
        });
        handleCancel();
      } catch (e) {
        ErrorHandler.handle(e, { componentName: "UpdateUserFrame__onSubmit" });
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
          className="flex flex-col"
          encType="multipart/form-data"
        >
          <div className="pl-[80px] flex justify-between gap-x-[80px]">
            <UserProfileAvatar isEdit={isEdit} user={user} form={form} />
            {isEdit ? (
              <UpdateUserFormContent form={form} user={user} />
            ) : (
              <UserCardFrame user={user} />
            )}
          </div>
          <Separator className="mt-unit-10 mb-unit-5" />
          <div className="pl-[80px] flex justify-between gap-x-unit-3">
            {isEdit ? (
              <div className="flex gap-x-unit-5">
                <Button
                  variant="outlineSecondary"
                  size="lg"
                  type="button"
                  disabled={loading}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>{" "}
                <Button variant="primary" size="lg" disabled={loading}>
                  {!loading ? "Save" : "Loading..."}
                </Button>
              </div>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                type="button"
                onClick={() => setIsEdit(true)}
              >
                Edit Profile
              </Button>
            )}
            <Button variant="outlineSecondary" size="lg" type="button" disabled>
              Change password
            </Button>
          </div>
        </form>
      </FormProvider>
      <AlertDialog open={!!requestError}>
        <AlertDialogContent>
          <ApolloErrorFrame error={requestError} className="text-base" />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setRequestError(undefined)}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UpdateUserFrame;
