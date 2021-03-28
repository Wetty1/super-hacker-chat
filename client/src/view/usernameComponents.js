import blessed from "blessed";

export default class UsernameComponentsBuilder {
    #screen
    #layout
    #label1
    #textbox
    #form

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
            align: "left",
        })

        return this
    }

    setLabelUsername() {
        this.#textbox = blessed.text({
            parent: this.#screen,
            top: 3,
            left: 5,
            content: 'Nickname: ',
            style: {
                fg: '#f6f6f6',
                bg: '#353535',
            }
        })

        return this
    }

    setFormComponent(eventEmitter) {
        this.#form = blessed.form({
            parent: this.#screen,
            width: '90%',
            left: 'center',
            keys: true,
            vi: true
        })

        this.#form.on('submit', (data) => {
            this.destroyComponent()
            eventEmitter.emit('USER_READY', data.username)
        });

        return this
    }

    setInputComponent() {
        this.#textbox = blessed.textbox({
            parent: this.#form,
            name: 'username',
            top: 4,
            height: 3,
            inputOnFocus: true,
            border: { type: 'line' },
            focused: {
                fg: 'blue',
            },
            style: {
                fg: '#f6f6f6',
                bg: '#353535',
            }
        })

        this.#textbox.key('enter', () => this.#form.submit())

        return this
    }

    destroyComponent() {
        this.#layout.destroy()
        this.#form.destroy()
    }

    build() {
        const components = {
            screen: this.#screen,
            layout: this.#layout,
            label1: this.#label1,
            textbox: this.#textbox,
            form: this.#form,
        }

        return components
    }
}