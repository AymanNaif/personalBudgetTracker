import React from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { postData } from "../services/api";

const transactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number"),
  date: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD"),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "Please select income or expense" }),
  }),
});

type FormData = {
  description: string;
  amount: string;
  date: string;
  category: string;
  type: "income" | "expense";
};

const TransactionForm = ({
  onSubmit,
}: {
  onSubmit: (transaction: any) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(transactionSchema),
    mode: "onSubmit",
  });

  const handleFormSubmit = async (data: FormData) => {
    const transaction = {
      id: Date.now().toString(),
      ...data,
      amount: parseFloat(data.amount),
    };

    try {
      const response = await postData("allExpenses", transaction);
    } catch (error) {
      console.error("Error", "Failed to add transaction.");
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Description"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
            {errors.description && (
              <Text style={styles.errorText}>{errors.description.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        name="amount"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Amount"
              value={value}
              onChangeText={onChange}
              style={styles.input}
              keyboardType="numeric"
            />
            {errors.amount && (
              <Text style={styles.errorText}>{errors.amount.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        name="date"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Date (YYYY-MM-DD)"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
            {errors.date && (
              <Text style={styles.errorText}>{errors.date.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Category"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
            {errors.category && (
              <Text style={styles.errorText}>{errors.category.message}</Text>
            )}
          </>
        )}
      />
      <Controller
        name="type"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}
            >
              <Picker.Item label="Select Transaction Type" value="" />
              <Picker.Item label="Income" value="income" />
              <Picker.Item label="Expense" value="expense" />
            </Picker>
            {errors.type && (
              <Text style={styles.errorText}>{errors.type.message}</Text>
            )}
          </>
        )}
      />
      <Button
        title="Add Transaction"
        onPress={handleSubmit(handleFormSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default TransactionForm;
