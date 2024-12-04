import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions } from "../redux/budgetSlice";
import { getData } from "../services/api";
import { Transaction } from "../redux/budgetSlice";
import { PieChart } from "react-native-chart-kit";
import getRandomColor from "../utils/getRandomColor";

const DashboardScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state: any) => state.budget.transactions);

  useEffect(() => {
    const getTransactions = async () => {
      const transactionsData = await getData("allExpenses");
      dispatch(setTransactions(transactionsData));
    };

    getTransactions();
  }, [dispatch]);

  // Calculate total income, expenses, and balance
  const totalIncome = transactions
    .filter((transaction: Transaction) => transaction.type === "income")
    .reduce(
      (acc: number, transaction: Transaction) => acc + transaction.amount,
      0
    );

  const totalExpenses = transactions
    .filter((transaction: Transaction) => transaction.type === "expense")
    .reduce(
      (acc: number, transaction: Transaction) => acc + transaction.amount,
      0
    );

  const balance = totalIncome - totalExpenses;

  const categoryData = transactions.reduce(
    (acc: any, transaction: Transaction) => {
      const category = transaction.category || "Other";
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Math.abs(transaction.amount);
      return acc;
    },
    {}
  );

  const pieChartData = Object.keys(categoryData).map((category) => ({
    name: category,
    population: categoryData[category],
    color: getRandomColor(),
    legendFontColor: "#000",
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Income: ${totalIncome}</Text>
        <Text style={styles.summaryText}>Total Expenses: ${totalExpenses}</Text>
        <Text style={styles.summaryText}>Balance: ${balance}</Text>
      </View>
      <PieChart
        data={pieChartData}
        width={350}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="0"
      />
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate("TransactionForm")}
      />
    </View>
  );
};

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 20,
    paddingBlock: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  summary: {
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default DashboardScreen;
