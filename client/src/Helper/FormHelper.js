import Swal from 'sweetalert2';

let EmailRegx = /\S+@\S+\.\S+/;
let OnlyNumberRegx=/^-?[0-9]+(?:\.[0-9]+)?$/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {

    IsEmpty(value) {
        return value.length === 0;
    }

    IsMobile(value) {
        return MobileRegx.test(value);
    }

    IsEmail(value) {
        return EmailRegx.test(value);
    }
    IsNumber(value) {
        return OnlyNumberRegx.test(value);
    }


    ErrorToast(msg) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: msg,
            position: "bottom-center"
        });
    }

    SuccessToast(msg) {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: msg,
            position: "bottom-center"
        });
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
}

export const {
    IsEmpty,
    IsMobile,
    IsNumber,
    IsEmail,
    ErrorToast,
    getBase64,
    SuccessToast
} = new FormHelper();
