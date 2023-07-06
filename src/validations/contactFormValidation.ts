export const required = (value: undefined | string) =>
  value ? undefined : "Required";

export const minValue = (min: number) => (value: any) =>
  value.length >= min ? undefined : `Text should be bigger ${min} digit`;

export const composeValidators =
  (...validators: any) =>
  (value: any) =>
    validators.reduce(
      (error: string, validator: any) => error || validator(value),
      undefined
    );
