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
  const shareIcons = [
    { title: "WhatsApp", icon: faWhatsapp, color: "text-green-500", link: socialLinks.whatsapp },
    { title: "Facebook", icon: faFacebookF, color: "text-blue-600", link: socialLinks.facebook },
    { title: "Twitter (X)", icon: faXTwitter, color: "text-black", link: socialLinks.twitter },
    { title: "LinkedIn", icon: faLinkedinIn, color: "text-blue-500", link: socialLinks.linkedin },
    { title: "Email", icon: faEnvelope, color: "text-gray-600", link: socialLinks.email },
  ];

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
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[95%] sm:max-w-[80%]  md:max-w-[60%] lg:max-w-[50%] ">

        {/* Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-center flex-1">
            Share this Product
          </h2>
          <IconButton onClick={onClose} className="p-1">
            <IoClose className="text-red-600 text-[24px] max-md:text-[28px] lg:text-[32px]" />
          </IconButton>
        </div>

        {/* Share Icons */}
        <div className="flex justify-center flex-wrap max-sm:gap-9  sm:gap-16 md:gap-10 lg:gap-16 xl:gap-20 my-4">
          {shareIcons.map(({ title, icon, color, link }, index) => (
            <Tooltip key={index} title={title}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={icon} className={`${color} max-md:text-[36px] md:text-[44px] lg:text-[46px]`} />
              </a>
            </Tooltip>
          ))}
        </div>
        {/* Copy URL Section */}
        <div className="flex items-center border p-2 rounded mt-2 w-full">
          <TextField
            fullWidth
            variant="standard"
            value={currentUrl}
            InputProps={{ readOnly: true }}
            sx={{
              input: { color: "black", fontSize: "14px", "@media (min-width: 640px)": { fontSize: "16px" } },
            }}
          />
          <IconButton onClick={copyToClipboard}>
            <FontAwesomeIcon icon={faCopy} className="text-gray-500 text-[18px] sm:text-[24px]" />
          </IconButton>
        </div>
      </Box>
    </Modal>

  );
};

export default ShareProductModal;
