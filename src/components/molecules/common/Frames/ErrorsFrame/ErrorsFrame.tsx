import React from "react";

interface IErrorsFrame {
  errors: {};
}

const ErrorsFrame: React.FC<IErrorsFrame> = ({ errors }) => {
  return Object.keys(errors).length !== 0 ? (
    <div className="px-unit-5">
      {Object.keys(errors).map((key) => (
        <p key={key} className="text-sm text-destructive">
          {errors[key].message}
        </p>
      ))}
    </div>
  ) : null;
};

export default ErrorsFrame;
