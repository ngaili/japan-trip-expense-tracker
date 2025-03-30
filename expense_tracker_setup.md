# Japan Trip Expense Tracker Setup Guide

## Overview
This document provides step-by-step instructions to set up your Japan trip expense tracker Google Sheet for your trip from October 11-20, 2025 with Dennis, Kick, LoB, Tak, Fok, Yuki, Danny and Terry.

## Sheet 1: Expense Log

### Column Structure:
1. **Date** (Column A)
2. **Category** (Column B)
3. **Description** (Column C)
4. **Amount** (Column D)
5. **Currency** (Column E)
6. **Amount (JPY)** (Column F)
7. **Paid By** (Column G)
8. **Split Among** (Column H)
9. **Amount Per Person (JPY)** (Column I)

### Setup Instructions:
1. Create header row with the column names above
2. Add data validation for Category (Column B):
   - Select Column B
   - Click Data → Data validation
   - Choose "List from a range" and enter: Food, Accommodation, Transportation, Activities, Shopping, Other
3. Add data validation for Currency (Column E):
   - Select Column E
   - Click Data → Data validation
   - Choose "List from a range" and enter: JPY, HKD
4. Add data validation for Paid By (Column G):
   - Select Column G
   - Click Data → Data validation
   - Choose "List from a range" and enter: Dennis, Kick, LoB, Tak, Fok, Yuki, Danny, Terry
5. Add formula to Column F (Amount in JPY) starting in cell F2:
   - `=IF(E2="JPY",D2,D2*VLOOKUP("HKD",Currency_Conversion!A:B,2,FALSE))`
6. Add formula to Column I (Amount Per Person) starting in cell I2:
   - `=IF(H2="All",F2/8,IF(COUNTIF(SPLIT(H2,","),"*")>0,F2/COUNTIF(SPLIT(H2,","),"*"),0))`

### Sample Data:
```
| Date       | Category      | Description      | Amount | Currency | Amount (JPY) | Paid By | Split Among     | Amount Per Person (JPY) |
|------------|---------------|------------------|--------|----------|--------------|---------|-----------------|-------------------------|
| 10/11/2025 | Transportation| Airport transfer | 5000   | JPY      | 5000         | Dennis  | All             | 625                     |
| 10/12/2025 | Food          | Dinner at Ramen  | 12000  | JPY      | 12000        | Kick    | Dennis,Kick,Tak,Yuki | 3000              |
| 10/13/2025 | Shopping      | Souvenirs        | 1500   | HKD      | 24000        | LoB     | All             | 3000                    |
```

## Sheet 2: Summary Dashboard

### Column Structure:
1. **Person** (Column A)
2. **Total Spent (JPY)** (Column B)
3. **Total Spent (HKD)** (Column C)
4. **Fair Share (JPY)** (Column D)
5. **Balance (JPY)** (Column E)
6. **Balance (HKD)** (Column F)
7. **Owes/Gets** (Column G)

### Setup Instructions:
1. Create header row with the column names above
2. Add names of all trip participants in Column A (rows 2-9)
3. Add formula to Column B (Total Spent JPY) starting in cell B2:
   - `=SUMIF(Expense_Log!G:G,A2,Expense_Log!F:F)`
4. Add formula to Column C (Total Spent HKD) starting in cell C2:
   - `=SUMIF(Expense_Log!G:G,A2,IF(Expense_Log!E:E="HKD",Expense_Log!D:D,Expense_Log!F:F/VLOOKUP("HKD",Currency_Conversion!A:B,2,FALSE)))`
5. Add formula to Column D (Fair Share JPY) starting in cell D2:
   - `=SUM(Expense_Log!F:F)/8`
6. Add formula to Column E (Balance JPY) starting in cell E2:
   - `=B2-D2`
7. Add formula to Column F (Balance HKD) starting in cell F2:
   - `=C2-D2*VLOOKUP("HKD",Currency_Conversion!A:C,3,FALSE)`
8. Add formula to Column G (Owes/Gets) starting in cell G2:
   - `=IF(E2<0,"Owes "&TEXT(ABS(E2),"¥#,##0"),"Gets "&TEXT(E2,"¥#,##0"))`

