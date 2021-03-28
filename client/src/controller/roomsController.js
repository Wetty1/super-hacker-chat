import RoomsComponentsBuilder from '../view/roomsComponents.js';
import { constants } from "../constants.js";


export default class RoomsController {
    constructor() { }

    async initialize(eventEmitter) {
        const components = new RoomsComponentsBuilder()
            .setScreen({ title: 'SuperHackerChat - Wesley' })
            .setLayoutComponent()
            .setPromptComponent()
            .setListRoomsComponent(eventEmitter)
            .build()

        components.rooms.focus()
        components.screen.render()
    }
}