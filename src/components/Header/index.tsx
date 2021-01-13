import React from 'react';
import Button from '../Button';
import { BackButton, HeaderContainer } from '../../styles/components/Header';

import CryptoIndexLogo from '../../assets/logo.svg';
import Back from '../../assets/back-button.svg';

export interface HeaderProps {
    center?: boolean,
    back?: boolean,
    onClick?: any
}

const Header: React.FC<HeaderProps> = ({ center, back, onClick }) =>  {
    return (
        <HeaderContainer data-testid={"header"} center={center}>
            {back ? (
                <BackButton onClick={onClick}>
                    <Back data-testid={"back-button"} />
                </BackButton>
            ) : null}
            {!back ? <CryptoIndexLogo data-testid={"logo"} /> : null}
            {!center && !back ? <Button text={"Sair"} onClick={onClick} small outline/> : null}
        </HeaderContainer>
    )
}

export default Header;