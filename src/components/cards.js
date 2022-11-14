import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Cards = () => {
  const [Data, SetData] = useState({
    blogs: 0,
    gallery: 0,
  });
  const [cookie] = useCookies(["cricshizz-web"]);

  useEffect(() => {
    async function getData() {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}counts`, {
          headers: { Authorization: `Bearer ${cookie?.user?.token}` },
        })
        .then((res) => {
          if (res?.data[0]?.Data) {
            SetData(res?.data[0]?.Data);
          }
        });
    }
    getData();
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
                            <p>Gallery</p>
                            <h3>
                              <span className="counter">{Data.gallery}</span>{" "}
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
