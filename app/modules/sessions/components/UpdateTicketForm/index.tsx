import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Ticket } from '~/shared/session-state.interface';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { cn } from '~/lib/utils';

import { useUpdateTicketMutation } from '../../mutations/useUpdateTicketMutation';
import { FormSchema, formSchema } from './types';

type UpdateTicketFormParams = {
  onSuccess: (data: Ticket) => void;
  defaultValues: Partial<FormSchema> & { id: string };
};
export function UpdateTicketForm({
  onSuccess,
  defaultValues,
}: UpdateTicketFormParams) {
  const { mutate, isLoading } = useUpdateTicketMutation({ onSuccess });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn(['flex flex-col gap-2 items-baseline justify-center'])}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
