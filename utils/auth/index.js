//uso de passport
const passport = require("passport");
//llamamos la estrategia, en este caso la local
const localStrategy = require("./strategies/local.strategy");

//usamos la estrategia
passport.use(localStrategy)
