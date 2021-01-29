import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Dialog from "@reach/dialog";

import deleteIcon from "../images/delete.png";
import editIcon from "../images/edit.png";
import EditWebsite from "./EditWebsite";
import cancel from "../images/cancel.png";
import StatusPage from "./StatusPage";
import loadingIcon from "../images/loading.gif";

export default function WebsiteInfo() {
  const { id } = useParams();
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [websiteInfo, setWebsiteInfo] = useState({});

  useEffect(() => {
    setLoading(true);

    fetch(process.env.REACT_APP_API_URL + `/api/v1/websites/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          const { website } = res;
          setWebsiteInfo(website);
          setLoading(false);
        } else {
          setLoading(false);
          alert(res.msg);
        }
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }, []);

  function handleDelete() {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/websites/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    })
      .then((res) => res.json())
      .then((deltedWebsite) => {
        history.push("/dashboard");
      })
      .catch((error) => {
        alert("somethin went wrong");
      });
  }

  return (
    <div>
      {loading ? (
        <div className="h-60 w-60 mx-auto mt-20">
          <img src={loadingIcon} alt="loading" />
          <p className="flex justify-center mt-10">Please Wait...</p>
        </div>
      ) : (
        <div className="pt-24 pr-10 pl-10">
          <div className=" border-solid border-b border-gray-200 mb-8 pb-4">
            <div className="flex justify-end">
              <div>
                <button
                  onClick={open}
                  className="w-8 h-8 inline-flex items-center justify-center border mr-4 hover:bg-green-300"
                >
                  <img src={editIcon} alt="" />
                </button>
                <Dialog isOpen={showDialog} onDismiss={close} className="modal">
                  <EditWebsite
                    close={close}
                    id={id}
                    websiteInfo={websiteInfo}
                    setWebsiteInfo={setWebsiteInfo}
                  />
                </Dialog>
              </div>
              <button
                onClick={handleDelete}
                className="w-8 h-8 inline-flex items-center justify-center border hover:bg-green-300 "
              >
                <img src={deleteIcon} alt="delte" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl text-gray-500 ">
                Website Name :{" "}
                <span className="text-3xl font-mono font-black text-gray-700">
                  {" "}
                  {websiteInfo.name}
                </span>
              </h2>
              <h3 className="text-2xl text-gray-500">
                Website Url :{" "}
                <span className="text-3xl text-gray-700">
                  {" "}
                  {websiteInfo.url}{" "}
                </span>{" "}
              </h3>
              <h3 className="text-2xl text-gray-500">
                Monitoring Timer :{" "}
                <span className="text-3xl text-gray-700">
                  {" "}
                  {websiteInfo.timer}{" "}
                </span>{" "}
                min
              </h3>
            </div>
          </div>

          <StatusPage websiteInfo={websiteInfo} />
        </div>
      )}
    </div>
  );
}
