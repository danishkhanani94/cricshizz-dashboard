import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = (props) => {
  const [cookie, removeCookie] = useCookies(["cricshizz-web"]);
  const LogedOut = () => {
    removeCookie("user");
    window.location.replace("/login");
  };
  return (
    <>
      <nav className="sidebar vertical-scroll  ps-container ps-theme-default ps-active-y">
        <div className="logo d-flex justify-content-center">
          <Link to="/">
            <img src="/cricshizz.png" alt="" height={`50px`} />
          </Link>
          <div className="sidebar_close_icon d-lg-none">
            <i className="ti-close"></i>
          </div>
        </div>
        <ul id="sidebar_menu">
          <li className="mm-active">
            <Link to="/" aria-expanded="false">
              <div className="icon_menu">
                <img src="/img/menu-icon/dashboard.svg" alt="" />
              </div>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mm-active">
            <Link to="/blogs" aria-expanded="false">
              <div className="icon_menu">
                <img src="/img/menu-icon/dashboard.svg" alt="" />
              </div>
              <span>Blogs</span>
            </Link>
          </li>
          <li className="mm-active">
            <Link to="/gallery" aria-expanded="false">
              <div className="icon_menu">
                <img src="/img/menu-icon/dashboard.svg" alt="" />
              </div>
              <span>Gallery</span>
            </Link>
          </li>
          <li className="mm-active">
            <Link to="/add-single-category" aria-expanded="false">
              <div className="icon_menu">
                <img src="/img/menu-icon/dashboard.svg" alt="" />
              </div>
              <span>Add Category</span>
            </Link>
          </li>
          <li className="mm-active">
            <Link to="/add-team" aria-expanded="false">
              <div className="icon_menu">
                <img src="/img/menu-icon/dashboard.svg" alt="" />
              </div>
              <span>Add Team</span>
            </Link>
          </li>
          <li className="mm-active">
            <Link to="/teams" aria-expanded="false">
              <div className="icon_menu">
                <img src="/img/menu-icon/dashboard.svg" alt="" />
              </div>
              <span>Teams</span>
            </Link>
          </li>
          <li className="mm-active">
            <Link to="/add-player" aria-expanded="false">
              <div className="icon_menu">
                <img src="/img/menu-icon/dashboard.svg" alt="" />
              </div>
              <span>Add Player</span>
            </Link>
          </li>
          <li className="mm-active">
            <Link to="/players" aria-expanded="false">
              <div className="icon_menu">
                <img src="/img/menu-icon/dashboard.svg" alt="" />
              </div>
              <span>Players</span>
            </Link>
          </li>
        </ul>
      </nav>

      <section className="main_content dashboard_part large_header_bg">
        <div className="container-fluid g-0">
          <div className="row">
            <div className="col-lg-12 p-0 ">
              <div className="header_iner d-flex justify-content-between align-items-center">
                <div className="sidebar_icon d-lg-none">
                  <i className="ti-menu"></i>
                </div>
                <div className="serach_field-area d-flex align-items-center">
                  <div className="search_inner"></div>
                  <span className="f_s_14 f_w_400 ml_25 white_text text_white">
                    Apps
                  </span>
                </div>
                <div className="header_right d-flex justify-content-between align-items-center">
                  <div className="profile_info">
                    <img src="/img/client_img.png" alt="#" />
                    <div className="profile_info_iner">
                      <div className="profile_author_name">
                        <h5>{props?.user?.name}</h5>
                      </div>
                      <div className="profile_info_details">
                        <Link
                          to={"#0"}
                          onClick={() => {
                            LogedOut();
                          }}
                        >
                          Log Out{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {props.children}
      </section>

      <div className="footer_part">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer_iner text-center">
                <p>
                  2020 © CricShizz - Designed by{" "}
                  <a href="#">
                    {" "}
                    <i className="ti-heart"></i>{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
