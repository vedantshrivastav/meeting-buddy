"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SummarySchema = new mongoose_1.default.Schema({
    meetingId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Meeting", required: true },
    summary: { type: String, required: true }
});
exports.default = mongoose_1.default.model('Summary', SummarySchema);
