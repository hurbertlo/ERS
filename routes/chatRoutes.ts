import express from "express"
import { client } from '../util/db'
// import { logger } from '../util/logger'
// import { isLoggedInAPI } from '../util/guard'
// import { userRoutes } from "./userRoutes"

export const chatRoutes = express.Router()

// Get all existing chats for current user
chatRoutes.get('/', async (req, res, next) => {

    // checking - req session user_id is saved upon successful login
    console.log('chatRoute req.session user: ', req.session['userId'])

    // user_id is in req.session
    // 1. if no req.session, response error
    if (!req.session['userId']) {
        res.status(401).json({
            message: 'Require user login to visit chat room page'
        })
        return
    }

    let userId = req.session['userId'];

    // 2. get user details
    let getUserResult = (await client.query(/*sql*/`select * from users where id = $1 order by id ASC`, [userId])).rows[0]
    console.log('chatRoute getUserResult: ', getUserResult)

    // 3. get all chat room and messages, also user name
    let getChatRoomsAndMessages = (await client.query(/*sql*/ `
        select 
        /* chat_room columns */
        cr.id as room_id, 
        cr.room_name, 
        cr.user_one_id,
        user_one.name as user_one_name,
        user_two.name as user_two_name,
        cr.user_two_id,
        cr.status as chatroom_status,
        cr.created_at as chatroom_created_at,
        cr.updated_at as chatroom_updated_at,

        /* chat_message columns */
        cm.id as chatmessage_id,
        cm.user_id as chatmessage_user_id,
        cm.message,
        cm.status as chatmessage_status,
        cm.created_at as chatmessage_created_at,
        cm.updated_at as chatmessage_updated_at
        from chat_room cr
        inner join chat_message cm on cm.room_id = cr.id
        inner join users user_one on user_one.id = cr.user_one_id
        inner join users user_two on user_two.id = cr.user_two_id
        where cr.user_one_id = $1 or cr.user_two_id = $1
        `, [userId])).rows
    console.log('chatRoute getChatRoomsAndMessages: ', getChatRoomsAndMessages)

    // 4. 整理Chat room array入面有message array object
    let mappedGetChatRoomsAndMessages: any[] = [];
    for (let chatRoomMessage of getChatRoomsAndMessages) {
        let chatRoom = {
            room_id: chatRoomMessage['room_id'],
            room_name: chatRoomMessage['room_name'],
            user_one_id: chatRoomMessage['user_one_id'],
            user_one_name: chatRoomMessage['user_one_name'],
            user_one_self: chatRoomMessage['user_one_id'] === userId ? true : false,
            user_two_id: chatRoomMessage['user_two_id'],
            user_two_name: chatRoomMessage['user_two_name'],
            chatroom_status: chatRoomMessage['chatroom_status'],
            chatroom_created_at: chatRoomMessage['chatroom_created_at'],
            chatroom_updated_at: chatRoomMessage['chatroom_updated_at'],
            chat_messages: []
        };

        // 4.1. in this loop, if new chat room, push into array
        const found = mappedGetChatRoomsAndMessages.some(el => el.room_id === chatRoom.room_id);
        if (!found) {
            mappedGetChatRoomsAndMessages.push(chatRoom)
        };

        // 4.3. self: if request session user id equals chat message sending user id
        let message = {
            chatmessage_id: chatRoomMessage['chatmessage_id'],
            chatmessage_user_id: chatRoomMessage['chatmessage_user_id'],
            self: chatRoomMessage['chatmessage_user_id'] === userId ? true : false,
            message: chatRoomMessage['message'],
            chatmessage_status: chatRoomMessage['chatmessage_status'],
            chatmessage_created_at: chatRoomMessage['chatmessage_created_at'],
            chatmessage_updated_at: chatRoomMessage['chatmessage_updated_at'],
        }

        // 4.2. in this loop, if new chat message, push into object inside array
        const messageFound = mappedGetChatRoomsAndMessages.some(el => {
            return el.room_id === chatRoom.room_id
                && el.chat_messages.some((mes: any) => mes.chatmessage_id === message.chatmessage_id)
        });
        if (!messageFound) {
            mappedGetChatRoomsAndMessages
                .find(el => el.room_id === chatRoom.room_id)
                .chat_messages
                .push(message)
        }
    }

    console.log('chatRoute mappedGetChatRoomsAndMessages: ', mappedGetChatRoomsAndMessages)

    res.json({
        userData: getUserResult,
        chatRoomsAndMessages: mappedGetChatRoomsAndMessages,
        // chatData: getChats.rows,
        // userTypeData: getUserType.rows,
        // message: "select success"
    });
});


