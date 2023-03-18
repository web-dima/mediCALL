import {Link} from "react-router-dom";

const Header = ()=> {
    return(
        <div>
            <Link to="/">главная</Link>
            <Link to="/me">Профиль</Link>
        </div>
    )
}

export default Header