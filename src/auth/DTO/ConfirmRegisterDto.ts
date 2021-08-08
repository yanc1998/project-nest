import { IsJWT, IsNotEmpty } from "class-validator";

export class ConfirmRegisterDto {
    @IsNotEmpty()
    @IsJWT()
    validationCode: string;
}