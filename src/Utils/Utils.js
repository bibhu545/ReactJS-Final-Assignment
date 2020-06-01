import Swal from 'sweetalert2'

export const getRandomId = () => {
    return Math.floor((Math.random()) * 0x10000).toString(16)
}

export class Utils {
    showErrorMessage(message, footerMessage) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            footer: footerMessage
        })
    }
    showSuccessMessage(message) {
        Swal.fire(
            message,
            'Your file has been deleted.',
            'success'
        )
    }
    showConfirm(message, confirmBtnText) {
        return Swal.fire({
            title: 'Are you sure?',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmBtnText
        });
    }
}