import UsernameComponentsBuilder from '../view/usernameComponents.js';
import { constants } from "../constants.js";


export default class RoomsController {
    constructor() { }

    async initialize(eventEmitter) {
        const components = new UsernameComponentsBuilder()
            .setScreen({ title: 'User name' })
            .setLayoutComponent()
            .setFormComponent(eventEmitter)
            .setInputComponent()
            .setLabelUsername()
            .build()

        components.screen.render()
    }
}