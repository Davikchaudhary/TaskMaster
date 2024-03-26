const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
        uname: {type: String, unique: true}, 
        email: {type: String, unique: true},
        password: String,
        boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
        notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsSchema);
