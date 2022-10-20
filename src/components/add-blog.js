import { useState } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import UploadFile from "./UploadFile";
import uuid from "react-uuid";

const AddBlog = () => {
  const [Alert, SetAlert] = useState();

  const [Blog, SetBlog] = useState({
    title: "",
    short_title: "",
    description: "",
    uploaded_by: "",
    innerbanner: {},
    mainbanner: {},
    logo: {},
  });

  function InsertBlog() {
    const formData = new FormData();
    formData.append("title", Blog.title);
    formData.append("short_title", Blog.short_title);
    formData.append("description", Blog.description);
    formData.append("uploaded_by", Blog.uploaded_by);

    const LogoName = uuid() + "" + Blog.logo.name;
    const MainBannerName = uuid() + "" + Blog.mainbanner.name;
    const InnerBanerName = uuid() + "" + Blog.innerbanner.name;

    formData.append("innerbanner", InnerBanerName);
    formData.append("mainbanner", MainBannerName);
    formData.append("logo", LogoName);

    UploadFile({
      files: [Blog.logo, Blog.mainbanner, Blog.innerbanner],
      name: [LogoName, MainBannerName, InnerBanerName],
    });

    const Upload = axios.post(
      `${process.env.REACT_APP_SERVER_URL}blogs/add-blog`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    Upload.then((r) => {
      const Result = r.data[0];
      if (Result.success) {
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
                        Small Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder=""
                        value={Blog?.short_title}
                        onChange={(e) => {
                          SetBlog({ ...Blog, short_title: e.target.value });
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="inputAddress">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        maxLength="225"
                        rows="3"
                        name="maxlength-textarea"
                        id="maxlength-textarea"
                        value={Blog?.description}
                        onChange={(e) => {
                          SetBlog({ ...Blog, description: e.target.value });
                        }}
                        placeholder="This textarea has a limit of 225 chars."
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="inputAddress">
                        Logo
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
                                logo: e.target.files[0],
                              });
                            }
                          }}
                        />
                      </div>
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
                        InsertBlog();
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
      {Alert}
    </>
  );
};
export default AddBlog;
