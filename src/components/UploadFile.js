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
  window.$.ajax({
    url: "http://bucket.cricshizz.com.pk:8080/api/upload_file",
    data: formData,
    type: "POST",
    processData: false,
    crossDomain: true,
    contentType: false,
    success: function (data) {
      const Result = data;
      console.log(Result);
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
    },
    error: function () {
      if (setFileUploaded) {
        var tmp_array = { ...filesUploaded };
        tmp_array.failed.push(1);
        setFileUploaded({ ...tmp_array });
      }
    },
  });
}
export default UploadFile;
