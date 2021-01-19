import React from "react";
import { useFormik } from "formik";
import VisuallyHidden from "@reach/visually-hidden";

function validator(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "*Website Name is required";
  }
  if (!values.timer) {
    errors.url = "*Website Timer is required";
  }
  return errors;
}

export default function EditWebsite({
  close,
  id,
  websiteInfo,
  setWebsiteInfo,
}) {
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: websiteInfo.name,
      url: websiteInfo.url,
      timer: websiteInfo.timer,
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validate: validator,
    onSubmit: (values) => {
      handleClick();
    },
  });
  function handleClick() {
    fetch(process.env.REACT_APP_API_URL + `/api/v1/websites/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ website: values }),
    })
      .then((res) => res.json())
      .then(({ website }) => {
        setWebsiteInfo(website);
        return close();
      });
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <button onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              for="name"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Website Name
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
              <small className="pb-10 text-red-700">{errors.name}</small>
            </div>
          </div>
          {/* <small className="pb-4 text-gray-700">You can't edit URL. </small> */}

          <div className="mt-6">
            <label
              for="timer"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Monitoring Timer
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                name="timer"
                value={values.timer}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
              <small className="pb-10 text-red-700">{errors.timer}</small>
            </div>
          </div>

          <div className="mt-2">
            <span className="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out"
              >
                Edit Website for Monitoring
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
