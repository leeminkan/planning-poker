import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { formSchema } from "./types";
import { cn } from "~/lib/utils";

type ResultFormParams = {
  averagePoint: number;
  onReset: () => void;
};
export function ResultForm({ averagePoint, onReset }: ResultFormParams) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      finalPoint: Math.floor(averagePoint),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    alert(values.finalPoint);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn([
            "p-4",
            "flex gap-2 items-baseline justify-center",
            "border-solid border-2",
          ])}
        >
          <div className={cn(["flex gap-2 items-center justify-center"])}>
            <FormLabel>Average</FormLabel>
            <div>{averagePoint}</div>
          </div>
          <FormField
            control={form.control}
            name="finalPoint"
            render={({ field }) => (
              <FormItem>
                <div className={cn(["flex gap-2 items-center justify-center"])}>
                  <FormLabel>Final</FormLabel>
                  <FormControl>
                    <Input className="w-20" placeholder="Final" {...field} />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">Save & Next</Button>
          <Button onClick={onReset}>Reset</Button>
        </div>
      </form>
    </Form>
  );
}
