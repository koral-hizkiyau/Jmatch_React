import { apiUrl, doApiPost } from "../../services/apiService";

export const delReports = async (_id, counterApi, setCounterApi) => {
    let userChoose = global.confirm("Are you sure you want to delete?");
    if (userChoose) {
        let url = apiUrl+'/reports/del';
        let data = await doApiPost(url, { del: _id });

        

        if (data.message) {
            setCounterApi(counterApi + 1)
            return true;
        }
        else {
            alert("error something not work!")
        }
    }
}