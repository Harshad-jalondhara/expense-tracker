import Expense from "../models/expense.model.js";
import { expenseSchema } from "../validation/expenseValidation.js";

export const createExpense = async (req, res) => {
  try {
    const { error } = expenseSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
    }

    const expense = await Expense.create({
      ...req.body,
      user: req.user.id, // authMiddleware
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: -1,
    }); // id hamesa middlware ka use karke hi nikalo {;D}

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      { _id: req.params.id, user: req.user.id }, // 2 step url + login user
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not Found" });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete({
      _id: req.params,
      user: req.user.id,
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
