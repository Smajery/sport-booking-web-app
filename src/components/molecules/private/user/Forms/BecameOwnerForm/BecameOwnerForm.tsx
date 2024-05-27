"use client";

import React from "react";
import * as z from "zod";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserInputField from "@/components/molecules/private/user/Fields/UserInputField/UserInputField";
import {
  GET_USER_AVATAR_QUERY,
  GET_USER_INFO_QUERY,
  GET_USER_QUERY,
} from "@/apollo/query/private/user/profile";
import { BECAME_OWNER_MUTATION } from "@/apollo/mutations/private/user/user";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ShowErrorModal from "@/components/molecules/public/Modals/ShowErrorModal/ShowErrorModal";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import { jwtDecode } from "jwt-decode";
import { getCookie, setCookie } from "@/utils/helpers/cookie.helpers";
import { REFRESH_TOKEN_MUTATION } from "@/apollo/mutations/auth";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

const becameOwnerSchema = z.object({
  phone: z.string().min(1).max(20),
  organizationName: z.string().min(1).max(50),
});

interface IBecameOwnerForm {
  setIsBecameOwner: (value: boolean) => void;
}

const BecameOwnerForm: React.FC<IBecameOwnerForm> = ({ setIsBecameOwner }) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const [requestError, setRequestError] = React.useState<
    ApolloError | undefined
  >(undefined);

  const [becameOwner, { loading: becameOwnerLoading }] = useMutation(
    BECAME_OWNER_MUTATION,
  );
  const [refreshToken] = useMutation(REFRESH_TOKEN_MUTATION);
  const { refetch: refetchUserInfo } = useQuery(GET_USER_INFO_QUERY, {
    skip: true,
    context: { authRequired: true },
  });
  const { refetch: refetchUser } = useQuery(GET_USER_QUERY, {
    skip: true,
    context: { authRequired: true },
  });

  const form = useForm<z.infer<typeof becameOwnerSchema>>({
    resolver: zodResolver(becameOwnerSchema),
  });
  const onSubmit = async (values: z.infer<typeof becameOwnerSchema>) => {
    try {
      await becameOwner({
        context: {
          authRequired: true,
        },
        variables: {
          ownerInfo: values,
        },
        onCompleted: async () => {
          const refresh = getCookie("refreshToken");
          const { data } = await refreshToken({
            variables: {
              refresh,
            },
          });
          const accessToken = data.accessToken;
          const decodedAccessToken: { exp: number } = jwtDecode(accessToken);
          setCookie("accessToken", accessToken, decodedAccessToken.exp);

          await refetchUser();
          await refetchUserInfo();
        },
      });

      handleCancel();
    } catch (e) {
      setRequestError(e as ApolloError);
      ErrorHandler.handle(e, { componentName: "BecameOwnerForm__onSubmit" });
    }
  };

  const handleCancel = () => {
    setIsBecameOwner(false);
    form.reset();
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-y-5"
        >
          <div className="ml-[310px] flex flex-col gap-5 pb-5">
            <UserInputField
              form={form}
              name="phone"
              type="text"
              labelText="phone"
              placeholder="orgPhoneNumber"
            />
            <UserInputField
              form={form}
              name="organizationName"
              type="text"
              labelText="organizationName"
              placeholder="organizationName"
            />
          </div>
          <Separator />
          <div className="pl-[80px] flex justify-start gap-x-3">
            <Button
              variant="outline"
              size="md"
              type="button"
              disabled={becameOwnerLoading}
              onClick={handleCancel}
            >
              {tTtl("cancel")}
            </Button>{" "}
            <Button variant="primary" size="md" disabled={becameOwnerLoading}>
              {!becameOwnerLoading ? tTtl("save") : tTtl("loading")}
            </Button>
          </div>
        </form>
      </FormProvider>
      <ShowErrorModal error={requestError} setError={setRequestError} />
    </>
  );
};

export default BecameOwnerForm;
