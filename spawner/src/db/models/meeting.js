"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MeetingSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    meetId: { type: String, required: true },
    title: { type: String },
    status: { type: String, enum: ["pending", "in-progress", "completed", "failed"], default: "pending"
    }
});
exports.default = mongoose_1.default.model('Meeting', MeetingSchema);
