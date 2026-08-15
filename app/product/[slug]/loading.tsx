import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <div className="custom-conic-loader uppercase tracking-wider">
        Loading...
      </div>
    </div>
  );
}
