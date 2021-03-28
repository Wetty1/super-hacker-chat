#!/usr/bin/env node

/* 
    chmod +x index.js
*/

/*
    node index.js \
        --username wesley \
        --room sala01 \
        --hostUri localhost
*/

import Events from 'events'
import ChatController from "./src/controller/chatController.js"; // Top level await
import RoomsController from "./src/controller/roomsController.js";
import UsernameController from "./src/controller/usernameController.js";
import CliConfig from './src/config/cliConfig.js'
import SocketClient from './src/socket.js';
import EventManager from './src/eventManage.js';

const preConfig = {
    username: '',
    room: '',
}

const componentEmitter = new Events()

const usernameController = new UsernameController()
await usernameController.initialize(componentEmitter)

componentEmitter.on('USER_READY', async (nickname) => {
    console.log(nickname);
    preConfig.username = nickname
    const roomsController = new RoomsController()
    await roomsController.initialize(componentEmitter)
})

componentEmitter.on('ENTER_ROOM', async (roomSelected) => {
    preConfig.room = roomSelected

    const config = new CliConfig(preConfig)
    const socketClient = new SocketClient(config)
    await socketClient.initialize()

    const eventManager = new EventManager({ componentEmitter, socketClient })
    const events = eventManager.getEvents()
    socketClient.attachEvents(events)
    const data = {
        roomId: config.room,
        userName: config.username
    }
    eventManager.joinRoomAndWaitForMessages(data)


    const chatController = new ChatController()
    await chatController.initialize(componentEmitter)
})
