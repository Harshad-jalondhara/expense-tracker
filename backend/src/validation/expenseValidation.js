import Joi from "joi"

export const expenseSchema = Joi.object({
    amount: Joi.number().positive().required(),
    category: Joi.string().min(3).required(),
    description: Joi.string().allow(""),
    date: Joi.date()
})