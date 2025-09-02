import IdentityInformation from "./identityInformation";
import StatutoryInformation from "./statutoryInformation";

const Summary = () => {
  return (
    <div className=" bg-[#0d1b2a] text-white p-6">
      <div className="bg-[#1b263b] rounded-lg p-3 border border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Payroll summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <div>
            <p className="text-gray-400">Last Processed Cycle</p>
            <p>Jul 2025 (01 Jul - 31 Jul)</p>
          </div>
          <div>
            <p className="text-gray-400">Working Days</p>
            <p>23</p>
          </div>
          <div>
            <p className="text-gray-400">Loss of Pay</p>
            <p>0</p>
          </div>
          <div>
            <p className="text-gray-400">Payslip</p>
            <a href="#" className="text-blue-400 hover:underline">
              View payslip
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Payment Information */}
          <div className="bg-[#1b263b] rounded-lg p-5 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            <div>
              <p className="text-sm text-gray-400">Salary Payment Mode</p>
              <p className="mb-3">Bank Transfer</p>
            </div>

            <h3 className="font-medium mb-2">Bank Information</h3>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <p className="text-gray-400">Bank Name</p>
                <p>Kotak Mahindra Bank Limited</p>
              </div>
              <div>
                <p className="text-gray-400">Account Number</p>
                <p>9449302012</p>
              </div>
              <div>
                <p className="text-gray-400">IFSC Code</p>
                <p>KKBK0000839</p>
              </div>
              <div>
                <p className="text-gray-400">Name on the Account</p>
                <p>Prashant Sachan</p>
              </div>
              <div>
                <p className="text-gray-400">Branch</p>
                <p>N/A</p>
              </div>
            </div>
          </div>
          <StatutoryInformation />
        </div>

        {/* Right Column */}
        <IdentityInformation />
      </div>
    </div>
  );
};

export default Summary;
