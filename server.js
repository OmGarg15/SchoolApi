import "dotenv/config"
import express from 'express'
import routes from "./routes/UserRoutes.js"

const app = express();
const PORT = process.env.PORT || 3000;

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/',routes);

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`)
})