// src/services/firebase.ts
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import type { Expense, RawExpense } from "../types/expense.js";

initializeApp();
const db = getFirestore();

const EXPENSES_COLLECTION = "expenses";
const RAW_EXPENSES_COLLECTION = "raw_expenses";

export async function saveExpense(expense: Expense): Promise<string> {
  const docRef = await db.collection(EXPENSES_COLLECTION).add({
    ...expense,
    timestamp: FieldValue.serverTimestamp(),
  });
  return docRef.id;
}

export async function saveRawExpense(data: RawExpense): Promise<string> {
  const docRef = await db.collection(RAW_EXPENSES_COLLECTION).add({
    ...data,
    timestamp: FieldValue.serverTimestamp(),
  });
  return docRef.id;
}
