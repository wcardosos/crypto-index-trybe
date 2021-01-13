import styled from 'styled-components';
import { ButtonProps } from '../../components/Button';

import theme from '../theme';

export const ButtonContainer = styled.button`
    width: ${(props: ButtonProps) => props.small ? "100px" : "300px"};
    height: ${(props: ButtonProps) => props.small ? "30px" : "40px"};
    text-align: center;
    background-color: ${(props: ButtonProps) => props.outline ? theme.colors.background : theme.colors.primary};;
    color: ${(props: ButtonProps) => props.outline ? theme.colors.primary : theme.colors.background};
    border: ${(props: ButtonProps) => props.outline ? "1px solid " + theme.colors.primary : 'none'};
    border-radius: ${(props: ButtonProps) => props.small ? '5px' : '10px'};
    font-family: 'Rubik', sans-serif;
    cursor: pointer;
    outline: none;

    :hover {
        background-color: ${theme.colors.primaryDark};
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        ${(props: ButtonProps) => props.outline ? "color: " + theme.colors.background : ''}
    }

    :active {
        transform: translateY(1.5px);
    }
`