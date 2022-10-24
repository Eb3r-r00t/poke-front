export default function (response, toast) {
    if (response.errors) {

        let errors = response.errors.pop();
        let errorMessage = '';

        if (errors.extensions.validation) {
            for (const [key, value] of Object.entries(errors.extensions.validation)) {
                errorMessage += `${key}: ${value} `;
            }

            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
                life: 3000
            });

        } else {
            errorMessage = 'Error editing ' + this.name + ' Try Again if the problem persists contact support';
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
                life: 3000
            });

        }

        return true;

    } else {

        return false;
    }
}