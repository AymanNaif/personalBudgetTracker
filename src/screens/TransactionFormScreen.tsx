import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TransactionForm from "../components/TransactionForm";
import { Transaction, addTransaction } from "../redux/budgetSlice";
import { COLORS, SPACES } from "../constants";

const TransactionFormScreen = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state: any) => state.budget.transactions);

  const handleTransactionSubmit = (transaction: Transaction) => {
    console.log(transaction);

    dispatch(addTransaction(transaction));
  };

  return (
    <View style={styles.container}>
      <TransactionForm onSubmit={handleTransactionSubmit} />
      <Text style={styles.transactionTitle}>Transaction History</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>{item.description}</Text>
            <Text style={styles.transactionText}>{item.amount} $</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACES.MEDIUM,
    backgroundColor: COLORS.LIGHT,
  },

  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACES.SMALL,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: SPACES.SMALL,
    color: COLORS.DARK,
  },
  transactionText: {
    fontSize: 14,
    color: COLORS.DARK,
  },
});

export default TransactionFormScreen;
