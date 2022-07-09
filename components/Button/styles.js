import css from 'styled-jsx/css'
import { colors } from 'styles/theme'

export default css`
    button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border: 2px solid ${colors.black};
        border-radius: 5px;
        padding: 10px;
        box-shadow: 5px 5px 0 0 #000000;
        font-weight: 800;
        transition: all .3s ease;
        cursor: pointer;
        margin: 5px;
        user-select: none;
    }
    button[disabled] {
        pointer-events: none;
        opacity: .5;
    }
`
