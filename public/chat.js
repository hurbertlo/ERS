const socket = io.connect();


socket.on('message', message => {
    console.log(message);
})

// /**
//  * @param {String} HTML representing a single element
//  * @return {Element}
//  */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

let params = new URLSearchParams(window.location.search)

let targetUser = params.get('room') //session path

let messageForm = document.querySelector('form.type_msg')
let messageHistory = document.querySelector('.msg_history');
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // if empty string, do not send message
    if (!messageForm.message.value || messageForm.message.value == "") {
        return
    }

    let res = await fetch(`/talk-to/${targetUser}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: messageForm.message.value
        })
    })

    // outgoing messages


    if (res.ok) {
        let newOutGoingMsg = htmlToElement(`
                        <div class="outgoing_msg">
                            <div class="sent_msg">
                                <p>${messageForm.message.value}</p>
                                <span class="time_date"> 11:01 AM | June 9</span>
                            </div>
                        </div>
                    `)
        messageHistory.appendChild(newOutGoingMsg);
        messageForm.reset();

        messageHistory.scrollTop = messageHistory.scrollHeight;
    }
})

socket.on('new-message', (message) => { // 監聽咩事件
    // incoming messages
    let newIncomingMsg = htmlToElement(`
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