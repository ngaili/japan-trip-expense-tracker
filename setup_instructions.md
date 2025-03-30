# Japan Trip Expense Tracker - Setup Instructions

## Quick Setup

1. Go to [this Google Sheets template](https://docs.google.com/spreadsheets/d/1JV5_OY6FfnMhQzLXeJO5wcjA8p_nM82e3BrZTDOodPM/copy)
2. Click "Make a copy" to save it to your Google Drive
3. Start using it right away!

## Sheet Details

### 1. Expense Log
```
| Date | Category | Description | Amount | Currency | Amount (JPY) | Paid By | Split Among | Amount Per Person (JPY) |
|------|----------|-------------|--------|----------|--------------|---------|-------------|-------------------------|
| 10/11/2025 | Transportation | Airport transfer | 5000 | JPY | 5000 | Dennis | All | 625 |
| 10/12/2025 | Food | Dinner at Ramen shop | 12000 | JPY | 12000 | Kick | Dennis, Kick, Tak, Yuki | 3000 |
| 10/13/2025 | Shopping | Souvenirs | 1500 | HKD | 24000 | LoB | All | 3000 |
```

### 2. Summary Dashboard
```
| Person | Total Spent (JPY) | Total Spent (HKD) | Fair Share (JPY) | Balance (JPY) | Balance (HKD) | Owes/Gets |
|--------|-------------------|-------------------|------------------|---------------|---------------|-----------|
| Dennis |                   |                   |                  |               |               |           |
| Kick   |                   |                   |                  |               |               |           |
| LoB    |                   |                   |                  |               |               |           |
```

### 3. Who Owes Whom
```
| Debtor | Creditor | Amount (JPY) | Amount (HKD) | Preferred Currency | Settled? |
|--------|----------|--------------|--------------|-------------------|----------|
|        |          |              |              |                   |          |
```

### 4. Currency Conversion
```
| Currency | Rate to JPY | Rate to HKD | Last Updated |
|----------|-------------|-------------|--------------|
| JPY      | 1           | 0.0625      | 10/11/2025   |
| HKD      | 16          | 1           | 10/11/2025   |
```

### 5. Categories Summary
```
| Category | Total (JPY) | Total (HKD) | Avg Per Day (JPY) | Avg Per Day (HKD) | % of Total |
|----------|-------------|-------------|-------------------|-------------------|------------|
| Food     |             |             |                   |                   |            |
| Accommodation |        |             |                   |                   |            |
```

## Key Formulas

### Expense Log:
- Amount (JPY): `=IF(E2="JPY",D2,D2*VLOOKUP("HKD",Currency_Conversion!A:B,2,FALSE))`
- Amount Per Person: `=IF(H2="All",F2/8,IF(COUNTIF(SPLIT(H2,","),"*")>0,F2/COUNTIF(SPLIT(H2,","),"*"),0))`

### Summary Dashboard:
- Total Spent (JPY): `=SUMIF(Expense_Log!G:G,A2,Expense_Log!F:F)`
- Total Spent (HKD): `=SUMIF(Expense_Log!G:G,A2,IF(Expense_Log!E:E="HKD",Expense_Log!D:D,Expense_Log!F:F/VLOOKUP("HKD",Currency_Conversion!A:B,2,FALSE)))`
- Fair Share (JPY): `=SUM(Expense_Log!F:F)/8`
- Balance (JPY): `=B2-D2`
- Balance (HKD): `=C2-D2*VLOOKUP("HKD",Currency_Conversion!A:C,3,FALSE)`

### Categories Summary:
- Total (JPY): `=SUMIF(Expense_Log!B:B,A2,Expense_Log!F:F)`
- Total (HKD): `=SUMIF(Expense_Log!B:B,A2,IF(Expense_Log!E:E="HKD",Expense_Log!D:D,Expense_Log!F:F/VLOOKUP("HKD",Currency_Conversion!A:B,2,FALSE)))`

## Data Entry Guidelines

1. **Expense Log**:
   - Enter the date, category, description, amount, and currency for each expense
   - Select who paid for the expense
   - Specify who the expense should be split among (comma separated names or "All")
   - The sheet will automatically calculate the per-person amount

2. **Currency Conversion**:
   - Update the exchange rates before and during your trip as needed
   - Current default: 1 HKD = 16 JPY (adjust as needed)

3. **Who Owes Whom**:
   - After entering all expenses, this sheet will help determine who needs to pay whom
   - Mark settlements as "Settled" when completed

Enjoy your trip to Japan from October 11-20, 2025!