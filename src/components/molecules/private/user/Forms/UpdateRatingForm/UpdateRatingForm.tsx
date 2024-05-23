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

interface IUpdateRatingForm {
  ratingsCount: number;
  userRating: number;
  ratingId: number;
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
  className = "",
}) => {
  const ratings = Array.from({ length: ratingsCount }, (_, i) => i + 1);
  const [currentUserRating, setCurrentUserRating] =
    React.useState<number>(userRating);
  const [requestError, setRequestError] = React.useState<
    ApolloError | undefined
  >(undefined);

  const [updateRating, { loading }] = useMutation(UPDATE_RATING_MUTATION);

  const form = useForm<z.infer<typeof UpdateRatingFormSchema>>({
    resolver: zodResolver(UpdateRatingFormSchema),
    defaultValues: {
      id: ratingId,
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateRatingFormSchema>) => {
    try {
      await updateRating({
        context: {
          authRequired: true,
        },
        variables: {
          createRatingInput: values,
        },
      });
    } catch (e) {
      setRequestError(e as ApolloError);
      ErrorHandler.handle(e, { componentName: "UpdateRatingForm__onSubmit" });
    }
  };

  const getRatingImagePath = (rating: number) => {
    if (rating <= currentUserRating) {
      return "rating-star.svg";
    } else {
      return "no-rating-star.svg";
    }
  };

  const handleSetRating = (rating: number) => {
    form.setValue("value", rating);
    form.handleSubmit(onSubmit);
  };

  return (
    <>
      <FormProvider {...form}>
        <form noValidate className={cn("flex gap-x-4", className)}>
          <div className="flex gap-x-2 items-start">
            <div className="flex">
              {ratings.map((rating) => (
                <Button
                  key={rating}
                  variant="none"
                  size="none"
                  type="button"
                  asChild
                  className="cursor-pointer"
                  onClick={() => handleSetRating(rating)}
                  onMouseEnter={() => setCurrentUserRating(rating)}
                  onMouseLeave={() => setCurrentUserRating(userRating)}
                >
                  <div className="pr-1 pl-1 last-of-type:pr-0 first-of-type:pl-0">
                    <Image
                      src={`/icons/${getRatingImagePath(rating)}`}
                      alt={`Rating ${rating}`}
                      width={20}
                      height={20}
                    />
                  </div>
                </Button>
              ))}
            </div>
            {loading && <Loader2 className={`animate-spin w-5 h-5`} />}
          </div>
        </form>
      </FormProvider>
      <ShowErrorModal error={requestError} setError={setRequestError} />
    </>
  );
};

export default UpdateRatingForm;
