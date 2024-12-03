import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface BudgetState {
  transactions: Transaction[];
  income: number;
  expenses: number;
  categories: { [key: string]: number };
}

const initialState: BudgetState = {
  transactions: [],
  income: 0,
  expenses: 0,
  categories: {},
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      if (action.payload.amount > 0) {
        state.income += action.payload.amount;
      } else {
        state.expenses += action.payload.amount;
      }
      state.categories[action.payload.category] = (state.categories[action.payload.category] || 0) + action.payload.amount;
    },
  },
});


export const { setTransactions, addTransaction } = budgetSlice.actions;
export default budgetSlice.reducer;
