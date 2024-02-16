import React from "react";
import { Button } from "@/components/ui/button";
import { facebookAuth } from "@/api/auth";
import ErrorHandler from "@/utils/handlers/ErrorHandler";

interface IFacebookAuthButton {
  children: string;
}

const FacebookAuthButton: React.FC<IFacebookAuthButton> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleFacebookAuth = () => {
    setIsLoading(true);
    facebookAuth()
      .then(() => console.log("Facebook Auth"))
      .catch((error) =>
        ErrorHandler.handle(error, {
          componentName: "FacebookAuthButton__handleFacebookAuth",
        }),
      )
      .finally(() => setIsLoading(false));
  };
  return (
    <Button
      variant="none"
      size="lg"
      className="facebook-gradient text-white"
      onClick={handleFacebookAuth}
    >
      {!isLoading ? children : "Loading..."}
    </Button>
  );
};

export default FacebookAuthButton;
