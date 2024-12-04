"use client";

import { Provider } from "react-redux";
import Store from "../Store/Store";
import { ReactNode } from "react";

interface ClientProviderProps {
  children: ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return <Provider store={Store}>{children}</Provider>;
}
