import css from 'styled-jsx/css'
import { breakPoints, colors, fonts } from 'styles/theme'
import { addOpacity } from 'styles/utils'
const backgroundColor = addOpacity(colors.black, 1)

export default css`
    div{
        display: grid;
        place-items: center;
        height: 100vh;
    }
    main {
        background-color: #fff;
        height: 100%;
        width: 100%;
        border-radius: 7px;
        box-shadow: 15px 15px 0 rgba(0, 0, 0, 1);
        border: 2px solid rgba(0, 0, 0, 1);
        position: relative;
        overflow-y: auto;
    }
    @media (min-width: ${breakPoints.mobile}) {
        main {
            height: 95vh;
            max-width: ${breakPoints.mobile};
            width: 100%;
        }
    }
`

export const globalStyles = css.global`
    html,
    body {
        background-image: radial-gradient(${backgroundColor} 1px, ${colors.minGray} 1px),
        radial-gradient(${backgroundColor} 1px, ${colors.minGray} 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: ${fonts.base}
    }

    a {
    color: inherit;
    text-decoration: none;
    }

    * {
    box-sizing: border-box;
    }
`
