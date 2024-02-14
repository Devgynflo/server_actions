import { jobTypes, locationTypes } from "@/lib/job-types";
import { z } from "zod";

const requiredString = z.string().min(1, "Required");
const compagnyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2; // 2MB
  }, "Image must be less than 2MB");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");
const applicationSchema = z
  .object({
    applicationEmail: z
      .string()
      .max(100, "Email is too long")
      .email("Invalid email")
      .optional()
      .or(z.literal("")),
    applicationUrl: z
      .string()
      .max(100, "Url is too long")
      .url("Invalid url")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or URL is required",
    path: ["applicationEmail"],
  });
const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100, "Location is too long").optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.location || data.locationType === "Remote",
    {
      message: "Location is required",
      path: ["location"],
    },
  );

export const createJobSchema = z
  .object({
    title: requiredString.max(100, "Too long"),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type",
    ),
    companyName: requiredString.max(100, "Too long"),
    companyLogo: compagnyLogoSchema,
    description: z.string().max(5000, "Too long").optional(),
    salary: numericRequiredString.max(9, "Number can't be longer tan 9 digits"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValue = z.infer<typeof jobFilterSchema>;
