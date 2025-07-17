import { Server } from "socket.io";


export function socket(server:any){
    const io = new Server(server, {
        cors:{
            origin:"http://localhost:4173"
        }
    });


    io.on("connection", (socket) => {
        socket.on("joinChat", () => {

        });
        socket.on("sendMessage", () => {

        });
        socket.on("disconnect", () => {

        });
    })
}