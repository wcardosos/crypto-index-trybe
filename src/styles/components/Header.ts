import styled from 'styled-components';
import { HeaderProps } from '../../components/Header';

export const HeaderContainer = styled.header`
    width: 80vw;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: ${(props: HeaderProps) => {
        if (props.center) {
            return 'center'
        } else if (props.back) {
            return 'flex-start'
        } else {
            return 'space-between'
        }
    }};
`