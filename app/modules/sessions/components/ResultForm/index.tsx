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
import { cn } from '~/lib/utils';

import { useUpdateTicketMutation } from '../../mutations/useUpdateTicketMutation';
import { formSchema } from './types';

type ResultFormParams = {
  currentTicketId: string;
  averagePoint: number;
  onReset: () => void;
  onSuccess: (data: Ticket) => void;
};
export function ResultForm({
  currentTicketId,
  averagePoint,
  onReset,
  onSuccess,
}: ResultFormParams) {
  const { mutate, isLoading } = useUpdateTicketMutation({ onSuccess });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      point: Math.floor(averagePoint),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ id: currentTicketId, ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn([
            'p-4',
            'flex gap-2 items-baseline justify-center',
            'border-solid border-2',
          ])}
        >
          <div className={cn(['flex gap-2 items-center justify-center'])}>
            <FormLabel>Average</FormLabel>
            <div>{averagePoint}</div>
          </div>
          <FormField
            control={form.control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <div className={cn(['flex gap-2 items-center justify-center'])}>
                  <FormLabel>Final</FormLabel>
                  <FormControl>
                    <Input className="w-20" placeholder="Final" {...field} />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
          <Button onClick={onReset} disabled={isLoading}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
