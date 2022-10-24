import Header from "./Header/Header";
const Layout = (props) => {
  return (
    <>
      <Header children={props.children} />
    </>
  );
};
export default Layout;
