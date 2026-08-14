// Grab DOM elements
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');

const totalBalanceEl = document.getElementById('total-balance');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');

// 1. Fetch saved transactions from LocalStorage (or default to empty list)
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// 2. Function to save current transactions array to LocalStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// 3. Function to update UI and recalculate totals
function updateUI() {
    // Clear current list on screen
    transactionList.innerHTML = '';

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction, index) => {
        const amount = parseFloat(transaction.amount);
        const row = document.createElement('tr');

        if (transaction.type === 'income') {
            totalIncome += amount;
            row.innerHTML = `
                <td>${transaction.description}</td>
                <td><span class="badge-income">Income</span></td>
                <td class="badge-income">+₹${amount.toFixed(2)}</td>
                <td><button class="btn-delete" onclick="deleteTransaction(${index})">Delete</button></td>
            `;
        } else {
            totalExpense += amount;
            row.innerHTML = `
                <td>${transaction.description}</td>
                <td><span class="badge-expense">Expense</span></td>
                <td class="badge-expense">-₹${amount.toFixed(2)}</td>
                <td><button class="btn-delete" onclick="deleteTransaction(${index})">Delete</button></td>
            `;
        }

        transactionList.appendChild(row);
    });

    // Update summary cards
    const balance = totalIncome - totalExpense;
    totalBalanceEl.textContent = `₹${balance.toFixed(2)}`;
    totalIncomeEl.textContent = `₹${totalIncome.toFixed(2)}`;
    totalExpenseEl.textContent = `₹${totalExpense.toFixed(2)}`;
}

// 4. Function to delete a transaction by its position
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateLocalStorage();
    updateUI();
}

// 5. Form submission handler
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const desc = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (!desc || isNaN(amount) || amount <= 0) return;

    // Create a new transaction object
    const newTransaction = {
        description: desc,
        amount: amount,
        type: type
    };

    transactions.push(newTransaction);

    // Save and re-render
    updateLocalStorage();
    updateUI();

    // Reset input fields
    form.reset();
});

// 6. Run initial update when the page loads
updateUI();

  
