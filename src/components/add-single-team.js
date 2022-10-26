import { useState } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

const AddTeam = () => {
  const [Alert, SetAlert] = useState();

  const [Team, SetTeam] = useState({
    name: "",
  });

  function InsertTeam() {
    if (Team.name === "") {
      SetAlert(
        <SweetAlert
          warning
          show={true}
          allowEscape={true}
          closeOnClickOutside={true}
          title={"Name Is Required"}
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
    const formData = new FormData();
    formData.append("name", Team.name);

    const Upload = axios.post(
      `${process.env.REACT_APP_SERVER_URL}teams/add-name`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
  return (
    <>
      <div className="main_content_iner ">
        <div className="container-fluid p-0 sm_padding_15px">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="white_card card_height_100 mb_30">
                <div className="white_card_header">
                  <div className="box_header m-0">
                    <div className="main-title">
                      <h3 className="m-0">Add Team Name</h3>
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
                        value={Team?.name}
                        onChange={(e) => {
                          SetTeam({ ...Team, name: e.target.value });
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => {
                        InsertTeam();
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
      {Alert}
    </>
  );
};
export default AddTeam;
