import { Input } from '@/ui-kit/Input.tsx';
import { BaseForm } from '@/ui-kit/base-form/BaseForm.tsx';
import { cardFields } from '@/card/constants/cardFields.ts';
import { type CreateCardFormValues, useCreateCardForm } from '@/card/hooks/useCreateCardForm.ts';
import { FormLabel } from '@/ui-kit/form/FormLabel.tsx';
import AddIcon from '@/assets/add-logo.svg';
import TrashIcon from '@/assets/recycle-bin-logo.png';

export function CardForm({ onSuccess }: { onSuccess?: () => void }) {
  const { form, onSubmit, isLoading, error, clearError } = useCreateCardForm();
  const { register, watch, setValue, formState } = form;
  const examples: string[] = watch('examples') || [];

  function handleRemove(index: number) {
    const newExamples = examples.filter((_, i) => i !== index);
    setValue('examples', newExamples, { shouldValidate: true });
  }

  function handleAdd() {
    setValue('examples', [...examples, ''], { shouldValidate: true });
  }

  const canAdd =
    examples.every((example) => example.trim() !== '') &&
    new Set(examples.map((example) => example.trim())).size === examples.length;

  const handleSubmit = async (values: CreateCardFormValues) => {
    await onSubmit(values);
    onSuccess?.();
  };

  return (
    <BaseForm
      form={form}
      onSubmit={handleSubmit}
      fields={cardFields}
      submitText="Save"
      isLoading={isLoading}
      disabled={!formState.isValid || isLoading}
      error={error}
      clearError={clearError}
    >
      <div className="space-y-2">
        <FormLabel>Examples</FormLabel>
        {examples.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              {...register(`examples.${index}` as const)}
              placeholder="Example"
              defaultValue={value}
              className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-base"
            />
            <button
              onClick={() => handleRemove(index)}
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <img src={TrashIcon} alt="Remove example" className="h-7 w-7" />
            </button>
          </div>
        ))}
        <button
          onClick={handleAdd}
          disabled={!canAdd}
          type="button"
          className="flex items-center gap-1 px-2 py-2 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <img src={AddIcon} alt="Add example" className="h-5 w-5" />
          <span className="whitespace-nowrap">Add example</span>
        </button>
      </div>
    </BaseForm>
  );
}
