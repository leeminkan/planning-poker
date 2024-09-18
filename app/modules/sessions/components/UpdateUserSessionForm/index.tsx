import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { UserSessionStateInterface } from '~/shared/user-session.interface';

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
import { useUpdateUserSessionStateMutation } from '~/modules/user-session/mutations/useUpdateUserSessionMutation';

import { FormSchema, formSchema } from './types';

type UpdateUserSessionFormParams = {
  onSuccess: (data: UserSessionStateInterface) => void;
  defaultValues: Partial<FormSchema> & { id: string };
};
export function UpdateUserSessionForm({
  onSuccess,
  defaultValues,
}: UpdateUserSessionFormParams) {
  const { mutate, isLoading } = useUpdateUserSessionStateMutation({
    onSuccess,
  });

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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
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
