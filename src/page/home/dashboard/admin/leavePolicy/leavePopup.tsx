import { hideLoader, showLoader } from "@/features/loader";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
const LeavePopup = ({
  setShowCreatePopup,
  fetchPolies,
  selectedPolicyData,
}) => {
  const [formData, setFormData] = useState({
    paidLeaves: selectedPolicyData.paidLeaves || 0,
    sickLeaves: selectedPolicyData.sickLeaves || 0,
    emergencyLeaves: selectedPolicyData.emergencyLeaves || 0,
    year: selectedPolicyData.year || 0,
  });
  const dispatch = useDispatch();
  const createLeavePolicy = async () => {
    try {
      dispatch(showLoader());
      const response = await axiosInstance.post(
        "/v1/policy/set-policy",
        formData
      );
      setShowCreatePopup(false);
      fetchPolies();
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoader());
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === "" ? "" : Number(value) });
  };
  console.log(formData);

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-md mx-auto p-6">
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100">
            <button
              onClick={() => setShowCreatePopup(false)}
              type="button"
              className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                Add Leave Policy
              </h2>
              {/* Title */}
              <div className="flex flex-col gap-2 mt-6">
                <label className="text-gray-600 font-medium text-sm">
                  PaidLeaves
                </label>
                <input
                  type="number"
                  value={formData.paidLeaves}
                  name="paidLeaves"
                  onChange={handleChange}
                  placeholder="Enter paid Leave "
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-gray-600 font-medium text-sm">
                  SickLeaves
                </label>
                <input
                  type="number"
                  value={formData.sickLeaves}
                  onChange={handleChange}
                  name="sickLeaves"
                  placeholder="Add sicknumber here"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm resize-none"
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-gray-600 font-medium text-sm">
                  EmergencyLeaves
                </label>
                <input
                  type="number"
                  value={formData.emergencyLeaves}
                  onChange={handleChange}
                  name="emergencyLeaves"
                  placeholder="Add emergencyLeaves here"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm resize-none"
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-gray-600 font-medium text-sm">
                  Year
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  name="year"
                  placeholder="Add year here"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm resize-none"
                />
              </div>
              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowCreatePopup(false)}
                  type="button"
                  className=" cursor-pointer px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={createLeavePolicy}
                  className=" cursor-pointer px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                >
                  Save Leave
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeavePopup;
