import { z } from "zod";

// Complete expense schema with required fields
export const ExpenseSchema = z.object({
  card: z.string(), // Required field for either card or pass information
  merchant: z.string(),
  amount: z.union([
    z.number().positive(),
    z.string().transform((val) => {
      const num = parseFloat(val);
      if (isNaN(num)) throw new Error("Invalid amount");
      return num;
    }),
  ]),
  name: z.string(),
});

export type Expense = z.infer<typeof ExpenseSchema>;

// Schema for raw/incomplete data
export const RawExpenseSchema = z.record(z.unknown());

export type RawExpense = z.infer<typeof RawExpenseSchema>;
