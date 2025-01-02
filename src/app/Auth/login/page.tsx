import React from "react";

import CredentialSide from "./credentialSide";

import PictureSide from "./pictureSide";
import LoginLayout from "./loginlayout";

const Login = () => {
  return (
    <>
      <LoginLayout>
        <CredentialSide />
        <PictureSide />
      </LoginLayout>
    </>
  );
};

export default Login;
