# Money Tracker

A Firebase-based expense tracking application that integrates with Apple Wallet payments.

## Features

- Track expenses from Apple Wallet payments
- Store data in Firebase Firestore
- REST API endpoint for manual expense tracking
- Automatic handling of incomplete data
- CORS support for cross-origin requests

## Setup

1. Install dependencies:

   ```bash
   cd functions
   npm install
   ```

2. Initialize Firebase project:

   ```bash
   firebase init functions
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Deploy to Firebase:
   ```bash
   npm run deploy
   ```

## API Documentation

### Track Expense

**Endpoint:** `POST /trackExpense`

**Headers:**

- `Content-Type: application/json`

**Required Fields:**

```json
{
  "card": "Apple Card", // Card or pass identifier
  "merchant": "Store Name", // Merchant name
  "amount": 99.99, // Amount (number or string)
  "name": "Purchase Description" // Transaction description
}
```

**Response Codes:**

- 201: Successfully created expense
- 202: Saved as raw expense (incomplete data)
- 405: Method not allowed
- 500: Internal server error

## Data Model

### Valid Expense

- Stored in `expenses` collection
- Contains all required fields
- Includes server timestamp

### Raw Expense

- Stored in `raw_expenses` collection
- Used when data is incomplete or invalid
- Includes server timestamp
- Available for later review

## iOS Shortcut Setup

1. Create a new shortcut
2. Add "Get Wallet Pass" action
3. Add "Get Contents of URL" action
   - URL: Your Firebase Function URL
   - Method: POST
   - Headers: Content-Type: application/json
   - Request Body: JSON with expense data
4. Add "Show Result" action to view the response

## Development

- `npm run build`: Build the project
- `npm run serve`: Start local emulator
- `npm run deploy`: Deploy to Firebase
- `npm run logs`: View Firebase logs
