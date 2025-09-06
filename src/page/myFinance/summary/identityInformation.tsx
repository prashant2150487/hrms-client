const IdentityInformation = () => {
  return (
    <>
      <div className="space-y-6">
        {/* Identity Information */}
        <div className="bg-[#1b263b] rounded-lg p-5 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Identity Information</h2>
            <span className="text-sm text-blue-400 cursor-pointer">
              1 file(s)
            </span>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2">
              <span className="text-sm">🇮🇳 Pan Card</span>
              <span className="bg-green-600 text-xs px-2 py-0.5 rounded">
                VERIFIED
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-2 mt-2 text-sm">
              <div>
                <p className="text-gray-400">Permanent Account Number</p>
                <p>XXXXXXXX905L</p>
              </div>
              <div>
                <p className="text-gray-400">Name</p>
                <p>Prashant Sachan</p>
              </div>
              <div>
                <p className="text-gray-400">Date of Birth</p>
                <p>05 Jan 1997</p>
              </div>
              <div>
                <p className="text-gray-400">Parent's Name</p>
                <p>Sanjay Sachan</p>
              </div>
            </div>
          </div>

          {/* Photo ID */}
          <div className="mb-5">
            <div className="flex items-center gap-2">
              <span className="text-sm">🇮🇳 Aadhaar Card</span>
              <span className="bg-green-600 text-xs px-2 py-0.5 rounded">
                VERIFIED
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-2 mt-2 text-sm">
              <div>
                <p className="text-gray-400">Aadhaar Number</p>
                <p>XXXX-XXXX-4624</p>
              </div>
              <div>
                <p className="text-gray-400">Enrollment Number</p>
                <p>Not Available</p>
              </div>
              <div>
                <p className="text-gray-400">Date of Birth</p>
                <p>05 Jan 1997</p>
              </div>
              <div>
                <p className="text-gray-400">Name</p>
                <p>Prashant Sachan</p>
              </div>
              <div>
                <p className="text-gray-400">Address</p>
                <p>vill and post baraur...</p>
              </div>
              <div>
                <p className="text-gray-400">Gender</p>
                <p>Male</p>
              </div>
            </div>
            <span className="text-sm text-blue-400 cursor-pointer block mt-2">
              2 file(s)
            </span>
          </div>

          {/* Address Proof */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm">🇮🇳 Aadhaar Card</span>
              <span className="bg-green-600 text-xs px-2 py-0.5 rounded">
                VERIFIED
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-2 mt-2 text-sm">
              <div>
                <p className="text-gray-400">Aadhaar Number</p>
                <p>XXXX-XXXX-4624</p>
              </div>
              <div>
                <p className="text-gray-400">Enrollment Number</p>
                <p>Not Available</p>
              </div>
              <div>
                <p className="text-gray-400">Date of Birth</p>
                <p>05 Jan 1997</p>
              </div>
              <div>
                <p className="text-gray-400">Name</p>
                <p>Prashant Sachan</p>
              </div>
            </div>
            <span className="text-sm text-blue-400 cursor-pointer block mt-2">
              2 file(s)
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default IdentityInformation;
