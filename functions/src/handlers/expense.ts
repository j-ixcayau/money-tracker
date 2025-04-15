// src/handlers/expense.ts
import { Request, Response } from "express";
import { ExpenseSchema } from "../types/expense.js";
import { saveExpense, saveRawExpense } from "../services/firebase.js";

export async function handleExpenseTracking(req: Request, res: Response) {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).send();
    return;
  }

  try {
    const rawData = req.body;
    console.log(rawData);

    // Check if all required fields are present
    const hasRequiredFields =
      rawData.card && rawData.merchant && rawData.amount && rawData.name;

    if (!hasRequiredFields) {
      // If any required field is missing, save as raw expense
      await saveRawExpense(rawData);
      res.status(202).send();
      return;
    }

    // Try to parse as a valid expense
    const parseResult = ExpenseSchema.safeParse(rawData);

    if (parseResult.success) {
      await saveExpense(parseResult.data);
      res.status(201).send();
    } else {
      // If validation fails, save as raw expense
      await saveRawExpense(rawData);
      res.status(202).send();
    }
  } catch (error) {
    console.error("Error processing expense:", error);
    res.status(500).send();
  }
}
