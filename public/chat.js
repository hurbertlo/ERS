
const socket = io.connect();

let inboxChatContainer = document.querySelector('#inbox-chat-id');
let mainMessageContainer = document.querySelector('#message-id');
let msgsContainer = document.querySelector('#message-id .msgs');
let messageForm = document.querySelector('form.type_msg')
let messageHistory = document.querySelector('.msg_history');
let targetUserId

//接返userRoutes getMe function
//拎user type
async function getMe() {
    let res = await fetch('/user/me')
    let userInfo = await res.json()
    // console.log(userInfo);
    return userInfo
}

//接返chatRoutes getMe function
async function getChatList() {
    let res = await fetch('/chatroom/chat-list')
    let data = await res.json()
    let userList = data.data
    // console.log(userList);
    return userList
}

//data(chat record) save in userId
async function fetchChats(userId) {
    console.log('talk to:', userId);
    let res = await fetch(`/chatroom/chats/${userId}`)
    let data = await res.json()
    let chats = data.data
    console.log(chats);
    renderChatsUI(chats)
}

async function fetchMe() {
    let res = await fetch(`/user/me`)
    let data = await res.json()
    // console.log(data);
    return data
}

async function renderChatListUI(chatList) {

    inboxChatContainer.innerHTML = ''

    const role = (await fetchMe()).role

    if (role === "admin") {

        for (let chatListItem of chatList) {
            console.table(chatListItem);
            inboxChatContainer.innerHTML += (`

                <div id='chat-list-item-${chatListItem.id}' data-user-id='${chatListItem.id}' class='chat-list-item-card' onclick='onChatListItemClick(${chatListItem.id})'>
                        <div><b></b></div>
                
                        <div class='avatar-container'>
                                <img src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'></img>
                        </div>
                        <div class='info-container'>
                            <div class='first-row'>
                                    <div class='user-name'> ${chatListItem.name}</div>
                                    <div> ${chatListItem.last_message_created_at}</div>
                            </div>
                            
                            <div class='last-message'> ${chatListItem.last_message}</div>
        
                        </div>
                </div>
                `)

        }

        inboxChatContainer.appendChild


    } else {
        for (let chatListItem of chatList) {
            console.table(chatListItem);

            inboxChatContainer.innerHTML += (`
        
                <div id='chat-list-item-${chatListItem.id}' class='chat-list-item-card' onclick='onChatListItemClick(${chatListItem.id})'>
                        <div > <b></b></div>
                
                        <div class='avatar-container'>
                                <img src='https://vectorified.com/images/admin-logo-icon-18.png'></img>
                        </div>
                        <div class='info-container'>
                            <div class='first-row'>
                                    <div class='user-name'> ${chatListItem.name}</div>
                                    <div> ${chatListItem.last_message_created_at}</div>
                            </div>
                            
                            <div class='last-message'> ${chatListItem.last_message}</div>
        
                        </div>
                </div>
                `)

            messageHistory.scrollTop = messageHistory.scrollHeight;
        }
    }
}

function onChatListItemClick(chatListItemId) {
    document.querySelectorAll('.chat-list-item-card').forEach(e => {
        e.classList.remove('active')
    })
    document.querySelector(`#chat-list-item-${chatListItemId}`).classList.add('active')
    fetchChats(chatListItemId)
    targetUserId = chatListItemId
    if (!targetUserId) {

    }
}

function renderChatsUI(chats) {
    let conversationContainer = document.querySelector('.msg_history')
    conversationContainer.innerHTML = ''

    for (let chatItem of chats) {
        conversationContainer.innerHTML += (`
    <div class=${chatItem.is_self ? "outgoing_msg" : "incoming_msg"}>
    <div class=${chatItem.is_self ? "" : "incoming_msg_img"}> <img src="" alt=""> </div>
    <div class=${chatItem.is_self ? "sent_msg" : "received_msg"}>
        <div class=${chatItem.is_self ? "" : "received_withd_msg"}>
            <p>${chatItem.content}</p>
            <span class="time_date">${chatItem.created_at}</span>
        </div>
    </div>
    </div>
`)
        messageHistory.scrollTop = messageHistory.scrollHeight;
    }
    console.table(chats)
}

// retrieve all latest chats for this user, once

async function getChats() {
    let { role } = await getMe()
    // if (role === 'admin') {
    let chatList = await getChatList()
    renderChatListUI(chatList)
    // }

    let chatResult = await fetch(`/chatroom`);

    // if not logon, force page redirection //彈去signin
    if (!chatResult.ok) {
        window.location.href = '/user/signup_login.html';

    }
}

getChats()


//outcoming同incoming既msg 
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}


messageForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // if empty string, do not send message
    if (!messageForm.message.value || messageForm.message.value == "" || !targetUserId) {
        return
    }

    let res = await fetch(`/chatroom/talk-to/${targetUserId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: messageForm.message.value,
        })
    })

    // output messages
    if (res.ok) {

        let newOutPutMsg = htmlToElement(/* html */`
                        <div class="outgoing_msg">
                            <div class="sent_msg">
                                <p>${messageForm.message.value}</p>
                                <span class="time_date">11:01 AM | June 9</span>
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
    console.log('new message found');
    let newIncomingMsg = htmlToElement(/* html */`
            <div class="incoming_msg">
                    <div class="incoming_msg_img"> <img src="" alt=""> </div>
                    <div class="received_msg">
                        <div class="received_withd_msg">
                            <p>${message.content}</p>
                            <span class="time_date"> ${message.created_at}</span>
                        </div>
                    </div>
                </div>
                    `)

    //for real-time update last-message
    // document.querySelector('.last-message').innerHTML = message.content

    messageHistory.appendChild(newIncomingMsg);
    messageHistory.scrollTop = messageHistory.scrollHeight;
})
