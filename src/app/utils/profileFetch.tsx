// src/api/user.ts
import axios from "axios";

export const fetchProfileData = async (token: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getUserData`,    
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data;
};
