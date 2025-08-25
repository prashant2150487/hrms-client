import { Textarea } from "@/components/ui/textarea";
import { hideLoader, showLoader } from "@/features/loader";
import axiosInstance from "@/lib/axios";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
const RejectPopup = ({ setShow, rejectLeaveId, fetchAllLeaves }) => {
  const [reason, setReason] = useState<string>("");
  const dispatch = useDispatch();
  const handleRejectLeave = async () => {
    try {
      dispatch(showLoader());
      const response = await axiosInstance.put(
        `/v1/leave/${rejectLeaveId}/status`,
        {
          status: "Rejected",
          rejectionReason: reason,
        }
      );
      setShow(false);
      fetchAllLeaves();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };
  return (
    <>
      <div
        id="popup-modal"
        className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-60"
      >
        <div className="relative p-4 w-full max-w-md">
          <div className="relative bg-white rounded-lg shadow-sm">
            <button
              onClick={() => setShow(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
            >
              <X />
            </button>
            <div className="p-4 md:p-5 text-center">
              <div className=" flex flex-col gap-1 items-start mt-4">
                <label className="text-gray-600 font-semibold">
                  Reject Reason
                </label>
                <Textarea
                  onChange={(e) => setReason(e.target.value)}
                  value={reason}
                  className=""
                ></Textarea>
              </div>

              <div className="flex items-start mt-4">
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  onClick={handleRejectLeave}
                  className=" text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  onClick={() => setShow(false)}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RejectPopup;
