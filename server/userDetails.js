const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        uname: String,
        email: {type: String, unique: true},
        password: String,
        boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema);