### Sample Layout:
```
| Person | Total Spent (JPY) | Total Spent (HKD) | Fair Share (JPY) | Balance (JPY) | Balance (HKD) | Owes/Gets |
|--------|-------------------|-------------------|------------------|---------------|---------------|-----------|
| Dennis |                   |                   |                  |               |               |           |
| Kick   |                   |                   |                  |               |               |           |
| LoB    |                   |                   |                  |               |               |           |
| Tak    |                   |                   |                  |               |               |           |
| Fok    |                   |                   |                  |               |               |           |
| Yuki   |                   |                   |                  |               |               |           |
| Danny  |                   |                   |                  |               |               |           |
| Terry  |                   |                   |                  |               |               |           |
```

## Sheet 3: Who Owes Whom

### Column Structure:
1. **Debtor** (Column A)
2. **Creditor** (Column B)
3. **Amount (JPY)** (Column C)
4. **Amount (HKD)** (Column D)
5. **Preferred Currency** (Column E)
6. **Settled?** (Column F)

### Setup Instructions:
1. Create header row with the column names above
2. Add data validation for Preferred Currency (Column E):
   - Select Column E
   - Click Data → Data validation
   - Choose "List from a range" and enter: JPY, HKD
3. Add checkbox for Settled (Column F)
   - Select Column F
   - Click Insert → Checkbox

### Sample Layout:
```
| Debtor | Creditor | Amount (JPY) | Amount (HKD) | Preferred Currency | Settled? |
|--------|----------|--------------|--------------|-------------------|----------|
|        |          |              |              |                   |          |
```

## Sheet 4: Currency Conversion

### Column Structure:
1. **Currency** (Column A)
2. **Rate to JPY** (Column B)
3. **Rate to HKD** (Column C)
4. **Last Updated** (Column D)

### Setup Instructions:
1. Create header row with the column names above
2. Add the currencies and current exchange rates:
   - Row 2: JPY, 1, 0.0625, [today's date]
   - Row 3: HKD, 16, 1, [today's date]

### Sample Layout:
```
| Currency | Rate to JPY | Rate to HKD | Last Updated |
|----------|-------------|-------------|--------------|
| JPY      | 1           | 0.0625      | 10/11/2025   |
| HKD      | 16          | 1           | 10/11/2025   |
```

## Sheet 5: Categories Summary

### Column Structure:
1. **Category** (Column A)
2. **Total (JPY)** (Column B)
3. **Total (HKD)** (Column C)
4. **Avg Per Day (JPY)** (Column D)
5. **Avg Per Day (HKD)** (Column E)
6. **% of Total** (Column F)

### Setup Instructions:
1. Create header row with the column names above
2. Add categories in Column A (rows 2-7): Food, Accommodation, Transportation, Activities, Shopping, Other
3. Add formula to Column B (Total JPY) starting in cell B2:
   - `=SUMIF(Expense_Log!B:B,A2,Expense_Log!F:F)`
4. Add formula to Column C (Total HKD) starting in cell C2:
   - `=SUMIF(Expense_Log!B:B,A2,IF(Expense_Log!E:E="HKD",Expense_Log!D:D,Expense_Log!F:F/VLOOKUP("HKD",Currency_Conversion!A:B,2,FALSE)))`
5. Add formula to Column D (Avg Per Day JPY) starting in cell D2:
   - `=B2/10` (10 days trip)
6. Add formula to Column E (Avg Per Day HKD) starting in cell E2:
   - `=C2/10`
7. Add formula to Column F (% of Total) starting in cell F2:
   - `=B2/SUM(B:B)`

### Sample Layout:
```
| Category      | Total (JPY) | Total (HKD) | Avg Per Day (JPY) | Avg Per Day (HKD) | % of Total |
|---------------|-------------|-------------|-------------------|-------------------|------------|
| Food          |             |             |                   |                   |            |
| Accommodation |             |             |                   |                   |            |
| Transportation|             |             |                   |                   |            |
| Activities    |             |             |                   |                   |            |
| Shopping      |             |             |                   |                   |            |
| Other         |             |             |                   |                   |            |
```

## Formatting Tips:
1. Format all currency cells to show appropriate currency symbols
2. Use conditional formatting in the Summary Dashboard to highlight:
   - Red for negative balances
   - Green for positive balances
3. Add totals at the bottom of important columns
4. Consider freezing the top row in each sheet

## Usage Tips:
1. For the "Split Among" column, enter either "All" for all participants or a comma-separated list of names
2. Update currency exchange rates regularly
3. Take photos of receipts during the trip and update the sheet daily
4. Use the Categories Summary to track spending trends
5. Use the Who Owes Whom sheet to settle debts at the end of the trip