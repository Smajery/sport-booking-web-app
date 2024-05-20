import React from "react";
import * as z from "zod";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { ApolloError, useMutation } from "@apollo/client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserInputField from "@/components/molecules/private/user/Fields/UserInputField/UserInputField";
import { GET_USER_QUERY } from "@/apollo/query/private/user/profile";
import { BECAME_OWNER_MUTATION } from "@/apollo/mutations/private/user/user";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ShowErrorModal from "@/components/molecules/public/Modals/ShowErrorModal/ShowErrorModal";

const becameOwnerSchema = z.object({
  phone: z.string().min(1).max(20),
  organizationName: z.string().min(1).max(50),
});

interface IBecameOwnerForm {
  setIsBecameOwner: (value: boolean) => void;
}

const BecameOwnerForm: React.FC<IBecameOwnerForm> = ({ setIsBecameOwner }) => {
  const [requestError, setRequestError] = React.useState<
    ApolloError | undefined
  >(undefined);

  const [becameOwner, { loading }] = useMutation(BECAME_OWNER_MUTATION, {
    context: {
      authRequired: true,
    },
    refetchQueries: [
      { query: GET_USER_QUERY, context: { authRequired: true } },
    ],
    onError: (e) => setRequestError(e),
  });

  const form = useForm<z.infer<typeof becameOwnerSchema>>({
    resolver: zodResolver(becameOwnerSchema),
  });
  const onSubmit = async (values: z.infer<typeof becameOwnerSchema>) => {
    try {
      await becameOwner({
        variables: {
          ownerInfo: values,
        },
      });
      handleCancel();
    } catch (e) {
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
              labelText="Phone"
              placeholder="Organization phone number..."
            />
            <UserInputField
              form={form}
              name="organizationName"
              type="text"
              labelText="Organization name"
              placeholder="Organization name.."
            />
          </div>
          <Separator />
          <div className="pl-[80px] flex justify-start gap-x-3">
            <Button
              variant="outline"
              size="md"
              type="button"
              disabled={loading}
              onClick={handleCancel}
            >
              Cancel
            </Button>{" "}
            <Button variant="primary" size="md" disabled={loading}>
              {!loading ? "Save" : "Loading..."}
            </Button>
          </div>
        </form>
      </FormProvider>
      <ShowErrorModal error={requestError} setError={setRequestError} />
    </>
  );
};

export default BecameOwnerForm;
