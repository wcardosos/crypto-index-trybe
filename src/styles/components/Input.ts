import styled from 'styled-components';

import { InputProps } from '../../components/Input';

import theme from '../theme';

export const InputContainer = styled.input`
    width: ${(props: InputProps) => {
        if (props.width === "small") {
            return "50px"
        } else if (props.width === "medium") {
            return "250px";
        } else if (props.width === "large") {
            return "400px";
        }
    }};
    height: 35px;
    text-align: ${(props: InputProps) => props.width === "small" ? "center" : "none"};
    padding: ${(props: InputProps) => props.width === "small" ? "0" : "0 10px"};
    border: 1px solid ${theme.colors.primary};
    border-radius: 5px;
    outline: none;

    :focus {
        border: 2px solid ${theme.colors.primaryDark};
    }

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0
    }
`