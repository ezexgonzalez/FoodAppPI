import s from "./nav.module.css";
import Logo from "./Nav-Logo.png";

export default function Nav (){

    return( 

        <nav className={s.nav}>
            <img className={s.logo} src={Logo} alt="logo" />
            <span className={s.text}>The Food App</span>
            <button className={s.button}>New Recipe</button>


        </nav>
    )
}