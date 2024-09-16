require("dotenv").config()
const express = require("express")
const cors = require("cors")
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", require("./routes/userRoute"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})