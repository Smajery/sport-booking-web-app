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
import { CREATE_RATING_MUTATION } from "@/apollo/mutations/private/user/rating";
import ShowErrorModal from "@/components/molecules/public/Modals/ShowErrorModal/ShowErrorModal";
import { Loader2 } from "lucide-react";

interface ICreateRatingForm {
  ratingsCount: number;
  userRating: number;
  facilityId: number;
  className?: string;
}

const createRatingFormSchema = z.object({
  facilityId: z.number(),
  value: z.number(),
});

const CreateRatingForm: React.FC<ICreateRatingForm> = ({
  ratingsCount,
  userRating,
  facilityId,
  className = "",
}) => {
  const ratings = Array.from({ length: ratingsCount }, (_, i) => i + 1);
  const [currentUserRating, setCurrentUserRating] =
    React.useState<number>(userRating);
  const [requestError, setRequestError] = React.useState<
    ApolloError | undefined
  >(undefined);

  const [createRating, { loading }] = useMutation(CREATE_RATING_MUTATION);

  const form = useForm<z.infer<typeof createRatingFormSchema>>({
    resolver: zodResolver(createRatingFormSchema),
    defaultValues: {
      facilityId,
    },
  });

  const onSubmit = async (values: z.infer<typeof createRatingFormSchema>) => {
    try {
      await createRating({
        context: {
          authRequired: true,
        },
        variables: {
          createRatingInput: values,
        },
      });
    } catch (e) {
      setRequestError(e as ApolloError);
      ErrorHandler.handle(e, { componentName: "CreateRatingForm__onSubmit" });
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
    form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <FormProvider {...form}>
        <form noValidate className={cn("flex flex-col gap-y-2", className)}>
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
          <p className="text-sm text-muted-foreground italic">
            Please rate this facility
          </p>
        </form>
      </FormProvider>
      <ShowErrorModal error={requestError} setError={setRequestError} />
    </>
  );
};

export default CreateRatingForm;
