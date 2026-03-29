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
        <div className="mt-14 md:mt-18 md:border md:border-gray-300 md:w-175 md:mx-auto md:rounded-md md:h-[80vh] h-[84vh] flex flex-col">
            <div className="p-4 border-b border-gray-300 font-bold text-2xl">Chat</div>
            <div className="flex-1 overflow-y-auto">
            {messages.map((msg, index) => {
                return (
                    <div key={index} className="chat chat-start p-4">
                        <div className="chat-header">
                            {msg.firstName + " " + msg.lastName}
                            <time className="text-xs opacity-50">2 hours ago</time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                    </div>
                )
            })}
            </div>

            <div className="flex gap-0.5 items-center bg-black p-2 md:p-4 rounded-b-md">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" className="flex-1 border border-gray-300 p-3 md:p-4 h-10 md:h-12 rounded-lg text-base md:text-lg" placeholder="message..." />
                <button onClick={sendMessage} className="btn btn-secondary h-10 md:h-12">Send</button>
            </div>
        </div>
    )
}

export default Chat
