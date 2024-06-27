const mongoose = require("mongoose");
const moment = require("moment");

const DataSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "new" },
    email: { type: String },
    createdDate: { type: String, default: () => moment().format("DD/MM/YYYY") },
}, { versionKey: false });

const TasksModel = mongoose.model("tasks", DataSchema);

module.exports = TasksModel;
