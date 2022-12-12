import axios from "axios";

async function UploadFile({
  props,
  files,
  name,
  filesUploaded,
  setFileUploaded,
}) {
  const formData = new FormData();
  files?.map((v, i) => {
    formData.append("file_" + i, v);
  });
  name?.map((v, i) => {
    formData.append("name_" + i, v);
  });
  formData.append("upload_Files", true);

  const Upload = await axios.post(process.env.REACT_APP_BUCKET_URL_MULTI, formData);
  if (Upload.status === 200) {
    const Result = Upload.data;
    if (Result?.success) {
      if (setFileUploaded) {
        var tmp_array = { ...filesUploaded };
        tmp_array.success = Result.TotalFilesUpload;
        tmp_array.failed = Result.TotalFilesFailed;
        setFileUploaded({ ...tmp_array });
      }
    } else {
      if (setFileUploaded) {
        var tmp_array = { ...filesUploaded };
        tmp_array.success = Result.TotalFilesUpload;
        tmp_array.failed = Result.TotalFilesFailed;
        setFileUploaded({ ...tmp_array });
      }
    }
  } else {
    if (setFileUploaded) {
      var tmp_array = { ...filesUploaded };
      tmp_array.failed = tmp_array.success;
      tmp_array.success = 0;
      setFileUploaded({ ...tmp_array });
    }
  }
}
export default UploadFile;
