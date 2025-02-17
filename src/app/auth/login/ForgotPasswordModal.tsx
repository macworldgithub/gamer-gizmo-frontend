// import * as React from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Fade,
//   Backdrop,
//   TextField,
// } from "@mui/material";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   borderRadius: "10px",
//   boxShadow: 24,
//   p: 4,
//   textAlign: "center",
// };

// interface ForgotPasswordProps {
//   open: boolean;
//   handleClose: () => void;
// }

// const ForgotPasswordModal: React.FC<ForgotPasswordProps> = ({
//   open,
//   handleClose,
// }) => {
//   return (
//     <Modal
//       aria-labelledby="forgot-password-modal-title"
//       aria-describedby="forgot-password-modal-description"
//       open={open}
//       onClose={handleClose}
//       closeAfterTransition
//       slots={{ backdrop: Backdrop }}
//       slotProps={{
//         backdrop: {
//           timeout: 500,
//         },
//       }}
//     >
//       <Fade in={open}>
//         <Box sx={style}>
//           <Typography
//             id="forgot-password-modal-title"
//             variant="h5"
//             fontWeight="bold"
//             color="#dc39fc"
//           >
//             Forgot Password?
//           </Typography>
//           <Typography
//             id="forgot-password-modal-description"
//             sx={{ mt: 1, color: "gray" }}
//           >
//             Enter your email below and we’ll send you a otp to reset your
//             password.
//           </Typography>

//           {/* Email Input Field */}
//           <TextField
//             fullWidth
//             type="email"
//             label="Email Address"
//             variant="outlined"
//             sx={{
//               mt: 3,
//               mb: 2,
//               "& label.Mui-focused": { color: "#dc39fc" },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": { borderColor: "#dc39fc" }, // Default border color
//                 "&:hover fieldset": { borderColor: "#dc39fc" }, // Border color on hover
//                 "&.Mui-focused fieldset": { borderColor: "#dc39fc" }, // Border color when focused
//               },
//             }}
//           />

//           {/* Buttons */}
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             className="bg-custom-gradient"
//             sx={{
//               borderRadius: "8px",
//               py: 1.5,
//               fontSize: "16px",
//               fontWeight: "bold",
//             }}
//           >
//             Send Otp to email
//           </Button>

//           <Button
//             onClick={handleClose}
//             color="secondary"
//             fullWidth
//             sx={{ mt: 2, textTransform: "none", fontSize: "14px" }}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </Fade>
//     </Modal>
//   );
// };

// export default ForgotPasswordModal;
import * as React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Backdrop,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const ForgotPasswordModal: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const [email, setEmail] = React.useState("");
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [otpModalOpen, setOtpModalOpen] = React.useState(false); // New state for OTP modal

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  };

  const handleSendOtp = () => {
    if (isValidEmail) {
      handleClose(); // Close the Forgot Password modal
      setOtpModalOpen(true); // Open the OTP modal
    }
  };

  return (
    <>
      {/* Forgot Password Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h5" fontWeight="bold" color="#dc39fc">
              Forgot Password?
            </Typography>
            <Typography sx={{ mt: 1, color: "gray" }}>
              Enter your email below and we’ll send you an OTP to reset your
              password.
            </Typography>

            <TextField
              fullWidth
              type="email"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              sx={{
                mt: 3,
                mb: 2,
                "& label.Mui-focused": { color: "#dc39fc" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#dc39fc" },
                  "&:hover fieldset": { borderColor: "#dc39fc" },
                  "&.Mui-focused fieldset": { borderColor: "#dc39fc" },
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                borderRadius: "8px",
                py: 1.5,
                fontSize: "16px",
                fontWeight: "bold",
              }}
              disabled={!isValidEmail}
              onClick={handleSendOtp} // Trigger OTP modal
            >
              Send OTP to Email
            </Button>

            <Button
              onClick={handleClose}
              color="secondary"
              fullWidth
              sx={{ mt: 2, textTransform: "none", fontSize: "14px" }}
            >
              Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>

      {/* OTP Modal */}
      <OtpModal
        open={otpModalOpen}
        handleClose={() => setOtpModalOpen(false)}
      />
    </>
  );
};

// 🔹 OTP Modal Component
const OtpModal: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => {
  const [otp, setOtp] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isValidForm, setIsValidForm] = React.useState(false);

  React.useEffect(() => {
    setIsValidForm(
      otp.length === 6 &&
        newPassword.length >= 6 &&
        newPassword === confirmPassword
    );
  }, [otp, newPassword, confirmPassword]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h5" fontWeight="bold" color="#dc39fc">
            Enter OTP & Reset Password
          </Typography>
          <Typography sx={{ mt: 1, color: "gray" }}>
            Enter the OTP sent to your email and reset your password.
          </Typography>

          {/* OTP Field */}
          <TextField
            fullWidth
            type="text"
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{
              mt: 3,
              mb: 2,
              "& label.Mui-focused": { color: "#dc39fc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#dc39fc" },
                "&:hover fieldset": { borderColor: "#dc39fc" },
                "&.Mui-focused fieldset": { borderColor: "#dc39fc" },
              },
            }}
          />

          {/* New Password Field */}
          <TextField
            fullWidth
            type="password"
            label="New Password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              mb: 2,
              "& label.Mui-focused": { color: "#dc39fc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#dc39fc" },
                "&:hover fieldset": { borderColor: "#dc39fc" },
                "&.Mui-focused fieldset": { borderColor: "#dc39fc" },
              },
            }}
          />

          {/* Confirm Password Field */}
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              mb: 2,
              "& label.Mui-focused": { color: "#dc39fc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#dc39fc" },
                "&:hover fieldset": { borderColor: "#dc39fc" },
                "&.Mui-focused fieldset": { borderColor: "#dc39fc" },
              },
            }}
          />

          {/* Reset Password Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: "8px",
              py: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
            }}
            disabled={!isValidForm}
          >
            Reset Password
          </Button>

          <Button
            onClick={handleClose}
            color="secondary"
            fullWidth
            sx={{ mt: 2, textTransform: "none", fontSize: "14px" }}
          >
            Cancel
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ForgotPasswordModal;
