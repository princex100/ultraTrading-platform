import { Server } from "socket.io";


const connectionInstance=(server)=>{
    return new Server(server,{
        cors:{
            origin:"http://localhost:5173"
        }
    })
}