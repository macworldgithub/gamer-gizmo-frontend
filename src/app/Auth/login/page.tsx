import React from "react";

import CredentialSide from "./credentialSide";

import PictureSide from "./pictureSide";
import LoginLayout from "./loginlayout";
import PageHeader from "@/components/PageHeader";

const Login = () => {
  return (
    <>
      <LoginLayout>
        <CredentialSide/>
        <PictureSide/>
      </LoginLayout>
    </>
  );
};

export default Login;
