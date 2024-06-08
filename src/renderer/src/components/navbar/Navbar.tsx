
import "./styles/navbar.css"
import clockLogo from "../../assets/images/clock-logo.svg";
import { NavbarActionButtons } from "./components/action-buttons/NavbarActionButtons";



const NAVBAR_BASE_CALSSNAME = "lt";


export const Navbar = () => {


    return <div className={`${NAVBAR_BASE_CALSSNAME}-navbar`}>
    <div className={`${NAVBAR_BASE_CALSSNAME}-navbar--header`}>
      <div className={`${NAVBAR_BASE_CALSSNAME}-navbar--header-logo`}>
        <img src={clockLogo} height={"20px"} />
      </div>
      <div className={`${NAVBAR_BASE_CALSSNAME}-navbar--header-name`}>
        <p className={`${NAVBAR_BASE_CALSSNAME}-navbar--header-content`} style={{color: "white"}}>
          Letime
        </p>
      </div>
    </div>
    <NavbarActionButtons />
  </div>
}