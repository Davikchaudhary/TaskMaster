const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        uname: {type: String, unique: true}, 
        email: {type: String, unique: true},
        password: String,
        boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema);
