import { useEffect, useState } from "react";
import axios from "axios";

const Cards = () => {
  const [Data, SetData] = useState({
    blogs: 0,
  });

  useEffect(() => {
    async function getBlogs() {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}blogs/`)
        .then((res) => {
          SetData({ ...Data, blogs: res.data[0].Data.length });
          console.log(res.data[0].Data.length);
        });
    }
    getBlogs();
  }, []);

  return (
    <>
      <div className="main_content_iner ">
        <div className="container-fluid p-0 ">
          <div className="row ">
            <div className="col-lg-12">
              <div className="single_element">
                <div className="quick_activity">
                  <div className="row">
                    <div className="col-12">
                      <div className="quick_activity_wrap">
                        <div className="single_quick_activity">
                          <div className="count_content">
                            <p>Blogs</p>
                            <h3>
                              <span className="counter">{Data.blogs}</span>{" "}
                            </h3>
                          </div>
                        </div>

                        <div className="single_quick_activity">
                          <div className="count_content">
                            <p>Teams</p>
                            <h3>
                              <span className="counter">350</span>{" "}
                            </h3>
                          </div>
                        </div>

                        <div className="single_quick_activity">
                          <div className="count_content">
                            <p>Gellery</p>
                            <h3>
                              <span className="counter">500</span>{" "}
                            </h3>
                          </div>
                        </div>
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
export default Cards;
