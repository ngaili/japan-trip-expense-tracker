/**
 * Japan Trip Expense Tracker - Google Apps Script
 * 
 * This script adds additional functionality to the expense tracker,
 * including settlement calculations and currency updates.
 */

/**
 * Creates a custom menu when the spreadsheet is opened
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Expense Tools')
      .addItem('Calculate Settlements', 'calculateSettlements')
      .addItem('Update Exchange Rates', 'updateExchangeRates')
      .addItem('Create Summary Report', 'createSummaryReport')
      .addToUi();
}

/**
 * Calculates optimal settlements between trip members
 */
function calculateSettlements() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var summarySheet = ss.getSheetByName('Summary Dashboard');
  var settlementSheet = ss.getSheetByName('Who Owes Whom');
  
  // Clear previous settlements
  settlementSheet.getRange(2, 1, settlementSheet.getLastRow(), 6).clearContent();
  
  // Get balances for each person
  var people = [];
  var balances = [];
  
  var dataRange = summarySheet.getRange(2, 1, 8, 5);
  var data = dataRange.getValues();
  
  for (var i = 0; i < data.length; i++) {
    people.push(data[i][0]);
    balances.push({name: data[i][0], balance: data[i][4]});
  }
  
  // Calculate settlements
  var settlements = calculateOptimalSettlements(balances);
  
  // Update settlements sheet
  for (var i = 0; i < settlements.length; i++) {
    var rowNum = i + 2;
    settlementSheet.getRange(rowNum, 1).setValue(settlements[i].from);
    settlementSheet.getRange(rowNum, 2).setValue(settlements[i].to);
    settlementSheet.getRange(rowNum, 3).setValue(settlements[i].amount);
    
    // Calculate HKD equivalent
    var jpyToHkd = ss.getSheetByName('Currency Conversion').getRange(2, 3).getValue();
    settlementSheet.getRange(rowNum, 4).setValue(settlements[i].amount * jpyToHkd);
  }
  
  SpreadsheetApp.getUi().alert('Settlements calculated!');
}

/**
 * Helper function to determine optimal settlements
 */
function calculateOptimalSettlements(balances) {
  // Sort by balance (ascending)
  balances.sort(function(a, b) { return a.balance - b.balance; });
  
  var settlements = [];
  var debtors = [];
  var creditors = [];
  
  // Separate debtors and creditors
  for (var i = 0; i < balances.length; i++) {
    if (balances[i].balance < 0) {
      debtors.push({name: balances[i].name, amount: Math.abs(balances[i].balance)});
    } else if (balances[i].balance > 0) {
      creditors.push({name: balances[i].name, amount: balances[i].balance});
    }
  }
  
  // Match debtors with creditors
  while (debtors.length > 0 && creditors.length > 0) {
    var debtor = debtors[0];
    var creditor = creditors[0];
    
    var amount = Math.min(debtor.amount, creditor.amount);
    
    if (amount > 0) {
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: Math.round(amount)
      });
    }
    
    debtor.amount -= amount;
    creditor.amount -= amount;
    
    if (debtor.amount <= 1) debtors.shift();
    if (creditor.amount <= 1) creditors.shift();
  }
  
  return settlements;
}

/**
 * Updates exchange rates from external API
 */
function updateExchangeRates() {
  try {
    // This would normally use an API, but for demo purposes we'll use static values
    var jpyToHkd = 0.0625; // 1 JPY = 0.0625 HKD
    var hkdToJpy = 16;     // 1 HKD = 16 JPY
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var conversionSheet = ss.getSheetByName('Currency Conversion');
    
    conversionSheet.getRange(1, 2).setValue(1);      // JPY to JPY
    conversionSheet.getRange(1, 3).setValue(jpyToHkd); // JPY to HKD
    conversionSheet.getRange(2, 2).setValue(hkdToJpy); // HKD to JPY
    conversionSheet.getRange(2, 3).setValue(1);      // HKD to HKD
    
    var today = new Date();
    conversionSheet.getRange(1, 4).setValue(today);
    conversionSheet.getRange(2, 4).setValue(today);
    
    SpreadsheetApp.getUi().alert('Exchange rates updated!');
  } catch (e) {
    SpreadsheetApp.getUi().alert('Error updating exchange rates: ' + e.toString());
  }
}

/**
 * Creates a summary report in a new sheet
 */
function createSummaryReport() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Check if report already exists and delete it
  var existingReport = ss.getSheetByName('Trip Summary Report');
  if (existingReport) ss.deleteSheet(existingReport);
  
  // Create new report sheet
  var reportSheet = ss.insertSheet('Trip Summary Report');
  
  // Add title
  reportSheet.getRange(1, 1).setValue('JAPAN TRIP SUMMARY - October 11-20, 2025');
  reportSheet.getRange(1, 1).setFontSize(16).setFontWeight('bold');
  
  // Add sections
  reportSheet.getRange(3, 1).setValue('TOTAL EXPENSES:');
  reportSheet.getRange(3, 1).setFontWeight('bold');
  
  // Get total from expense log
  var expenseSheet = ss.getSheetByName('Expense Log');
  var totalJPY = '=SUM(Expense_Log!F:F)';
  reportSheet.getRange(3, 2).setFormula(totalJPY);
  
  // Add more report content
  reportSheet.getRange(5, 1).setValue('TOP SPENDING CATEGORIES:');
  reportSheet.getRange(5, 1).setFontWeight('bold');
  
  // Format report
  reportSheet.autoResizeColumns(1, 5);
  
  SpreadsheetApp.getUi().alert('Summary report created!');
}