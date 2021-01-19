import React from "react";

export default function StatusPage({ websiteInfo }) {
  return (
    <div class="flex flex-col mb-10">
      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>

            {websiteInfo.statuses &&
              websiteInfo.statuses.map((individualStatus) => {
                const d = new Date(individualStatus.createdAt);
                return (
                  <tbody>
                    <tr class="bg-white border-b-2">
                      <td
                        className={`px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 ${
                          individualStatus.status === "Active"
                            ? "bg-green-400"
                            : "bg-red-400"
                        }     `}
                      >
                        {individualStatus.status}
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {d.getHours() + ":" + d.getMinutes()}
                      </td>
                      <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {d.getDate() +
                          "-" +
                          (d.getMonth() + 1) +
                          "-" +
                          d.getFullYear()}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}
