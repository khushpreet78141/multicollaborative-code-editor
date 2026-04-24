import 'dotenv/config';
import connectDB from './source/config/db.js';
import initSocket from './source/config/socket.js';
import app from './source/config/app.js';
import http from 'http';
import "./source/utils/redisClient.js";
const PORT = process.env.PORT || 3000;
const startServer = async()=>{
  try{
    await connectDB();
    //http server wrap
const server = http.createServer(app);
initSocket(server)


server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

  }catch(err){
    console.error("DB connection error",err);
    process.exit(1);
  }
}
startServer();



