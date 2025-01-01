import React, { useEffect } from 'react'
import {useSocketContext} from '../context/SocketContext';
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3"
const useListenMessages = () => {
    const {socket}=useSocketContext();
    const {messages,setMessages}=useConversation();

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            newMessage.shouldShake=true;
            const sound=new Audio(notificationSound);
            sound.play();
            setMessages([...messages,newMessage]);
            // console.log("New Message Received", newMessage);
        })

        return()=>socket?.off("newMessage"); //very important for every  new message  for our notification send because if not present then will rung multiple times the new message
    },[socket,setMessages,messages])
}

export default useListenMessages