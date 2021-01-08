const getTemplate = (data = [], placeholder='') => `
            <div class="select__input" data-type="input">
                <span data-type="value">${placeholder}</span>
                <i class="fas fa-chevron-down" data-type="arrow"></i>
            </div>
            <div class="select__dropdown">
                <ul class="select__list">
                ${data.map(i => `<li class="select__item"
                                     data-type="item"
                                     data-id="${i.id}"
                                     >
                                ${i.value}</li>`)
                        .join('')}
                </ul>
            </div>
`

export class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectId = null
        this.onSelect = options.onSelect || function () {}

        this.#render()
        this.#setup()

        options.selectedId && this.select(options.selectedId)
    }

    //private method
    #render() {
        const {placeholder, data} = this.options
        this.$el.classList = 'select'
        this.$el.innerHTML = getTemplate(data, placeholder)
    }

    //private method
    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')
        this.$value = this.$el.querySelector('[data-type="value"]')
    }

    clickHandler(ev) {
        const {type} = ev.target.dataset
        if (type === 'input') {
            this.toggle()
        }
        if (type === 'item') {
            this.isOpen && this.close()
            this.select(ev.target.dataset.id)
        }
    }

    get current() {
        return this.options.data.find(i => i.id === this.selectId)
    }

    select(id) {
        // unselect previous element
        this.selectId &&
            this.$el.querySelector(`[data-id="${this.selectId}"]`)
                .classList.remove('selected')
        // set new selected id
        this.selectId = id
        // find new value
        const newValue = this.current
        // set it to placeholder if it is found
        this.$value.textContent = newValue ? newValue.value : ''
        // highlight new selected element
        this.$el.querySelector(`[data-id="${this.selectId}"]`).classList.add('selected')
        // execute callback function with newly selected item
        this.onSelect(newValue)
    }


    get isOpen() {
        return this.$el.classList.contains('open')
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.$arrow.classList.remove('fa-chevron-down')
        this.$arrow.classList.add('fa-chevron-up')
        this.$el.classList.add('open')
    }

    close() {
        this.$arrow.classList.remove('fa-chevron-up')
        this.$arrow.classList.add('fa-chevron-down')
        this.$el.classList.remove('open')
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler)
        this.$el.innerHTML = ''
    }

}