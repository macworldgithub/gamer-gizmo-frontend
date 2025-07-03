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
import { purple } from "@mui/material/colors";

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

export default function CreateCommunityButton({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

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
    if (!description.trim()) {
      alert("Description is required!");
      //   toast.warn("Description is required");
      return;
    }

    if (!agreed) {
      alert("You must agree to the Terms of Use.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/create`,
        {
          name: name.trim(),
          description: description.trim() || undefined,
        },
        {
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
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    width: {
      xs: "90%", // for mobile screens
      sm: 400, // for small and up (≥600px)
      md: 500, // for medium and up (≥900px)
      lg: 600, // for large and up (≥1200px)
    },
    maxWidth: "95vw",
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-6 py-2 w-[10rem] h-[3rem]  bg-custom-gradient text-white text-center text-xs font-semibold rounded-full shadow hover:opacity-90"
      >
        Create Community
      </button>

      {/* <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" className="mb-4 text-black">
            Start a new conversation
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
            <Button
              onClick={handleClose}
              color="error"
              className="text-black"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
              disabled={loading}
              sx={{ ml: 2 }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Create"
              )}
            </Button>
          </Box>
        </Box>
      </Modal> */}
      <Modal open={open} onClose={handleClose} className="">
        <Box sx={style}>
          <Typography variant="h6" component="h2" className="mb-4 text-black">
            Start a new conversation
          </Typography>

          {/* Community Name */}
          <TextField
            fullWidth
            required
            label="Community Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />

          {/* Terms of Use */}
          <Box
            sx={{
              mt: 2,
              maxHeight: 200,
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              fontSize: "0.875rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="subtitle2"
              className="font-bold mb-2 text-secondaryColorDark"
            >
              Gamergizmo Community Chat Terms of Use
            </Typography>

            <Typography component="div" color={"black"}>
              <ol className="pl-4 space-y-2">
                <li>
                  <strong>1. Purpose of the Community:</strong>
                  <ul className="list-disc pl-5">
                    <li>Share insights on gaming PCs and accessories</li>
                    <li>Discuss newly released games and tech</li>
                    <li>Stay updated on gaming news</li>
                    <li>Connect respectfully with fellow gamers</li>
                  </ul>
                </li>

                <li>
                  <strong>2. Code of Conduct:</strong>
                  <p>
                    All users must behave responsibly and respectfully. The
                    following are strictly prohibited:
                  </p>
                  <ul className="list-disc pl-5">
                    <li>
                      <strong>Abusive Language & Hate Speech:</strong> Use of
                      offensive, obscene, or abusive language, including
                      personal insults, racial slurs, or hate speech of any
                      kind.
                    </li>
                    <li>
                      <strong>Defamation & Personal Attacks:</strong> Do not
                      post content that defames, shames, or personally attacks
                      other users, companies, or individuals (public or
                      private).
                    </li>
                    <li>
                      <strong>Piracy & Illegal Content:</strong> Sharing links
                      to pirated software, games, cracks, or unauthorized
                      content is strictly forbidden.
                    </li>
                    <li>
                      <strong>Cyberbullying or Harassment:</strong> Harassing,
                      stalking, or targeting users in a way that causes distress
                      or fear is a violation of these terms and UAE Federal Law
                      No. 5 of 2012 (Cybercrime Law).
                    </li>
                    <li>
                      <strong>Promotion of Illegal Activities:</strong> Any
                      encouragement, promotion, or discussion of unlawful
                      actions under UAE law — including hacking, identity theft,
                      or bypassing game protections — is prohibited.
                    </li>
                    <li>
                      <strong>Violations of UAE Law:</strong> Content that
                      violates UAE laws on cybercrime, content standards,
                      defamation, or public decency will be reported and may
                      lead to criminal proceedings.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>3. Accountability:</strong>
                  <ul className="list-disc pl-5">
                    <li>
                      All messages are logged and monitored for safety and
                      compliance.
                    </li>
                    <li>
                      Gamergizmo reserves the right to suspend or permanently
                      ban users who violate these terms.
                    </li>
                    <li>
                      Users are solely responsible for their statements and
                      content posted.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>4. No Commercial Spam or Self-Promotion:</strong>
                  <p>
                    Please do not use the chat rooms for commercial promotion,
                    affiliate links, or unauthorized advertising unless
                    explicitly permitted by Gamergizmo admins.
                  </p>
                </li>

                <li>
                  <strong>5. Content Moderation:</strong>
                  <p>
                    Moderators may delete or edit content that violates these
                    terms. Repeated violations may result in account suspension
                    or termination.
                  </p>
                </li>

                <li>
                  <strong>6. Agreement:</strong>
                  <ul className="list-disc pl-5">
                    <li>You have read and understood these Terms of Use.</li>
                    <li>
                      You agree to follow all guidelines and UAE laws applicable
                      to online conduct.
                    </li>
                    <li>
                      You understand that your account may be suspended or
                      terminated if you breach these terms.
                    </li>
                  </ul>
                </li>
              </ol>
            </Typography>
          </Box>

          {/* Checkbox to agree */}
          <Box mt={2}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="text-sm text-gray-800">
                I have read and agree to the Terms of Use
              </span>
            </label>
          </Box>

          {/* Buttons */}
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} color="error" disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
              disabled={loading || !agreed}
              sx={{ ml: 2 }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Create"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
