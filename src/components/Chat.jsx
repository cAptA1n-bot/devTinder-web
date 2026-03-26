import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { createSocketConnection } from "../utils/socket"
import { useSelector } from "react-redux"

const Chat = () => {
    const { targetUserId } = useParams()
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", { userId, targetUserId })

        socket.on("messageReceived", ({ firstName, lastName, text }) => {
            console.log(firstName, ": ", text);
            setMessages((message) => [...message, { firstName, lastName, text }])
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage
        })
    }




    return (
        <div className="mt-20 md:border md:border-gray-300 md:w-175 lg:mx-auto md:rounded-md h-[80vh]">
            <div className="p-4 border-b border-gray-300">Chat</div>

            {messages.map((msg, index) => {
                return (
                    <div key={index} className="chat chat-start overflow-y-auto p-4">
                        <div className="chat-header">
                            {msg.firstName + " " + msg.lastName}
                            <time className="text-xs opacity-50">2 hours ago</time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                    </div>
                )
            })}


            <div className="fixed lg:w-175 bottom-15 flex gap-0.5 justify-center">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" className="w-84 lg:w-150 border border-gray-300 p-4 h-16 rounded-lg text-[18px] lg:mb-1" placeholder="message..." />
                <button onClick={sendMessage} className="btn btn-secondary w-23 h-16">Send</button>
            </div>


        </div>
    )
}

export default Chat
