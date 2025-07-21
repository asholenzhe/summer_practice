import { BaseForm } from '@/components/base-form/BaseForm.tsx';
import { useProfileForm } from '@/hooks/useProfileForm.ts';
import { profileFields } from '@/profileFields.ts';

export function Profile() {
  const { form, onSubmit } = useProfileForm();
  return (
    <div
      className="flex items-center justify-center
        w-full py-8
        px-4 sm:px-8 md:px-12"
    >
      <div className="w-full max-w-sm mx-auto">
        <BaseForm
          form={form}
          fields={profileFields}
          onSubmit={onSubmit}
          submitText="Save"
          title="Profile"
          description="Edit your profile"
        />
      </div>
    </div>
  );
}
