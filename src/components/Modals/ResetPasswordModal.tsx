import { useEffect, useState } from "react";
import { Modal, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPasswordModal({
  openPassModal,
  setOpenPassModal,
}: any) {
  const token = useSelector((state: RootState) => state.user.token);
  const email = useSelector((state: RootState) => state.user.email);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (openPassModal === false) {
      setOtpSent(false);
      setFormData({ otp: "", newPassword: "", confirmPassword: "" });
      setErrors({ otp: "", newPassword: "", confirmPassword: "" });
    }
  }, [openPassModal]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field
  };

  const validateFields = () => {
    const newErrors: any = {};
    if (otpSent) {
      if (!formData.otp) newErrors.otp = "OTP is required.";
      if (!formData.newPassword)
        newErrors.newPassword = "New password is required.";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm password is required.";
      if (
        formData.newPassword &&
        formData.confirmPassword &&
        formData.newPassword !== formData.confirmPassword
      ) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }
    return newErrors;
  };

  const handleResetPassword = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/resetPasswordOtp`,
        { password: formData.newPassword, email: email, otp: formData.otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 201) {
        toast.success("Successfully Updated Passowrd");
        setTimeout(() => {
          setOpenPassModal(false);
          setOtpSent(false);
          setFormData({ otp: "", newPassword: "", confirmPassword: "" });
        }, 1000);
      } else {
        toast.error("Failed");
      }
    } catch (err) {
      console.log(err, "ppap");
      //  @ts-ignore
      if (Array.isArray(err.response.data.message)) {
        //  @ts-ignore
        err.response.data.message.forEach((e) => {
          toast.error(e);
        });
      } else {
        //  @ts-ignore
        toast.error(err.response.data.message);
      }
    }
  };
  const SendOtp = async () => {
    console.log(email, "email");
    let res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sendForgetPasswordOtp`,
      { email: email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status == 201) {
      toast.success("Successfully sent Otp");
      setTimeout(() => {
        setOtpSent(true);
      }, 1000);
    } else {
      toast.error("Error updating, Please Try Again");
    }
  };
  return (
    <Modal
      open={openPassModal}
      onClose={() => setOpenPassModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center text-black "
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md dark:bg-[#1e1e2f] ">
        <div className="right-0 text-right w-full">
          <span
            className="hover:cursor-pointer dark:text-white"
            onClick={() => {
              setOpenPassModal(false);
              setOtpSent(false);
            }}
          >
            X
          </span>
        </div>
        <h1 className="text-xl text-center font-bold mb-6 dark:text-white">
          Reset Password
        </h1>
        {!otpSent ? (
          <div className="flex justify-center flex-col">
            <h1 className="text-gray-600 mb-6 dark:text-white">
              To reset your password, we will send an OTP to your registered
              email. Please enter the OTP to create a new password.
            </h1>
            <button
              onClick={() => SendOtp()}
              className="md:w-auto px-6 py-2 bg-gradient-to-r from-[#DC39FC] to-[#6345ED] text-white rounded-full shadow hover:shadow-xl focus:outline-none"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <TextField
              label="OTP"
              variant="outlined"
              className="mb-4 w-full dark:text-white"
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              error={!!errors.otp}
              helperText={errors.otp}
            />
            <TextField
              label="New Password"
              variant="outlined"
              className="mb-4 w-full dark:text-white"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              className="mb-6 w-full dark:text-white"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <button
              onClick={handleResetPassword}
              className="md:w-auto px-6 py-2 bg-gradient-to-r from-[#DC39FC] to-[#6345ED] text-white rounded-full shadow hover:shadow-xl focus:outline-none"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
