import express from "express"
import { client } from '../util/db'
// import { logger } from '../util/logger'
// import { isLoggedInAPI } from '../util/guard'
// import { userRoutes } from "./userRoutes"

export const chatRoutes = express.Router()


chatRoutes.get('/chat-list', getChatList)
chatRoutes.get('/chats/:userId', getChatsWithAdmin)


async function getChatsWithAdmin(req: express.Request, res: express.Response) {
    let userId = Number(req.params.userId)
    let adminUserId = req.session['userId']
    if (!userId) {
        res.status(400).json({
            message: 'Invalid user ID'
        })
        return
    }

    let chats = (await client.query(`select 
                            chats.*,
                            (sender = $1) as is_self  
                            from chats 
                            where (receiver = $1 and sender = $2 ) 
                            or  (receiver = $2 and sender = $1)`,
        [adminUserId, userId])).rows
    res.json({
        data: chats,
        message: `${chats.length} record${chats.length > 1 ? 's' : ''} found`
    })
}


async function getChatList(req: express.Request, res: express.Response) {
    let role = req.session['role']
    let userId = req.session['userId']

    if (role !== 'admin') {
        res.status(403).json({
            message: 'Unauthorized'
        })
        return
    }

    let result = await client.query(`
        
        with 

        chat_list as 
                (
                select  sender as user_id from chats c where sender <> 1
                union
                select  receiver as user_id  from chats c where receiver <> 1
                ),

        chat_list_details as (
                select 
                u.id,
                name,
                address,
                email

                from chat_list cl join users u on cl.user_id = u.id

                )

        select 
            chat_list_details.* ,
                (select content from chats where receiver = chat_list_details.id or sender = chat_list_details.id order by created_at desc limit 1) as last_message,
                (select created_at  from chats where receiver = chat_list_details.id or sender = chat_list_details.id order by created_at desc limit 1) as last_message_created_at
            from chat_list_details

    `)

    res.json({
        data: result.rows,
        message: `${result.rowCount} record${result.rowCount > 1 ? 's' : ''} found`
    })
}


// Get all existing chats for current user
chatRoutes.get('/', async (req, res, next) => {  //chatroom

    // checking - req session user_id is saved upon successful login
    console.log('chatRoute req.session user: ', req.session['userId'])

    // user_id is in req.session
    // if no req.session, response error
    if (!req.session['userId']) {
        res.status(401).json({
            message: 'Require user login to visit chat room page'
        })
        return
    };
})

