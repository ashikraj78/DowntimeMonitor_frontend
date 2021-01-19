import React, { useState } from "react";

import Avtar from "../images/light.gif";
import Dialog from "@reach/dialog";
import AddWebsite from "./AddWebsite";

export default function HomePage() {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  return (
    <div className="flex justify-between pl-10 pr-10 pt-10">
      <div className="w-10/12">
        <h1 className=" font-black text-6xl mt-10">Downtime Monitoring</h1>
        <p className="font-medium text-4xl font-mono text-gray-700 mt-10 mb-20  ">
          Monitoring your <br /> website regularly at custom <br /> intervals
          for its availability
        </p>
        <div>
          <button
            onClick={open}
            className="inline-flex border-solid border border-gray-500 rounded-md  px-4 py-2 bg-green-600"
          >
            <div className="bg-green-200 rounded-3xl h-5 w-5 text-2xl flex justify-center items-center">
              <h2>+</h2>
            </div>
            <h2 className="pl-1 text-white font-medium ">
              Add Website for Monitoring
            </h2>
          </button>
          <Dialog isOpen={showDialog} onDismiss={close} className="modal">
            <AddWebsite close={close} />
          </Dialog>
        </div>
      </div>

      <div className="mt-10 ml-20">
        <img src={Avtar} alt="Avtart Gif" className="w-48" />
      </div>
    </div>
  );
}
