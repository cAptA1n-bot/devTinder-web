
const Chat = () => {
    return (
        <div className="mt-20 lg:border lg:border-gray-300 lg:w-175 lg:mx-auto lg:rounded-lg h-[80vh]">
            <div className="p-4 border-b border-gray-300">Chat</div>
                <div className="chat chat-start overflow-y-auto h-[70vh] p-4">
                    <div className="chat-header">
                        Obi-Wan Kenobi
                        <time className="text-xs opacity-50">2 hours ago</time>
                    </div>
                    <div className="chat-bubble">You were the Chosen One!</div>
                    <div className="chat-footer opacity-50">Seen</div>
                </div>
            <div className="fixed lg:w-175 bottom-15 flex gap-0.5 justify-center">
                <input type="text" className="w-84 lg:w-150 border border-gray-300 p-4 h-16 rounded-lg text-[18px] lg:mb-1" placeholder="message..." />
                <button className="btn btn-secondary w-23 h-16">Send</button>
            </div>
                
            
        </div>
    )
}

export default Chat
