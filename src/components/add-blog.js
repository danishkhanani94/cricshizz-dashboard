import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
const AddBlog = ({ InsertBlog, Blog, SetBlog, SetAlert }) => {
  console.log(Blog);
  const [Teams, SetTeams] = useState([]);
  const [Category, SetCategory] = useState([]);
  const [Gallery, SetGallery] = useState([]);
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
    const GetDataGal = axios.get(
      `${process.env.REACT_APP_SERVER_URL}gallery/all`,
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookie?.user?.token}`,
        },
      }
    );
    GetDataGal.then((r) => {
      var Result = r.data[0];
      if (Result?.success) {
        SetGallery(Result.Data);
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
                      <h3 className="m-0">Add Blog</h3>
                    </div>
                  </div>
                </div>
                <div className="white_card_body">
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="inputAddress">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder=""
                        value={Blog?.title}
                        onChange={(e) => {
                          SetBlog({ ...Blog, title: e.target.value });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="inputAddress">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        maxLength="1000"
                        rows="3"
                        name="maxlength-textarea"
                        id="maxlength-textarea"
                        value={Blog?.description}
                        onChange={(e) => {
                          SetBlog({ ...Blog, description: e.target.value });
                        }}
                        placeholder="This Field has a limit of 1000 chars."
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="inputAddress">
                        Long Description
                      </label>
                      <textarea
                        className="form-control"
                        maxLength="5000"
                        rows="3"
                        name="maxlength-textarea"
                        id="maxlength-textarea"
                        value={Blog?.longdescription}
                        onChange={(e) => {
                          SetBlog({ ...Blog, longdescription: e.target.value });
                        }}
                        placeholder="This Field has a limit of 5000 chars."
                      ></textarea>
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
                              SetBlog({
                                ...Blog,
                                mainbanner: e.target.files[0],
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="inputAddress">
                        Inner Banner
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
                              SetBlog({
                                ...Blog,
                                innerbanner: e.target.files[0],
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
                          SetBlog({ ...Blog, match_category: e.target.value });
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
                          SetBlog({ ...Blog, team_a: e.target.value });
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
                          SetBlog({ ...Blog, team_b: e.target.value });
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
                        Blog Gallery
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          SetBlog({
                            ...Blog,
                            gallery: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option></option>
                        {Gallery?.map((v, i) => {
                          return (
                            <option value={v.id} key={i}>
                              {v.album_name} - ( {v.id} )
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="inputAddress">
                        Facebook Gallery
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder=""
                        value={Blog?.fb_gallery}
                        onChange={(e) => {
                          SetBlog({ ...Blog, fb_gallery: e.target.value });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="inputAddress">
                        Match Summary
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder=""
                        value={Blog?.match_summary}
                        onChange={(e) => {
                          SetBlog({ ...Blog, match_summary: e.target.value });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="inputAddress">
                        Posted By
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder=""
                        value={Blog?.uploaded_by}
                        onChange={(e) => {
                          SetBlog({ ...Blog, uploaded_by: e.target.value });
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => {
                        InsertBlog(SetAlert, Blog);
                      }}
                    >
                      Add Blog
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
export default AddBlog;
