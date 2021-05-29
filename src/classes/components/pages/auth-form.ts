import {IsEmail, IsNotEmpty, MaxLength} from "class-validator";
import {vo} from "~/classes/app/validator/validator-helper";

export class AuthForm {
    @MaxLength(100, vo('maxLength', {max: 100}))
    @IsEmail({}, vo('isEmail'))
    @IsNotEmpty(vo('req'))
    loginId: string;

    @MaxLength(100, vo('maxLength', {max: 100}))
    @IsNotEmpty(vo('req'))
    password: string;
}
