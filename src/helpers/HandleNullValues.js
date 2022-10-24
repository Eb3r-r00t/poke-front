export default function (request, field, message) {
    request.data[field].map(info => {
        if (info.description === null) {
            info.description = message;
        }
    });
}