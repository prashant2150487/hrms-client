const Spinner = (props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-10 bg-transparent">
      <svg
        width={64}
        height={64}
        stroke="#000"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <style>
          {
            ".spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}.spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}"
          }
        </style>
        <g className="spinner_V8m1">
          <circle cx={12} cy={12} r={9.5} fill="none" strokeWidth={2} />
        </g>
      </svg>
    </div>
  );
};

export default Spinner;
