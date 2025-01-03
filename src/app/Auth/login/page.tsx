
import CredentialSide from "./credentialSide";

import LoginLayout from "./loginlayout";
import PictureSide from "./pictureSide";

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
