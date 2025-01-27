"use client";
import { RootState } from "@/components/Store/Store";
import { useSelector } from "react-redux";

export let isAuthenticated = () =>
  useSelector((state: RootState) => state.user.token);
