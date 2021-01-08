import {Select} from "./select/select"
import './select/style.scss'

const $ = {}

$.select = new Select('#select', {
    placeholder: 'Пожалуйста выбери элемент',
    selectedId: '3',
    data: [
        {id: '1', value: 'React'},
        {id: '2', value: 'Angular'},
        {id: '3', value: 'Vue'},
        {id: '4', value: 'React Native'},
        {id: '5', value: 'Next'},
        {id: '6', value: 'Nest'},
        {id: '7', value: 'Nuxt'}
    ],
    onSelect(item) {
        console.log(item)
    }
})

window.$ = $
