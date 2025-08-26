import { Link } from "react-router-dom";

interface SecondaryHeaderProps {
  data: {
    title: string;
    url: string;
  }[];
}

const SecondaryHeader = ({ data }: SecondaryHeaderProps) => {
  return (
    <div className="bg-gray-200 px-4 py-2 border-b-1 border-gray-400 ">
      <div className="flex gap-4 font-medium text-sm">
        {data.map((item,index) => (
          <Link to={item.url} key={index}>
            {item?.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SecondaryHeader;
