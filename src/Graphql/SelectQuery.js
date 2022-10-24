import GraphqlService from "@/service/GraphqlService";

export default async function selectQuery(name) {
    let graphql = new GraphqlService();
    let query = `query { ${name} { id name } }`

    let response = await graphql.query(query);

    let data = response.data[name].map((item) => {
        return {
            value: item.id,
            label: item.name
        }
    });

    data.unshift({value: '', label: 'None'});

    return data;
}