import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
const AddGallery = ({
  InsertGallery,
  Gallery,
  SetGallery,
  SetAlert,
  filesUploaded,
}) => {
  const [Teams, SetTeams] = useState([]);
  const [Category, SetCategory] = useState([]);
  const [cookie] = useCookies(["cricshizz-web"]);

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
                          SetGallery({ ...Gallery, team_a: e.target.value });
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
                          SetGallery({ ...Gallery, team_b: e.target.value });
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
                          Total Uploaded : {filesUploaded?.success?.length}{" "}
                          <br />
                          Failed Uploaded : {filesUploaded?.failed?.length}{" "}
                          <br />
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
    </>
  );
};
export default AddGallery;
