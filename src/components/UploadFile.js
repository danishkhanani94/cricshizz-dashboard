import axios from "axios";

function UploadFile(props) {
    const formData = new FormData();
    props.files.map((v, i) => {
        formData.append("file_" + i, v);
    })
    props.name.map((v, i) => {
        formData.append("name_" + i, v);
    })
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
        const Result = r.data[0];
        if (Result.success) {
            console.log(Result)
        } else {
            console.log(r)
        }
    });
}
export default UploadFile