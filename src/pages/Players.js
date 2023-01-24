import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Layout from "../Layouts/Layout";

const AllPlayers = () => {
  const [Players, SetPlayers] = useState([]);
  const [cookie] = useCookies(["cricshizz-web"]);

  useEffect(() => {
    async function getPlayers() {
      await axios
        .get(`${process.env.REACT_APP_SERVER_URL}player/all`, {
          headers: { Authorization: `Bearer ${cookie?.user?.token}` },
        })
        .then((res) => {
          SetPlayers(res.data[0].Data);
        });
    }
    getPlayers();
  }, []);
  async function DeletePlayer(id, index) {
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}player/${id}`, {
        headers: { Authorization: `Bearer ${cookie?.user?.token}` },
      })
      .then((res) => {
        if (res.data[0].success) {
          Players.splice(index, 1);
          SetPlayers([...Players]);
        } else {
          console.log("Error While Deleting :", res.data[0]);
        }
      });
  }
  return (
    <Layout>
      <div className="main_content_iner ">
        <div className="container-fluid p-0">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="white_card card_height_100 mb_30">
                <div className="white_card_header">
                  <div className="box_header m-0">
                    <div className="main-title">
                      <h3 className="m-0">Players</h3>
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
                            to="/add-player"
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
                            <th scope="col">name</th>
                            <th scope="col">category</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Players?.map((v, i) => {
                            return (
                              <tr key={i}>
                                <th scope="row">{v.id}</th>
                                <th scope="row">
                                  <Link to="/" className="question_content">
                                    {v?.name}
                                  </Link>
                                </th>
                                <td>{v?.category}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      DeletePlayer(v.id, i);
                                    }}
                                  >
                                    Delete
                                  </button>
                                  <Link
                                    to={`/player/update/${v.id}`}
                                    className="btn btn-info text-white ml-5"
                                  >
                                    Update
                                  </Link>
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
    </Layout>
  );
};
export default AllPlayers;
