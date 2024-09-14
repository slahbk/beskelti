import React from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const GoogleAuth = () => {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={responseMessage}
        onError={errorMessage}
        shape="circle"
        size="large"
        text="continue_with"
        theme="outline"
        type="icon"
      />
    </div>
  );
};

export default GoogleAuth;
