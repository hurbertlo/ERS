const socket = io.connect();

// socket.on('message', message => {
//     console.log(message);
// })

let params = new URLSearchParams(window.location.search)
let userId = params.get('id')

let inboxChatContainer = document.querySelector('#inbox-chat-id');
let mainMessageContainer = document.querySelector('#message-id');
let msgsContainer = document.querySelector('#message-id .msgs');
let messageForm = document.querySelector('form.type_msg')
let messageHistory = document.querySelector('.msg_history');

// retrieve all latest chats for this user, once
async function getChats() {
    let chatResult = await fetch(`/chatroom`);

    // if not logon, force page redirection
    if (!chatResult.ok) {
        window.location.href = '/user/signup_login.html';
    }

    let responseBody = await chatResult.json();
    console.log('getChats responseBody: ', responseBody)

    if (!responseBody.chatRoomsAndMessages || responseBody.chatRoomsAndMessages.length < 1) {
        return;
    }



    for (let chatRoomMessage of responseBody.chatRoomsAndMessages) {
        let sortedMessageByLatestDate = chatRoomMessage.chat_messages.sort((a, b) => {
            return new Date(b.chatroom_created_at) - new Date(a.chatroom_created_at);
        })

        console.log('sortedMessageByLatestDate: ', sortedMessageByLatestDate);

        // 1. insert left side new inbox chat
        let newInboxChat = htmlToElement(/* html */`
            <button 
                class="nav-link" 
                data-bs-toggle="pill" 
                data-bs-target="#${chatRoomMessage.room_name}" 
                type="button"
                role="tab"
            >
                <div class="chat_people">
                    <div class="chat_img"> <img src="" alt=""> </div>
                    <div class="chat_ib">
                        <h5>
                            ${chatRoomMessage.user_one_self ? chatRoomMessage.user_two_name : chatRoomMessage.user_one_name} 
                            <span class="chat_date">${sortedMessageByLatestDate[0].chatmessage_created_at}</span>
                        </h5>
                        <p>${sortedMessageByLatestDate[0].message}</p>
                    </div>
                </div>
            </button>
        `)

        inboxChatContainer.appendChild(newInboxChat);

        // 2.1. insert right side message history container
        let newMessageHistoryContainer = htmlToElement(/* html */`
            <div class="tab-pane fade show" id="${chatRoomMessage.room_name}" role="tabpanel">
                <div class="msgs"></div>
            </div>
        `);
        let newMessageHistory = htmlToElement(/* html */`
            <div class="msg_history">
            </div>
        `);
        let newFormSubmitter = htmlToElement(/* html */`
            <form class="type_msg">
                <div class="input_msg_write">
                    <input name='message' type="text" class="write_msg" placeholder="Type a message" />
                    <button class="msg_send_btn" type="submit"><i class="fa fa-paper-plane-o"
                            aria-hidden="true"></i></button>
                </div>
            </form>
        `);

        mainMessageContainer.appendChild(newMessageHistoryContainer);

        document.querySelector(`#${chatRoomMessage.room_name} .msgs`).appendChild(newMessageHistory);
        document.querySelector(`#${chatRoomMessage.room_name} .msgs`).appendChild(newFormSubmitter);

        // 2.2. insert right side chat messages
        for (let message of sortedMessageByLatestDate) {
            let newChatMessage = htmlToElement(/* html */`
                <div class=${message.self ? "outgoing_msg" : "incoming_msg"}>
                    <div class=${message.self ? "" : "incoming_msg_img"}> <img src="" alt=""> </div>
                    <div class=${message.self ? "sent_msg" : "received_msg"}>
                        <div class=${message.self ? "" : "received_withd_msg"}>
                            <p>${message.message}</p>
                            <span class="time_date">${message.chatmessage_created_at}</span>
                        </div>
                    </div>
                </div>
            `)

            document.querySelector(`#${chatRoomMessage.room_name} .msgs .msg_history`).appendChild(newChatMessage)
        }

    }

    // let newOutPutMsg = htmlToElement(/* html */`
    //     <div class="outgoing_msg">
    //         <div class="sent_msg">
    //             <p>${messageForm.message.value}</p>
    //             <span class="time_date"> 11:01 AM | June 9</span>
    //         </div>
    //     </div>
    // `)
    // messageHistory.appendChild(newOutPutMsg);
    // messageForm.reset();

    // messageHistory.scrollTop = messageHistory.scrollHeight;
}

getChats()

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}



messageForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // if empty string, do not send message
    if (!messageForm.message.value || messageForm.message.value == "") {
        return
    }

    let res = await fetch(`/talk-to/${userId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: messageForm.message.value
        })
    })

    // output messages
    if (res.ok) {
        let newOutPutMsg = htmlToElement(/* html */`
                        <div class="outgoing_msg">
                            <div class="sent_msg">
                                <p>${messageForm.message.value}</p>
                                <span class="time_date"> 11:01 AM | June 9</span>
                            </div>
                        </div>
                    `)
        messageHistory.appendChild(newOutPutMsg);
        messageForm.reset();

        messageHistory.scrollTop = messageHistory.scrollHeight;
    }
})

//incoming messages 
socket.on('new-message', (message) => { // 監聽咩事件
    let newIncomingMsg = htmlToElement(/* html */`
            <div class="incoming_msg">
                    <div class="incoming_msg_img"> <img src="" alt=""> </div>
                    <div class="received_msg">
                        <div class="received_withd_msg">
                            <p>${message}</p>
                            <span class="time_date"> 11:01 AM | June 9</span>
                        </div>
                    </div>
                </div>
                    `)
    messageHistory.appendChild(newIncomingMsg);
    // window.location.href = '/home.html';
    messageHistory.scrollTop = messageHistory.scrollHeight;
})


// socket.on('new-chat-list', (message) => {
//     /**
//      * message body:
//      * - user_id
//      * - user_name
//      * - user_icon
//      * - chat: created_at (format date)
//      * - (optional) - first message
//      **/
//     let newChatList = htmlToElement(`
//         <div class="chat_list" data-user-id="${message.user_id}">
//             <div class="chat_people">
//                 <div class="chat_img"> <img src="${message.user_icon}" alt=""> </div>
//                 <div class="chat_ib">
//                     <h5>${message.user_name} <span class="chat_date">${message.created_at}</span></h5>
//                     <p>${message.first_message}</p>
//                 </div>
//             </div>
//         </div>
//         `)
//     document.querySelector("inbox_chat").appendChild(newChatList);

//     console.log('newChatList: ', newChatList)


// })

