import { z } from "zod";

export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const insertContactSubmissionSchema = z.object({
  name: z.string().min(1),
  contact: z.string().min(1),
  message: z.string().min(1),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
