"use client";
import { useState } from "react";
import axios from "axios";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/components/Store/Store";
import { toast } from "react-toastify";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

export default function CreateCommunityButton({ onCreated }: { onCreated: () => void }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const token = useSelector((state: RootState) => state.user.token);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setName("");
        setDescription("");
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            alert("Community name is required!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/create`,
                {
                    name: name.trim(),
                    description: description.trim() || undefined,
                }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            console.log("✅ Community created:", response.data);
            // alert("Community created successfully!");
            toast.success("Community created successfully!");
            handleClose();
            onCreated();
        } catch (error) {
            // alert("Failed to create community.");
            toast.error("Failed to create community.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="px-6 py-2 w-[10rem] h-[3rem]  bg-custom-gradient text-white text-center text-xs font-semibold rounded-full shadow hover:opacity-90"
            >
                Create Community
            </button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2" className="mb-4 text-black">
                        Create a New Community
                    </Typography>

                    <TextField
                        fullWidth
                        required
                        label="Community Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                        multiline
                        rows={3}
                    />

                    <Box mt={3} display="flex" justifyContent="flex-end">
                        <Button onClick={handleClose} color="error" className="text-black" disabled={loading}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="secondary"
                            disabled={loading}
                            sx={{ ml: 2 }}
                        >
                            {loading ? <CircularProgress size={20} color="inherit" /> : "Create"}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
