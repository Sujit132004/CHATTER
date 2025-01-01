import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Find or create the conversation
       // Find or create the conversation
       let conversation = await Conversation.findOne({
        $or: [
          { participants: [senderId, receiverId] },
          { participants: [receiverId, senderId] }
        ],
      });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create the new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if(newMessage){
      conversation.messages.push(newMessage._id);
    }

    
    await Promise.all([conversation.save(),newMessage.save()]);

    //SOCKET IO FUNCTIONALITY

    const receiverSocketId=getRecieverSocketId(receiverId);
    if(receiverSocketId){
      //io.to(socketId).emit() is used to send events to specific client :unicast:)
      
      io.to(receiverSocketId).emit("newMessage",newMessage);

    }




 
    

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: " + error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



export const getMessages=async(req,res)=>{
  try{

    const {id:userTochatId} =req.params;
    const senderId=req.user._id;
    const conversation=await Conversation.findOne({
      participants:{$all:[senderId,userTochatId]},
    }).populate("messages");

    if(!conversation){
      return res.status(200).json([]);
    }
    const messages=conversation.messages;

    return res.status(200).json(messages); 
  }
  catch(error){
    console.log("Error in getMessage controller: " + error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}