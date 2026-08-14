// State variables to track financials
let totalIncome = 0;
let totalExpense = 0;

// Grab DOM elements
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');

const totalBalanceEl = document.getElementById('total-balance');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');

// Function to update the 3 summary cards
function updateSummary() {
    const balance = totalIncome - totalExpense;
    
    totalBalanceEl.textContent = `₹${balance.toFixed(2)}`;
    totalIncomeEl.textContent = `₹${totalIncome.toFixed(2)}`;
    totalExpenseEl.textContent = `₹${totalExpense.toFixed(2)}`;
}

// Handle Form Submission
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    const desc = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (!desc || isNaN(amount) || amount <= 0) return;

    // Create table row
    const row = document.createElement('tr');

    if (type === 'income') {
        totalIncome += amount;
        row.innerHTML = `
            <td>${desc}</td>
            <td><span class="badge-income">Income</span></td>
            <td class="badge-income">+₹${amount.toFixed(2)}</td>
            <td><button class="btn-delete">Delete</button></td>
        `;
    } else {
        totalExpense += amount;
        row.innerHTML = `
            <td>${desc}</td>
            <td><span class="badge-expense">Expense</span></td>
            <td class="badge-expense">-₹${amount.toFixed(2)}</td>
            <td><button class="btn-delete">Delete</button></td>
        `;
    }

    // Add row to table
    transactionList.appendChild(row);

    // Add delete functionality to the button
    row.querySelector('.btn-delete').addEventListener('click', function () {
        if (type === 'income') {
            totalIncome -= amount;
        } else {
            totalExpense -= amount;
        }
        row.remove();
        updateSummary();
    });

    // Reset Form & Update Cards
    form.reset();
    updateSummary();
});