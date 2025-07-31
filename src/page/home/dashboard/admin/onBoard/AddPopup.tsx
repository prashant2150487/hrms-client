import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const AddPopup = () => {
  return (
    <>
      <div className="sm:max-w-[425px]">
        <div>
          <h2>Add Depertment name</h2>
          <h3>
            Make changes to your profile here. Click save when you&apos;re done.
          </h3>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Depertment</Label>
            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
          </div>
        </div>
        <div className=" flex items-center justify-end">
          <div>
            <Button variant="outline">Cancel</Button>
          </div>
          <Button type="submit">Save changes</Button>
        </div>
      </div>
    </>
  );
};

export default AddPopup;
