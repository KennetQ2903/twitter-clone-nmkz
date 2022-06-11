import css from 'styled-jsx/css';
import { breakPoints, colors, fonts } from "styles/theme";
import { addOpacity } from "styles/utils";
const backgroundColor = addOpacity( colors.primary, 1 )

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
        box-shadow: 0 10px 25px rgba(0, 0, 0, .2);
    }
    @media (min-width: ${breakPoints.mobile}) {
        main {
            height: 95vh;
            width: ${breakPoints.mobile};
        }
    }
`

export const globalStyles = css.global`
    html,
    body {
        background-image: radial-gradient(${backgroundColor} 1px, transparent 1px),
        radial-gradient(${backgroundColor} 1px, transparent 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
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