"use client";

import { LoadingButton } from "@/app/jobs/new/_components/LoadingButton";
import { useFormStatus } from "react-dom";

export const FormSubmitButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { pending } = useFormStatus();

  return (<LoadingButton {...props} type="submit"  loading={pending}/>)
};
