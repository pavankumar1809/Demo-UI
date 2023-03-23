import React from "react";
import BurgerMenu from "react-burger-menu";
import LoginIcon from "@mui/icons-material/Login";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PinIcon from "@mui/icons-material/Pin";

function Menu(props) {
  const Menu = BurgerMenu["slide"];

  function getItems() {
    let items = [
      <h2 key="0">
        <i className="fa fa-fw fa-inbox fa-2x" />
        <span>Pages</span>
      </h2>,
      <a key="1" href="/login">
        <LoginIcon />
        <span>Login Page</span>
      </a>,
      <a key="2" href="/encrypt">
        <EnhancedEncryptionIcon />
        <span>Encrypt</span>
      </a>,
      <a key="2" href="/decrypt">
      <EnhancedEncryptionIcon />
      <span>Decrypt</span>
    </a>,
      <a key="3" href="/sso/setup">
        <VpnKeyIcon />
        <span>Federation Setup</span>
      </a>,
      // <a key="4" href="/">
      //   <PinIcon />
      //   <span>Mfa Login</span>
      // </a>,
    ];
    return items;
  }
  return (
    <div className="left">
      <Menu
        id={"pushRotate"}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        right={false}
      >
        {getItems()}
      </Menu>
    </div>
  );
}

export default Menu;
