import axios from "axios";

function UploadFile({ props, files, name, filesUploaded, setFileUploaded }) {
  const formData = new FormData();
  files?.map((v, i) => {
    formData.append("file_" + i, v);
  });
  name?.map((v, i) => {
    formData.append("name_" + i, v);
  });
  formData.append("upload_Files", true);

  const Upload = axios.post(
    "https://cricshizz.com.pk/bucket/index.php",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  Upload.then((r) => {
    const Result = r.data;
    if (Result?.success) {
      if (setFileUploaded) {
        var tmp_array = { ...filesUploaded };
        tmp_array.success.push(1);
        setFileUploaded({ ...tmp_array });
      }
    } else {
      if (setFileUploaded) {
        var tmp_array = { ...filesUploaded };
        tmp_array.failed.push(1);
        setFileUploaded({ ...tmp_array });
      }
    }
  }).catch((err) => {
    if (setFileUploaded) {
      var tmp_array = { ...filesUploaded };
      tmp_array.failed.push(1);
      setFileUploaded({ ...tmp_array });
    }
  });
}
export default UploadFile;
