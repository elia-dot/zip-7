import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    type : {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    flaws : [
        {
            type: String,
        }
    ],
    notes: [
        {
            type: String,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    nextReview: {
        type: Date,
        default: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    }
    
});

export default mongoose.model("Review", ReviewSchema);