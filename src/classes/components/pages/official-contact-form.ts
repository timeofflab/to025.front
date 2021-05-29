import {IsEmail, IsNotEmpty, IsOptional, MaxLength} from "class-validator";
import {vo} from "~/classes/app/validator/validator-helper";

export class OfficialContactForm {

    public _csrf: string;
    public captcha: string;

    @IsNotEmpty(vo('reqSelect'))
    public category: string;

    @MaxLength(100, vo('maxLength', {max: 100}))
    @IsNotEmpty(vo('req'))
    public contactName: string;

    @MaxLength(100, vo('maxLength', {max: 100}))
    @IsEmail({}, vo('isEmail'))
    @IsNotEmpty(vo('req'))
    public mail: string;

    @MaxLength(3000, vo('maxLength', {max: 3000}))
    @IsNotEmpty(vo('req'))
    public body: string;

    @IsNotEmpty(vo('accept'))
    public termsAccept: string;
}
