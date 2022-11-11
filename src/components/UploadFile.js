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
    "https://testing.cricshizz.com.pk/bucket/",
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
        setFileUploaded({
          ...filesUploaded,
          success: filesUploaded.success.push(1),
        });
      }
    } else {
      if (setFileUploaded) {
        setFileUploaded({
          ...filesUploaded,
          failed: filesUploaded.failed.push(1),
        });
      }
    }
  }).catch((err) => {
    if (setFileUploaded) {
      setFileUploaded({
        ...filesUploaded,
        failed: filesUploaded.failed.push(1),
      });
    }
  });
}
export default UploadFile;
