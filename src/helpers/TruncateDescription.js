export default function TruncateDescription(data) {
     data.map((item) => {
        if (item.description === null) {
            item.description = 'No description';
        } else {
            if (item.description.split(' ').length > 5) {
                item.description = item.description.split(' ').splice(0, 5).join(' ');
                item.description += '...';
            }
        }
    });
}