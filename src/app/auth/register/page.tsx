import React from "react";
import RegisterLayout from "./Registerlayout";
import CredentialSide from "./credentialsSide";
import PictureSide from "./pictureSide";

const Register = () => {
  return (
    <>
      <RegisterLayout>
        <CredentialSide />
        <PictureSide />
      </RegisterLayout>
    </>
  );
};

export default Register;
