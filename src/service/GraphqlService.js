import axios from "axios";

export default class GraphqlService {

    async query($query) {
        const response = await axios.post('http://localhost/graphql', {query: $query});
        if (response.errors) {
            return response.errors;
        } else {
            return response.data;
        }
    }

}