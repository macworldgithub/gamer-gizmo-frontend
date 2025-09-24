import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface DeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="delete-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography
          id="delete-modal-title"
          variant="h6"
          gutterBottom
          className="text-black dark:text-white"
        >
          Are you sure you want to delete this comment?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          This action cannot be undone.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Yes, Delete
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
