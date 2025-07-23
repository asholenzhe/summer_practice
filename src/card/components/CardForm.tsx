import { Input } from '@/ui-kit/Input.tsx';
import { Button } from '@/ui-kit/Button.tsx';
import { BaseForm } from '@/ui-kit/base-form/BaseForm.tsx';
import { cardFields } from '@/card/constants/cardFields.ts';
import { type CreateCardFormValues, useCreateCardForm } from '@/card/hooks/useCreateCardForm.ts';
import { FormLabel } from '@/ui-kit/form/FormLabel.tsx';

export function CardForm({ onSuccess }: { onSuccess?: () => void }) {
  const { form, onSubmit, loading, error, clearError } = useCreateCardForm();

  const handleSubmit = async (values: CreateCardFormValues) => {
    await onSubmit(values);
    onSuccess?.();
  };

  const { watch, setValue, formState } = form;
  const examples: string[] = watch('examples') ?? [];

  return (
    <BaseForm
      form={form}
      onSubmit={handleSubmit}
      fields={cardFields}
      submitText="Save"
      isLoading={loading}
      disabled={!formState.isValid || loading}
      error={error}
      clearError={clearError}
    >
      <div className="space-y-2">
        <FormLabel>Examples</FormLabel>
        {examples.map((_, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              {...form.register(`examples.${idx}` as const)}
              placeholder="Example"
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-base w-full"
            />
            <Button
              type="button"
              onClick={() =>
                setValue(
                  'examples',
                  examples.filter((_, i) => i !== idx),
                  { shouldValidate: true },
                )
              }
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => setValue('examples', [...examples, ''], { shouldValidate: true })}
        >
          + Add Example
        </Button>
      </div>
    </BaseForm>
  );
}
