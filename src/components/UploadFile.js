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

  const Upload = await axios.post(
    "https://bucket.cricshizz.com.pk/api/upload_file",
    formData
  );
  console.log(Upload);
  // Upload.then((r) => {
  //   const Result = r.data;
  //   if (Result?.success) {
  //     if (setFileUploaded) {
  //       var tmp_array = { ...filesUploaded };
  //       tmp_array.success.push(1);
  //       setFileUploaded({ ...tmp_array });
  //     }
  //   } else {
  //     if (setFileUploaded) {
  //       var tmp_array = { ...filesUploaded };
  //       tmp_array.failed.push(1);
  //       setFileUploaded({ ...tmp_array });
  //     }
  //   }
  // }).catch(() => {
  //   if (setFileUploaded) {
  //     var tmp_array = { ...filesUploaded };
  //     tmp_array.failed.push(1);
  //     setFileUploaded({ ...tmp_array });
  //   }
  // });
}
export default UploadFile;
