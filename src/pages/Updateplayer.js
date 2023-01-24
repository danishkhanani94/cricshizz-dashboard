import { useState, useEffect } from "react";
import Layout from "../Layouts/Layout";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import uuid from "react-uuid";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

function UpdatePlayer() {
  const params = useParams();
  let { id } = params;
  const [cookie] = useCookies(["cricshizz-web"]);
  const [Alert, SetAlert] = useState();
  const [Teams, SetTeams] = useState([]);

  const [Player, SetPlayer] = useState({
    name: "",
    image: "",
    category: "",
    batting_style: "",
    bowling_style: "",
    team: "",
    id: ""
  });

  function UpPlayer() {
    if (
      Player.name === "" ||
      Player.category === "" ||
      Player.batting_style === "" ||
      Player.bowling_style === "" ||
      Player.team === ""
    ) {
      SetAlert(
        <SweetAlert
          warning
          show={true}
          allowEscape={true}
          closeOnClickOutside={true}
          title={"All Field's are required"}
          onConfirm={() => {
            SetAlert();
          }}
          onCancel={() => {
            SetAlert();
          }}
        ></SweetAlert>
      );
      return false;
    }
    const formData = new URLSearchParams();
    formData.append("name", Player.name);
    formData.append("image", Player.image);
    formData.append("category", Player.category);
    formData.append("batting_style", Player.batting_style);
    formData.append("bowling_style", Player.bowling_style);
    formData.append("team", Player.team);
    formData.append("id", Player.id);

    const Upload = axios.post(
      `${process.env.REACT_APP_SERVER_URL}player/update`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${cookie?.user?.token}`,
        },
      }
    );
    Upload.then((r) => {
      var Result = r.data[0];
      if (Result?.success) {
        SetAlert(
          <SweetAlert
            success
            show={true}
            allowEscape={true}
            closeOnClickOutside={true}
            title={Result.mess}
            onConfirm={() => {
              SetAlert();
            }}
            onCancel={() => {
              SetAlert();
            }}
          ></SweetAlert>
        );
      } else {
        SetAlert(
          <SweetAlert
            warning
            show={true}
            allowEscape={true}
            closeOnClickOutside={true}
            title={Result.mess}
            onConfirm={() => {
              SetAlert();
            }}
            onCancel={() => {
              SetAlert();
            }}
          ></SweetAlert>
        );
      }
    });
  }
  async function getPlayer() {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}player/getByID/${id}`, {
        headers: { Authorization: `Bearer ${cookie?.user?.token}` },
      })
      .then((res) => {
        SetPlayer(res.data[0].Data[0]);
      });
  }
  useEffect(() => {
    window.$("#inner_banner_ce").uploadFile({
      url: "https://bucket.cricshizz.com.pk",
      fileName: "file_0",
      acceptFiles: "image/*",
      dynamicFormData: function (data) {
        var uuid_name = uuid() + data[0];
        SetPlayer({
          ...Player,
          image: uuid_name,
        });
        var data = { upload_Files: true, name_0: uuid_name };
        return data;
      },
    });
    const GetData = axios.get(
      `${process.env.REACT_APP_SERVER_URL}team/all`,
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookie?.user?.token}`,
        },
      }
    );
    GetData.then((r) => {
      var Result = r.data[0];
      if (Result?.success) {
        SetTeams(Result.Data);
      } else {
      }
    });
    getPlayer();
  }, []);
  return (
    <>
      <Layout>
        <div className="main_content_iner ">
          <div className="container-fluid p-0 sm_padding_15px">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="white_card card_height_100 mb_30">
                  <div className="white_card_header">
                    <div className="box_header m-0">
                      <div className="main-title">
                        <h3 className="m-0">Update Player</h3>
                      </div>
                    </div>
                  </div>
                  <div className="white_card_body">
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Player Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder=""
                          value={Player?.name}
                          onChange={(e) => {
                            SetPlayer({
                              ...Player,
                              name: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Player Category
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder=""
                          value={Player?.category}
                          onChange={(e) => {
                            SetPlayer({
                              ...Player,
                              category: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Batting Style
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder=""
                          value={Player?.batting_style}
                          onChange={(e) => {
                            SetPlayer({
                              ...Player,
                              batting_style: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Bowling Style
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder=""
                          value={Player?.bowling_style}
                          onChange={(e) => {
                            SetPlayer({
                              ...Player,
                              bowling_style: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Image
                        </label>
                        <div id="inner_banner_ce"></div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Team
                        </label>
                        <select
                          className="form-control"

                          onChange={(e) => {
                            SetPlayer({
                              ...Player,
                              team: e.target.value,
                            });
                          }}
                        >
                          <option></option>
                          {Teams?.map((v, i) => {
                            return (
                              <option selected={Player.id === v.id ? 'selected' : ''} value={v.id} key={i}>
                                {v.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => {
                          UpPlayer(SetAlert, Player);
                        }}
                      >
                        Update Player
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {Alert}
    </>
  );
}

export default UpdatePlayer;
