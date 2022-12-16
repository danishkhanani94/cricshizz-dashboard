import AddBlog from "../components/add-blog";
import Layout from "../Layouts/Layout";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import UploadFile from "../components/UploadFile";
import uuid from "react-uuid";
import { useState } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [cookie] = useCookies(["cricshizz-web"]);
  const [Alert, SetAlert] = useState();
  const [Blog, SetBlog] = useState({
    title: "",
    description: "",
    longdescription: "",
    uploaded_by: "",
    team_a: "",
    team_b: "",
    gallery: null,
    match_category: "",
    innerbanner: {},
    mainbanner: {},
    match_summary: "",
    fb_gallery: "",
    publish_date:""
  });

  const InsertBlog = () => {
    if (
      Blog.title === "" ||
      Blog.description === "" ||
      Blog.longdescription === "" ||
      Blog.uploaded_by === "" ||
      Blog.match_category === "" ||
      Blog.match_summary === "" ||
      Blog.mainbanner.size === undefined ||
      Blog.innerbanner.size === undefined
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
    formData.append("title", Blog.title);
    formData.append("description", Blog.description);
    formData.append("longdescription", Blog.longdescription);
    formData.append("uploaded_by", Blog.uploaded_by);
    formData.append("team_a", Blog.team_a);
    formData.append("team_b", Blog.team_b);
    formData.append("gallery", Blog.gallery);
    formData.append("match_category", Blog.match_category);
    formData.append("match_summary", Blog.match_summary);
    formData.append("fb_gallery", Blog.fb_gallery);
    formData.append("publish_date", Blog.publish_date);

    const MainBannerName = uuid() + "" + Blog.mainbanner.name;
    const InnerBanerName = uuid() + "" + Blog.innerbanner.name;

    formData.append("innerbanner", InnerBanerName);
    formData.append("mainbanner", MainBannerName);

    UploadFile({
      files: [Blog.mainbanner, Blog.innerbanner],
      name: [MainBannerName, InnerBanerName],
    });

    const Upload = axios.post(
      `${process.env.REACT_APP_SERVER_URL}blogs/add-blog`,
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
  };
  return (
    <>
      <Layout>
        <AddBlog
          InsertBlog={InsertBlog}
          Blog={Blog}
          SetBlog={SetBlog}
          SetAlert={SetAlert}
        />
      </Layout>
      {Alert}
    </>
  );
}

export default App;
