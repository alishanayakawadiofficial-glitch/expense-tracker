// Grab DOM elements
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const typeSelect = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');

const totalBalanceEl = document.getElementById('total-balance');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');

// Fetch saved transactions from LocalStorage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Save to LocalStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Render UI & recalculated totals
function updateUI() {
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
                <td><small>${transaction.category || 'General'}</small></td>
                <td><span class="badge-income">Income</span></td>
                <td class="badge-income">+₹${amount.toFixed(2)}</td>
                <td><button class="btn-delete" onclick="deleteTransaction(${index})">Delete</button></td>
            `;
        } else {
            totalExpense += amount;
            row.innerHTML = `
                <td>${transaction.description}</td>
                <td><small>${transaction.category || 'General'}</small></td>
                <td><span class="badge-expense">Expense</span></td>
                <td class="badge-expense">-₹${amount.toFixed(2)}</td>
                <td><button class="btn-delete" onclick="deleteTransaction(${index})">Delete</button></td>
            `;
        }

        transactionList.appendChild(row);
    });

    const balance = totalIncome - totalExpense;
    totalBalanceEl.textContent = `₹${balance.toFixed(2)}`;
    totalIncomeEl.textContent = `₹${totalIncome.toFixed(2)}`;
    totalExpenseEl.textContent = `₹${totalExpense.toFixed(2)}`;
}

// Delete item
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateLocalStorage();
    updateUI();
}

// Handle Form Submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const desc = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;
    const type = typeSelect.value;

    if (!desc || isNaN(amount) || amount <= 0) return;

    const newTransaction = {
        description: desc,
        amount: amount,
        category: category,
        type: type
    };

    transactions.push(newTransaction);
    updateLocalStorage();
    updateUI();

    form.reset();
});

// Initial load
updateUI();
