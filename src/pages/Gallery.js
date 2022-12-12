import { useState, useEffect } from "react";
import Layout from "../Layouts/Layout";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import UploadFile from "../components/UploadFile";
import uuid from "react-uuid";
import { useCookies } from "react-cookie";

function App() {
  const [cookie] = useCookies(["cricshizz-web"]);
  const [Alert, SetAlert] = useState();

  const [Teams, SetTeams] = useState([]);
  const [Category, SetCategory] = useState([]);

  const [fsuccess, SetFileUploadedSuccess] = useState([]);
  const [ffailed, SetFileUploadedFailed] = useState([]);

  const [Gallery, SetGallery] = useState({
    album_name: "",
    innerimages: [],
    team_a: "",
    team_b: "",
    match_category: "",
    mainbanner: {},
    event_date: "",
  });

  function InsertGallery() {
    if (
      Gallery.album_name === "" ||
      Gallery.innerimages.length === 0 ||
      Gallery.team_a === "" ||
      Gallery.team_b === "" ||
      Gallery.match_category === "" ||
      Gallery.event_date === "" ||
      Gallery.mainbanner.size === undefined
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
    formData.append("album_name", Gallery.album_name);
    formData.append("team_a", Gallery.team_a);
    formData.append("team_b", Gallery.team_b);
    formData.append("event_date", Gallery.event_date);
    formData.append("match_category", Gallery.match_category);

    const MainBannerName = uuid() + "" + Gallery.mainbanner.name;
    formData.append("mainbanner", MainBannerName);
    UploadFile({
      files: [Gallery.mainbanner],
      name: [MainBannerName],
    });
    const tmp_imagenamearray = [];

    const delay = async (name, file) => {
      const formData = new FormData();
      formData.append("file_0", file);
      formData.append("name_0", name);
      formData.append("upload_Files", true);

      return new Promise(async (resolve) => {
        const Upload = await axios.post(
          process.env.REACT_APP_BUCKET_URL,
          formData
        );
        if (Upload.status === 200) {
          const Result = Upload.data;
          if (Result?.success) {
            SetFileUploadedSuccess((arr) => [...arr, `${arr.length}`]);
          } else {
            SetFileUploadedFailed((arr) => [...arr, `${arr.length}`]);
          }
        } else {
          SetFileUploadedFailed((arr) => [...arr, `${arr.length}`]);
        }
        resolve();
      });
    };
    async function makeALoopWait() {
      for (let i = 0; i < Gallery.innerimages.length; i++) {
        const v = Gallery.innerimages[i];
        const InnerBannerName = uuid() + "" + v.name;
        tmp_imagenamearray.push(InnerBannerName);
        await delay(InnerBannerName, v);
      }
      final_submit();
    }
    makeALoopWait();
    function final_submit() {
      formData.append("innerimages", JSON.stringify(tmp_imagenamearray));
      const Upload = axios.post(
        `${process.env.REACT_APP_SERVER_URL}gallery/add`,
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
  }
  useEffect(() => {
    const GetData = axios.get(
      `${process.env.REACT_APP_SERVER_URL}teams/`,
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
        console.log(Result);
      }
    });
    const GetDataCat = axios.get(
      `${process.env.REACT_APP_SERVER_URL}category/`,
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookie?.user?.token}`,
        },
      }
    );
    GetDataCat.then((r) => {
      var Result = r.data[0];
      if (Result?.success) {
        SetCategory(Result.Data);
      } else {
        console.log(Result);
      }
    });
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
                        <h3 className="m-0">Add Gallery</h3>
                      </div>
                    </div>
                  </div>
                  <div className="white_card_body">
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Album Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder=""
                          value={Gallery?.album_name}
                          onChange={(e) => {
                            SetGallery({
                              ...Gallery,
                              album_name: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Main Banner
                        </label>
                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile04"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                SetGallery({
                                  ...Gallery,
                                  mainbanner: e.target.files[0],
                                });
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Album Images
                        </label>
                        <div className="input-group">
                          <input
                            type="file"
                            multiple
                            className="form-control"
                            id="inputGroupFile04"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            onChange={(e) => {
                              if (e.target.files) {
                                SetGallery({
                                  ...Gallery,
                                  innerimages: e.target.files,
                                });
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Match Category
                        </label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            SetGallery({
                              ...Gallery,
                              match_category: e.target.value,
                            });
                          }}
                        >
                          <option></option>
                          {Category?.map((v, i) => {
                            return (
                              <option value={v.id} key={i}>
                                {v.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Match Between Team A
                        </label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            SetGallery({
                              ...Gallery,
                              team_a: e.target.value,
                            });
                          }}
                        >
                          <option></option>
                          {Teams?.map((v, i) => {
                            return (
                              <option value={v.id} key={i}>
                                {v.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Match Between Team B
                        </label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            SetGallery({
                              ...Gallery,
                              team_b: e.target.value,
                            });
                          }}
                        >
                          <option></option>
                          {Teams?.map((v, i) => {
                            return (
                              <option value={v.id} key={i}>
                                {v.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="inputAddress">
                          Date
                        </label>
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="inputGroupFile04"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            onChange={(e) => {
                              SetGallery({
                                ...Gallery,
                                event_date: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        {Gallery?.innerimages?.length > 0 ? (
                          <label className="form-label">
                            Total Files : {Gallery?.innerimages?.length} <br />
                            Total Uploaded : {fsuccess?.length} <br />
                            Failed Uploaded : {ffailed?.length} <br />
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => {
                          InsertGallery(SetAlert, Gallery);
                        }}
                      >
                        Add Gallery
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

export default App;
