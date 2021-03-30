export class ServiceError {
    code
    message
    object

    constructor(code= 400, message = "", object = {}) {
        this.code = code;
        this.message = message;
        this.object = object
    }
}
