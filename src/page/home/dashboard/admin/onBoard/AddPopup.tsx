import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";
interface Props {
  setShowAddPopup: (value: boolean) => void;
  showAddPopup: boolean;
  popupTitle: string;
  handleUpdate: (value1: string, value2: string) => void;
}
const AddPopup = ({
  setShowAddPopup,
  showAddPopup,
  popupTitle,
  handleUpdate,
}: Props) => {
  const [name, setName] = useState<string>("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-[600px] bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-6">
        <div>
          <div className="flex item-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Add {popupTitle} Name
            </h2>
            <X
              className="cursor-pointer"
              onClick={() => setShowAddPopup(!showAddPopup)}
            />
          </div>
          <h3 className="text-sm text-gray-500">
            Make changes to your profile here. Click save when you&apos;re done.
          </h3>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="name-1"
              className="text-md font-medium text-gray-700"
            >
              {popupTitle}
            </Label>
            <Input
              onChange={(e) => setName(e.target.value)}
              id="name-1"
              name="name"
              placeholder={`Enter ${popupTitle} name`}
              defaultValue=""
              className="border-gray-300 focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            className=" cursor-pointer"
            onClick={() => setShowAddPopup(!showAddPopup)}
          >
            Cancel
          </Button>
          <Button
            className=" shadow-md cursor-pointer"
            onClick={() => {
              setShowAddPopup(false);
              handleUpdate(popupTitle, name);
              
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPopup;
