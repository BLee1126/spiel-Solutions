// bring in mongoose
const mongoose = require('mongoose');

// We need to connect to our database
mongoose.connect("mongodb://localhost/Spiel", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("I have found the mongoose!!"))
    .catch(err => console.log("Oh no! I lost the mongoose!", err))