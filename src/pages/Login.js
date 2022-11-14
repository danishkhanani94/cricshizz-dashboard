import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Login = () => {
  const [cookie, setCookie] = useCookies(["cricshizz-web"]);
  const [User, SetUser] = useState({
    user_name: "",
    password: "",
  });
  const LogedIn = () => {
    if (!User.user_name || !User.password) {
      alert("Username Or Password is Required");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}auth/login`,
        { user_name: User.user_name, password: User.password },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((r) => {
        var Result = r.data[0];
        if (Result?.success) {
          setCookie("user", Result.Data, { path: "/" });
          window.location.replace("/");
        } else {
          console.log(Result);
          alert(Result.mess);
        }
      });
  };
  return (
    <>
      <div className="main_content_iner ">
        <div className="container-fluid p-0">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="dashboard_header mb_50">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="dashboard_header_title">
                      <h3>Login</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="white_box mb_30">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <div className="modal-content cs_modal">
                      <div className="modal-header justify-content-center theme_bg_1">
                        <h5 className="modal-title text_white">Log in</h5>
                      </div>
                      <div className="modal-body">
                        <div className="">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              SetUser({ ...User, user_name: e.target.value });
                            }}
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="">
                          <input
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                              SetUser({ ...User, password: e.target.value });
                            }}
                            placeholder="Password"
                          />
                        </div>
                        <button
                          className="btn_1 full_width text-center"
                          onClick={() => {
                            LogedIn();
                          }}
                        >
                          Log in
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <section className="main_content dashboard_part large_header_bg pl-0 left0">
        <div className="container">
          <Login />
        </div>
      </section>
    </>
  );
}

export default App;
