import { onRequest } from "firebase-functions/v2/https";
import { handleExpenseTracking } from "./handlers/expense.js";

export const trackExpense = onRequest(handleExpenseTracking);
