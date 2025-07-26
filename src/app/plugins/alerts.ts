import Swal from "sweetalert2";

const succesAlert = (title: string, text: string, timer: number) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: timer > 0 ? timer: undefined,
        timerProgressBar: timer > 0 ? true : false,
    })
}
const errorAlert = (title: string, text: string) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    })
}

export const alerts = {
    success: succesAlert,
    error: errorAlert
}