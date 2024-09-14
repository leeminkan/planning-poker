import { useNavigate } from "@remix-run/react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

import { ConfirmationForm } from "../components/ConfirmationForm";
import { useStartNewSessionMutation } from "~/modules/sessions/mutations/useCreateSession";

export const HomePage = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useStartNewSessionMutation({
    onSuccess: (data) => {
      return navigate(`/sessions/${data.id}`);
    },
  });

  return (
    <div className="w-full">
      <header
        title="page-header"
        className={cn([
          "w-full p-4",
          "bg-white shadow-md",
          "flex items-center justify-between",
        ])}
      >
        <div>Home</div>
        <Button
          onClick={() => {
            mutate();
          }}
          disabled={isLoading}
        >
          Start new session!
        </Button>
      </header>
      <div
        title="page-body"
        className={cn([
          "w-full h-full mt-4",
          "flex items-center justify-center",
        ])}
      >
        <ConfirmationForm />
      </div>
    </div>
  );
};
