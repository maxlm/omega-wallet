import { useForm } from 'react-hook-form';
import { PasswordInput } from '../form/PasswordInput';

export type CreatePasswordFormProps = {
  onSubmit: (data: any) => void | Promise<void>;
  actionTitle: string;
};

function getError<T>(errors: any, field: keyof T) {
  const err = errors[field];
  if (!err) {
    return null;
  }
  if (err.message) {
    return err.message;
  }
  return null;
}

export const CreatePasswordForm = (props: CreatePasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<{ password: string; reEnterPassword: string }>();
  const watchAllFields = watch();

  const { onSubmit, actionTitle } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="section">
        <h2 className="section-title">Create password</h2>

        <PasswordInput
          label=""
          placeholder="Enter password"
          name="password"
          error={getError(errors, 'password')}
          inputRef={register('password', {
            validate: {
              requiredPassword: (val: string) => {
                return (val || '').trim().length == 0 ? 'password cannot be empty' : undefined;
              },
            },
          })}
        />
        <PasswordInput
          label=""
          placeholder="Repeat password"
          name="reEnterPassword"
          error={getError(errors, 'reEnterPassword')}
          inputRef={register('reEnterPassword', {
            required: true,
            validate: {
              reEnteredNewPassword: (val: string) => {
                return watchAllFields.password === val ? undefined : "password and repeated password don't match";
              },
            },
          })}
        />
      </div>
      <div className="section">
        <button disabled={isSubmitting} type="submit" className="btn btn-primary w-full">
          {actionTitle}
        </button>
      </div>
    </form>
  );
};
