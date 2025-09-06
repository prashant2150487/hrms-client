const StatutoryInformation = () => {
  return (
    <>
      <div className="bg-[#1b263b] rounded-lg p-5 border border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Statutory Information</h2>

        <h3 className="font-medium mb-2">PF Account Information</h3>
        <div className="border border-gray-600 p-2 rounded-md text-sm text-gray-400">
          PF Details are not available
        </div>

        <div className="mt-4">
          <h3 className="font-medium mb-1">ESI Account Information</h3>
          <p className="text-gray-400 text-sm">ESI Status</p>
          <p>Not Eligible</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
          <div>
            <p className="text-gray-400">State</p>
            <p>Gujarat</p>
          </div>
          <div>
            <p className="text-gray-400">Registered Location</p>
            <p>Gujarat</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatutoryInformation;
