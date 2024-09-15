import { useNavigate } from "@remix-run/react";
import { toast } from "react-toastify";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

export const PageHeader = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  return (
    <header
      title="page-header"
      className={cn([
        "p-4",
        "flex items-center justify-between",
        "bg-white shadow-md",
      ])}
    >
      <Button onClick={() => navigate(-1)}>Back</Button>
      <div>Session: {id}</div>
      <div>
        <Button
          onClick={() => {
            navigator.clipboard
              .writeText(`http://localhost:3000/sessions/${id}`)
              .then(() => {
                toast("Copy successfully!");
              });
          }}
        >
          Copy Link
        </Button>
      </div>
    </header>
  );
};
