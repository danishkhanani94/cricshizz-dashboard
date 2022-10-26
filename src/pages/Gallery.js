import AddGallery from "../components/add-gallery";
import Layout from "../Layouts/Layout";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import UploadFile from "../components/UploadFile";
import uuid from "react-uuid";
import { useState } from "react";

function App() {
  const [Alert, SetAlert] = useState();
  const [Gallery, SetGallery] = useState({
    album_name: "",
    innerimages: [],
    team_a: "",
    team_b: "",
    match_category: "",
    mainbanner: {},
  });

  const InsertGallery = () => {
    if (
      Gallery.album_name === "" ||
      Gallery.innerimages.length === 0 ||
      Gallery.team_a === "" ||
      Gallery.team_b === "" ||
      Gallery.match_category === "" ||
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
    const formData = new FormData();
    formData.append("album_name", Gallery.album_name);
    formData.append("team_a", Gallery.team_a);
    formData.append("team_b", Gallery.team_b);
    formData.append("match_category", Gallery.match_category);

    const MainBannerName = uuid() + "" + Gallery.mainbanner.name;
    formData.append("mainbanner", MainBannerName);
    UploadFile({
      files: [Gallery.mainbanner],
      name: [MainBannerName],
    });
    const tmp_imagearray = [];
    for (let i = 0; i < Gallery.innerimages.length; i++) {
      const v = Gallery.innerimages[i];
      const InnerBannerName = uuid() + "" + v.name;
      tmp_imagearray.push(InnerBannerName);
      UploadFile({
        files: [v],
        name: [InnerBannerName],
      });
    }
    formData.append("innerimages", JSON.stringify(tmp_imagearray));

    const Upload = axios.post(
      `${process.env.REACT_APP_SERVER_URL}gallery/add`,
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
  };
  return (
    <>
      <Layout>
        <AddGallery
          InsertGallery={InsertGallery}
          Gallery={Gallery}
          SetGallery={SetGallery}
          SetAlert={SetAlert}
        />
      </Layout>
      {Alert}
    </>
  );
}

export default App;
