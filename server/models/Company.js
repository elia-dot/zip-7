import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    BN : {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city : {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fax : {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    contacts : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}
, { timestamps: true });

export default mongoose.model("Company", CompanySchema);