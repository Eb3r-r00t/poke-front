export default function (mapData, field, statuses) {
    mapData.map(info => {
        if (info[field] === true) {
            info[field] = statuses[0];
        } else {
            info[field] = statuses[1];
        }
    });
}