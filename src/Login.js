import { Link } from "react-router-dom";

const Login = () => {
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
                        <form>
                          <div className="">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                            />
                          </div>
                          <Link to="/" className="btn_1 full_width text-center">
                            Log in
                          </Link>
                        </form>
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
