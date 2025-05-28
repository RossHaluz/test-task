import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen bg-slate-300 flex items-center justify-center px-4">
      {children}
    </div>
  );
};

export default AuthLayout;
