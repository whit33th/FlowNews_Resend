import React from "react";

export default function Loader() {
  return (
    <div className="w-full flex justify-center items-center h-full">
      <figure className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
    </div>
  );
}
