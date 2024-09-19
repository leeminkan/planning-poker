import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Switch } from '~/components/ui/switch';
import { cn } from '~/lib/utils';

import { useSetupJiraSyncApiMutation } from '../../mutations/useSetupJiraSyncApiMutation';
import { FormSchema, formSchema } from './types';

type SetupJiraSyncFormParams = {
  onSuccess: () => void;
  defaultValues: Partial<FormSchema>;
};
export function SetupJiraSyncForm({
  onSuccess,
  defaultValues,
}: SetupJiraSyncFormParams) {
  const { mutate, isLoading } = useSetupJiraSyncApiMutation({ onSuccess });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit({
    enableSync,
    ...mappingFields
  }: z.infer<typeof formSchema>) {
    mutate({ enableSync, mappingFields });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn(['flex flex-col gap-2 items-baseline justify-center'])}
        >
          <FormField
            control={form.control}
            name="enableSync"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-1">
                <FormLabel>Enable Sync</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pointField"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Point Field</FormLabel>
                <FormControl>
                  <Input placeholder="customfield_10026" {...field} />
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
