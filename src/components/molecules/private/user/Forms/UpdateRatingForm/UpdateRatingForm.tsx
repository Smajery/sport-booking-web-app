"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ApolloError, useMutation } from "@apollo/client";
import { UPDATE_RATING_MUTATION } from "@/apollo/mutations/private/user/rating";
import ShowErrorModal from "@/components/molecules/public/Modals/ShowErrorModal/ShowErrorModal";
import { Loader2 } from "lucide-react";
import { GET_ONE_FACILITY_QUERY } from "@/apollo/query/public/facility";
import { clsx } from "clsx";
import { useTheme } from "next-themes";
import {
  getRatingImagePath,
  getThemeIconsPath,
} from "@/utils/helpers/icon.helpers";

interface IUpdateRatingForm {
  ratingsCount: number;
  userRating: number;
  ratingId: number;
  facilityId: number;
  className?: string;
}

const UpdateRatingFormSchema = z.object({
  id: z.number(),
  value: z.number(),
});

const UpdateRatingForm: React.FC<IUpdateRatingForm> = ({
  ratingsCount,
  userRating,
  ratingId,
  facilityId,
  className = "",
}) => {
  const { theme } = useTheme();

  const ratings = Array.from({ length: ratingsCount }, (_, i) => i + 1);
  const [currentUserRating, setCurrentUserRating] =
    React.useState<number>(userRating);
  const [requestError, setRequestError] = React.useState<
    ApolloError | undefined
  >(undefined);

  const [isLoading, setIsLoading] = React.useState(false);

  const [updateRating, { loading }] = useMutation(UPDATE_RATING_MUTATION);

  const form = useForm<z.infer<typeof UpdateRatingFormSchema>>({
    resolver: zodResolver(UpdateRatingFormSchema),
    defaultValues: {
      id: ratingId,
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateRatingFormSchema>) => {
    setIsLoading(true);
    try {
      await updateRating({
        context: {
          authRequired: true,
        },
        variables: {
          updateRatingInput: values,
        },
        refetchQueries: [
          {
            query: GET_ONE_FACILITY_QUERY,
            context: { authRequired: true },
            variables: {
              id: facilityId,
            },
          },
        ],
      });
    } catch (e) {
      setRequestError(e as ApolloError);
      ErrorHandler.handle(e, { componentName: "UpdateRatingForm__onSubmit" });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const handleSetRating = (rating: number) => {
    form.setValue("value", rating);
    form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <FormProvider {...form}>
        <form noValidate className={cn("flex gap-x-4", className)}>
          <div className="flex gap-x-2 items-start">
            <div className="h-[28px] flex items-center">
              {ratings.map((rating) => (
                <Button
                  key={rating}
                  variant="none"
                  size="none"
                  type="button"
                  asChild
                  className={clsx("cursor-pointer", {
                    hidden: (loading || isLoading) && rating === ratingsCount,
                  })}
                  onClick={() => handleSetRating(rating)}
                  onMouseEnter={() => setCurrentUserRating(rating)}
                  onMouseLeave={() => setCurrentUserRating(userRating)}
                >
                  <div className="pr-1 pl-1 last-of-type:pr-0 first-of-type:pl-0">
                    <Image
                      src={`/${getThemeIconsPath(theme)}/${getRatingImagePath(rating, currentUserRating)}`}
                      alt={`Rating ${rating}`}
                      width={20}
                      height={20}
                    />
                  </div>
                </Button>
              ))}
              {(loading || isLoading) && (
                <Loader2 className={`ml-1 animate-spin w-5 h-5`} />
              )}
            </div>
          </div>
        </form>
      </FormProvider>
      <ShowErrorModal error={requestError} setError={setRequestError} />
    </>
  );
};

export default UpdateRatingForm;
