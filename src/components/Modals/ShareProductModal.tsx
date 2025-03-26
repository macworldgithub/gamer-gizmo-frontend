"use client";

import { Modal, Box, IconButton, TextField, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCopy, faTimes } from "@fortawesome/free-solid-svg-icons";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ShareProductModal = ({ open, onClose }: any) => {
  // Get the current page URL dynamically
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // Social Media Share Links
  const socialLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    email: `mailto:?subject=Check%20this%20out&body=${encodeURIComponent(currentUrl)}`,
  };

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[35%]">
        {/* Close Button */}
        <div className="flex justify-center items-center relative">
          <h2 className="text-lg font-semibold">Share this Product</h2>
          <IconButton onClick={onClose} className="">
            {/* <FontAwesomeIcon icon={faTimes} /> */}
            {/* <IoCloseCircle/> */}
            <IoClose  color="red" size={28} />
          </IconButton>
        </div>

        {/* Share Icons */}
        <div className="flex justify-center gap-16 my-4">
          <Tooltip title="Share on WhatsApp">
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} size="2x" className="text-green-500 text-[42px]" />
            </a>
          </Tooltip>

          <Tooltip title="Share on Facebook">
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} size="2x" className="text-blue-600 text-[42px]" />
            </a>
          </Tooltip>

          <Tooltip title="Share on X (Twitter)">
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faXTwitter} className="text-black text-[42px]" />
            </a>
          </Tooltip>

          <Tooltip title="Share on LinkedIn">
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} className="text-blue-500 text-[42px]" />
            </a>
          </Tooltip>

          <Tooltip title="Share via Email">
            <a href={socialLinks.email} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-600 text-[42px]" />
            </a>
          </Tooltip>
        </div>

        {/* Copy URL Section */}
        <div className="flex items-center border p-2 rounded mt-2">
          <TextField fullWidth variant="standard" value={currentUrl} InputProps={{ readOnly: true  }} sx={{
      input: {
        color: "black", // Default text color
        "&.MuiInputBase-input": {
          color: "black", // Ensure it's black in dark mode too
        },
      },
    }} />
          <IconButton onClick={copyToClipboard}>
            <FontAwesomeIcon icon={faCopy} className="text-gray-500" />
          </IconButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ShareProductModal;
