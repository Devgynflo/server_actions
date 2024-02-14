import { Metadata } from "next";
import { NewJobForm } from "./_components/NewJobForm";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default function NewJob() {
  return (
      <NewJobForm />
  );
}
