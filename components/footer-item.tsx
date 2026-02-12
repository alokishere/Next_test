"use client";

import { useState } from "react";

export function FooterItem({
  eachFooterData,
}: {
  eachFooterData: { label: string; items: React.ReactNode[] };
}) {
  const [showData, setShowData] = useState(false);

  const toggleShowData = () => {
    setShowData((prevShowData) => !prevShowData);
  };

  return (
    <div className="flex flex-col h-full gap-4 border-b w-full pb-5 md:border-b-0 md:w-auto">
      <h3
        className="font-bold cursor-pointer md:cursor-auto"
        onClick={toggleShowData}
      >
        {eachFooterData.label}
      </h3>
      <ul
        className={`flex flex-col gap-3 text-slate-600 ${
          showData ? "block" : "hidden"
        } md:block`}
      >
        {eachFooterData.items.map((eachItem, index) => (
          <li className="py-2" key={index}>
            {eachItem}
          </li>
        ))}
      </ul>
    </div>
  );
}
