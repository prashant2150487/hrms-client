import { hideLoader, showLoader } from "@/features/loader";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
const HolidayPopUp = ({
  setShow,
  editData,
  isEdit,
  fetchHoilday,
  setIsEdit,
}) => {
  const [holidayDetail, setHolidayDetail] = useState({
    title: editData.title || "",
    date: editData.date || "",
    description: editData.description || "",
  });
  const dispatch = useDispatch();
  const handleHoilday = async () => {
    try {
      dispatch(showLoader());
      const reponse = isEdit
        ? await axiosInstance.put(`/v1/holiday/${editData._id}`, {
            title: holidayDetail.title,
            date: holidayDetail.date,
            description: holidayDetail.description,
          })
        : await axiosInstance.post("/v1/holiday/create-holiday", holidayDetail);
      console.log(reponse.data.data);
      if (reponse.data.success == true) {
        fetchHoilday();
        setShow(false);
        toast.success(reponse.data.message);
        setIsEdit(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHolidayDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(holidayDetail, "bob");
  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-md mx-auto p-6">
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100">
            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>

            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Add Holiday
              </h2>

              {/* Title */}
              <div className="flex flex-col gap-2 mt-6">
                <label className="text-gray-600 font-medium text-sm">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={holidayDetail.title}
                  onChange={handleChange}
                  placeholder="Enter holiday title"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-gray-600 font-medium text-sm">
                  Date
                </label>
                <input
                  type="date"
                  onChange={handleChange}
                  name="date"
                  value={holidayDetail.date}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>
              {/* Description */}
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-gray-600 font-medium text-sm">
                  Description
                </label>
                <textarea
                  name="description"
                  value={holidayDetail.description}
                  onChange={handleChange}
                  placeholder="Add description here..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm resize-none"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShow(false)}
                  type="button"
                  className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleHoilday}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                >
                  Save Holiday
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HolidayPopUp;
