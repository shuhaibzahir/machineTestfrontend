import axios from "axios";
import React, { useRef, useState } from "react";

const App = () => {
  const form = useRef();
  const [data, setData] = useState({
    Location: "",
    Customer: "",
    "Order#": "",
  });
  let [fetchedData, setFetchedData] = useState([]);
  /* ------------------------- submir function ------------------------ */
  const formSubmit = async (e) => {
    e.preventDefault();
    form.current.reset();

    axios
      .get(
        `https://skyline.shuhaib.host/temp/api/check-status?Location=${data.Location}&Customer=${data.Customer}&Order=${data["Order#"]}`
      )
      .then((res) => {
        setFetchedData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex  flex-col items-center justify-center bg-blue-300">
      <form
        ref={form}
        onSubmit={formSubmit}
        className="flex flex-col items-center justify-between space-y-3"
      >
        <div className="flex  space-x-4">
          <div className="capitalize space-x-3 ">
            <label htmlFor="" className="text-2xl">
              Location
            </label>
            <input
              type="text"
              name="Location"
              className="rounded p-3"
              onChange={(e) =>
                setData((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                })
              }
              required
            />
          </div>
          <div className="capitalize space-x-3 ">
            <label htmlFor="" className="text-2xl">
              Customer Name
            </label>
            <input
              type="text"
              name="Customer"
              className="rounded p-3"
              onChange={(e) =>
                setData((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                })
              }
              required
            />
          </div>
          <div className="capitalize space-x-3 ">
            <label htmlFor="" className="text-2xl">
              Order Number
            </label>
            <input
              type="text"
              name="Order#"
              className="rounded p-3"
              onChange={(e) =>
                setData((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                })
              }
              required
            />
          </div>
        </div>
        <div>
          <button className="px-8 py-4 bg-blue-100 rounded-lg">Search</button>
        </div>
      </form>

      <table className="w-1/2 m-10">
        <thead className="text-lg">
          <th>Location</th>
          <th>Order Number</th>
          <th>Order Status</th>
        </thead>
        <tbody className="text-center">
          {fetchedData.map((i) => (
            <tr key={i._id} >
              <td className="border-2 p-2">{i.Location}</td>
              <td className="border-2 p-2">{i["Order#"]}</td>
              <td className="border-2 p-2">{i["Order Status"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ---------------------------- take the details ---------------------------- */

export default App;
