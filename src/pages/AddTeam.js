import { useState, useEffect } from "react";
import Layout from "../Layouts/Layout";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import uuid from "react-uuid";
import { useCookies } from "react-cookie";

function AddTeam() {
  const [cookie] = useCookies(["cricshizz-web"]);
  const [Alert, SetAlert] = useState();

  const [Team, SetTeam] = useState({
    team_name: "",
    team_logo: "",
    team_banner: "",
    team_color: "",
  });

  function InsertTeam() {
    if (
      Team.team_name === "" ||
      Team.team_color === ""
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
    formData.append("team_name", Team.team_name);
    formData.append("team_logo", Team.team_logo);
    formData.append("team_banner", Team.team_banner);
    formData.append("team_color", Team.team_color);

    const Upload = axios.post(
      `${process.env.REACT_APP_SERVER_URL}team/add`,
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

  useEffect(() => {
    window.$("#inner_banner_ce").uploadFile({
      url: "https://bucket.cricshizz.com.pk",
      fileName: "file_0",
      acceptFiles: "image/*",
      dynamicFormData: function (data) {
        var uuid_name = uuid() + data[0];
        SetTeam({
          ...Team,
          team_banner: uuid_name,
        });
        var data = { upload_Files: true, name_0: uuid_name };
        return data;
      },
    });
    window.$("#inner_logo_ce").uploadFile({
      url: "https://bucket.cricshizz.com.pk",
      fileName: "file_0",
      acceptFiles: "image/*",
      dynamicFormData: function (data) {
        var uuid_name = uuid() + data[0];
        SetTeam({
          ...Team,
          team_logo: uuid_name,
        });
        var data = { upload_Files: true, name_0: uuid_name };
        return data;
      },
    });
  });
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
                        <h3 className="m-0">Add Team</h3>
                      </div>
                    </div>
                  </div>
                  <div className="white_card_body">
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Team Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder=""
                          value={Team?.team_name}
                          onChange={(e) => {
                            SetTeam({
                              ...Team,
                              team_name: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Color
                        </label>
                        <input
                          type="color"
                          className="form-control"
                          id="inputAddress"
                          placeholder=""
                          value={Team?.team_color}
                          onChange={(e) => {
                            SetTeam({
                              ...Team,
                              team_color: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Main Banner
                        </label>
                        <div id="inner_banner_ce"></div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Logo
                        </label>
                        <div id="inner_logo_ce"></div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => {
                          InsertTeam(SetAlert, Team);
                        }}
                      >
                        Add Team
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

export default AddTeam;
