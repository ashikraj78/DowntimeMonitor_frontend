import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dialog from "@reach/dialog";

import AddWebsite from "./AddWebsite";
import loadingIcon from "../images/loading.gif";

export default function Dashboard() {
  let history = useHistory();
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [websites, setWebsites] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_API_URL + "/api/v1/websites")
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          const { website } = res;
          setWebsites(website);
          setLoading(false);
        } else {
          setLoading(false);
          alert(res.msg);
        }
      })
      .catch((error) => {
        alert("Something went wrong. Please try again.");
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="h-60 w-60 mx-auto mt-20">
          <img src={loadingIcon} alt="loading" />
          <p className="flex justify-center mt-10">Please Wait...</p>
        </div>
      ) : (
        <div className="pt-24 pr-10 pl-10 h-screen">
          <div className="fixed bottom-32">
            <button
              onClick={open}
              className="inline-flex border-solid border border-gray-500 rounded-md  px-4 py-2 bg-green-600 hover:bg-green-500"
            >
              <div className="bg-green-200 rounded-3xl h-5 w-5 text-2xl flex justify-center items-center">
                <h2>+</h2>
              </div>
              <h2 className="pl-1 text-white font-medium ">
                Add Website for Monitoring
              </h2>
            </button>
            <Dialog isOpen={showDialog} onDismiss={close} className="modal">
              <AddWebsite
                close={close}
                websites={websites}
                setWebsites={setWebsites}
              />
            </Dialog>
          </div>
          <h2 className="text-gray-500 text-xl font-medium uppercase tracking-wide">
            Added Website
          </h2>

          <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {websites.map((website) => {
              return (
                <li className="col-span-1 flex items-center bg-white border border-green-200 rounded-md shadow-sm overflow-hidden hover:bg-green-300 hover:border-gray-400">
                  <div
                    onClick={() => history.push(`/websites/${website._id}`)}
                    className="flex cursor-pointer w-full"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 text-white text-center text-sm leading-5 font-medium bg-green-500">
                      {/* {(website.name[0] + website.name[4]).toUpperCase()} */}
                    </div>
                    <div className="flex-1 px-4 py-2 truncate">
                      <p className="text-gray-900 text-sm leading-5 font-medium hover:text-gray-600 transition ease-in-out duration-150">
                        {website.name}
                      </p>
                      <p className="text-sm leading-5 text-gray-500">
                        {website.url}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
