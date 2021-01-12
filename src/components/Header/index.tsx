import React from 'react';
import Button from '../Button';
import { HeaderContainer } from '../../styles/components/Header';

import CryptoIndexLogo from '../../assets/logo.svg';
import Back from '../../assets/back-button.svg';

export interface HeaderProps {
    center?: boolean,
    back?: boolean,
}

const Header: React.FC<HeaderProps> = ({ center, back }) =>  {
    return (
        <HeaderContainer data-testid={"header"} center={center}>
            {back ? <Back data-testid={"back-button"} /> : null}
            {!back ? <CryptoIndexLogo data-testid={"logo"} /> : null}
            {!center && !back ? <Button text={"Sair"} onClick={() => console.log("Saindo")} small outline/> : null}
        </HeaderContainer>
    )
}

export default Header;