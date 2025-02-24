const mongoose = require('mongoose');
exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongodb established");
    } catch (e) {
        console.error(`Mongodb error: ${e.message}`);
        process.exit(1);
    }
}