"use client";

import dynamic from "next/dynamic";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(ClientWrapper), { ssr: false });
