import axios from "axios";

class BackendRequest {
    static async sendRequest(url, method, headers = {}, data) {
        // Set default headers if not provided
        console.log(data)
        const defaultHeaders = {
            "Content-Type": "application/json"
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        // const parsedData = JSON.parse(data);
        try {
            const response = await axios({
                method: method,
                url: url,
                headers: mergedHeaders,
                data: data
            })

            return response;
        } catch (error) {
            // Handle error response
            throw error;
        }
    }
}

export { BackendRequest };