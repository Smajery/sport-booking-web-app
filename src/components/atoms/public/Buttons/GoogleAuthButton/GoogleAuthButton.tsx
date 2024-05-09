import React from "react";
import { Button } from "@/components/ui/button";
import ErrorHandler from "@/utils/handlers/ErrorHandler";

interface IGoogleAuthButton {
  children: string;
}

const GoogleAuthButton: React.FC<IGoogleAuthButton> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const handleGoogleAuth = () => {
  //   setIsLoading(true);
  //   googleAuth()
  //     .then(() => console.log("Google Auth"))
  //     .catch((error) =>
  //       ErrorHandler.handle(error, {
  //         componentName: "GoogleAuthButton__handleGoogleAuth",
  //       }),
  //     )
  //     .finally(() => setIsLoading(false));
  // };
  return (
    <Button
      variant="none"
      size="lg"
      className="google-gradient text-white"
      // onClick={handleGoogleAuth}
    >
      {!isLoading ? children : "Loading..."}
    </Button>
  );
};

export default GoogleAuthButton;
