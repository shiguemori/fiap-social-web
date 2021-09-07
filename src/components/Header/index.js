import {Container, IconSignOut} from "./styles";
import imgLogo from "../../assets/logo.png";
import imgProfile from "../../assets/profileStandard.png";
import {getUser} from "../../services/security";

function Header() {
    let signedUser = getUser();
    return (
        <Container>
            <div>
                <img src={imgLogo} id="logo" alt=""/>
                <img src={signedUser.image ? signedUser.image : imgProfile} alt=""/>
                <p>{signedUser.name}</p>
            </div>
            <IconSignOut/>
        </Container>
    )
}

export default Header;
