export class AdminAuthResponseDto {
    id: number;
    fullName: string;
    email: string;
    token: string;

    constructor(id: number, fullName: string, email: string, token: string) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.token = token;
    }
}
