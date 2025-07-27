import { Link } from "react-router-dom";

interface SecondaryHeaderProps {
  data: string[];
}

const SecondaryHeader = ({ data }: SecondaryHeaderProps) => {
  return (
    <div className="bg-gray-200 px-4 py-2 border-b-1 border-gray-400 ">
      <div className="flex gap-4 font-medium text-sm">
        {data.map((item) => (
          <Link to={`/dashboard/${item.toLowerCase()}`} key={item}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SecondaryHeader;
