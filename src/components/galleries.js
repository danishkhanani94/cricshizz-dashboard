import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Galleries = () => {
  const [Gallerie, SetGallerie] = useState([]);

  useEffect(() => {
    async function getGallery() {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}gallery/all`)
        .then((res) => {
          SetGallerie(res.data[0].Data);
          console.log(res.data[0].Data);
        });
    }
    getGallery();
  }, []);
  async function DeleteGallery(id, index) {
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}gallery/${id}`)
      .then((res) => {
        if (res.data[0].success) {
          Gallerie.splice(index, 1);
          SetGallerie([...Gallerie]);
        } else {
          console.log("Error While Deleting :", res.data[0]);
        }
      });
  }
  return (
    <>
      <div className="main_content_iner ">
        <div className="container-fluid p-0">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="white_card card_height_100 mb_30">
                <div className="white_card_header">
                  <div className="box_header m-0">
                    <div className="main-title">
                      <h3 className="m-0">Galleries</h3>
                    </div>
                  </div>
                </div>
                <div className="white_card_body">
                  <div className="QA_section">
                    <div className="white_box_tittle list_header">
                      <h4></h4>
                      <div className="box_right d-flex lms_block">
                        <div className="serach_field_2"></div>
                        <div className="add_button ms-2">
                          <Link
                            to="/add-gallery"
                            data-bs-toggle="modal"
                            data-bs-target="#addcategory"
                            className="btn_1"
                          >
                            Add New
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="QA_table mb_30">
                      <table className="table lms_table_active ">
                        <thead>
                          <tr>
                            <th scope="col">id</th>
                            <th scope="col">Album title</th>
                            <th scope="col">match category</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Gallerie?.map((v, i) => {
                            return (
                              <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <th scope="row">
                                  <Link to="/" className="question_content">
                                    {v?.album_name}
                                  </Link>
                                </th>
                                <td>{v?.match_category}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      DeleteGallery(v.id, i);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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
export default Galleries;
