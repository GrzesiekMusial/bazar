import { create } from "apisauce";

const apiClient = create({
    baseURL: process.env.REACT_APP_API_URL,

    onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("UPLOAD ", percentCompleted);
    },
    onDownloadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("DOWNLOAD ", percentCompleted);
    },
});

apiClient.setHeader("x-auth-token", localStorage.getItem("token"));

export { apiClient };
