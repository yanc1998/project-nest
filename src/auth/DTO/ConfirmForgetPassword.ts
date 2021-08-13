import { IsJWT, IsNotEmpty } from "class-validator";

export class ConfirmForgetPassword {
    @IsNotEmpty()
    @IsJWT()
    validationCode: string;
}
