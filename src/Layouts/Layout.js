import { useCookies } from "react-cookie";
import Header from "./Header/Header";
const Layout = (props) => {
  const [cookie, setCookie, removeCookie] = useCookies(["cricshizz-web"]);
  if (cookie.user && cookie.user.token) {
    console.log(cookie);
    console.log(cookie.user);
  } else {
    removeCookie("user");
    window.location.replace("/login");
  }
  return (
    <>
      <Header children={props.children} user={cookie?.user} />
    </>
  );
};
export default Layout;
