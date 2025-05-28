"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

const AddProjecBtn = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleAddProject = async () => {
    if (!value) return;

    try {
      await api.post("/project/add", { repoPath: value });
      router.refresh();
      toast("Success add new project");
    } catch (error) {
      console.log(error);
      toast("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="flex items-center gap-3">
          Add project
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Name repository</DialogTitle>
          <DialogDescription>
            Maintain the name of the repository e.g. facebook/react
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            value={value}
            onChange={(e) => {
              const value = e.target.value;
              setValue(value);
            }}
            placeholder="e.g. facebook/react"
          />

          <Button type="button" onClick={handleAddProject}>
            Add project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjecBtn;
