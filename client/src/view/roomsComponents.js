import blessed from "blessed";

export default class RoomsComponentsBuilder {
    #screen
    #layout
    #rooms
    #input

    constructor() { }

    #baseComponent() {
        return {
            border: 'line',
            mouse: true,
            keys: true,
            top: 0,
            scrollbar: {
                ch: ' ',
                inverse: true,
            },
            tags: true,
        }
    }

    setScreen({ title }) {
        this.#screen = blessed.screen({
            smartCSR: true,
            title
        })

        this.#screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

        return this
    }

    setLayoutComponent() {
        this.#layout = blessed.layout({
            parent: this.#screen,
            width: '100%',
            height: '100%',
        })

        return this
    }

    setPromptComponent() {
        this.#input = blessed.input({
            parent: this.#screen,
            bottom: 0,
            height: '10%',
            inputOnFocus: true,
            padding: {
                top: 1,
                left: 2,
            },
            style: {
                fg: '#f6f6f6',
                bg: '#353535',
            }
        })

        return this
    }

    setListRoomsComponent(eventEmitter) {
        this.#rooms = blessed.list({
            ...this.#baseComponent(),
            parent: this.#layout,
            align: 'center',
            width: '100%',
            height: '90%',
            items: ['{bold}Rooms{/}', 'room 1', 'room 2', 'room 3'],
            interactive: true,
            style: {
                selected: {
                    bg: 'blue',
                    fg: 'white'
                }
            }
        })

        this.#rooms.on('select', (item) => {
            const text = item.getText()
            if (text === 'Rooms') return
            this.#layout.destroy()
            this.#input.destroy()
            this.#rooms.destroy()
            eventEmitter.emit('ENTER_ROOM', text)
        })

        return this
    }

    build() {
        const components = {
            screen: this.#screen,
            layout: this.#layout,
            input: this.#input,
            rooms: this.#rooms,
        }

        return components
    }
}