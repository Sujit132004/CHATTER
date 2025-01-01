import { Server } from "socket.io";
import http from "http";
import express from "express";
const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});

export const getRecieverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}




const userSocketMap={} //{userID,socketId}

io.on('connection',(socket)=>{
    const userId=socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        console.log(`User connected: ${socket.id} (User ID: ${userId})`);
    } else {
        console.log(`Connection attempt without userId. Socket ID: ${socket.id}`);
    }



    //socket.on() is used to listen to the events , can be also used for both on client and server side
    socket.on('disconnect',()=>{
        console.log("user disconnected",socket.id);
        delete userSocketMap[userId]; 
        io.emit("getOnlineUsers",Object.keys(userSocketMap)); //broadcast to all the connected clients
    })
})



export {app,io,server};