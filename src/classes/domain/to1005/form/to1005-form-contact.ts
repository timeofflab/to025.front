import {
    Equals,
    IS_EMAIL,
    IsEmail,
    IsMACAddress,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Length,
    MaxLength
} from "class-validator";
import {To985ValidatorUtil} from "~/classes/domain/to985/to985-validator-util";

const o = To985ValidatorUtil.o;

export class To1005FormContact {
    @MaxLength(100, o('maxLength', {
        max: 100,
    }))
    @IsNotEmpty(o('req'))
    public name: string;

    @MaxLength(100, o('maxLength', {
        max: 100,
    }))
    @IsNotEmpty(o('req'))
    public nameKana: string;

    @MaxLength(256, o('maxLength', {
        max: 256
    }))
    @IsEmail(o('isEmail'))
    @IsNotEmpty(o('req'))
    public email: string;

    @IsOptional()
    @MaxLength(100, o('maxLength', {
        max: 100,
    }))
    public address: string;

    @IsOptional()
    @MaxLength(20, o('maxLength', {
        max: 20,
    }))
    public tel: string;

    @IsNotEmpty(o('req'))
    @MaxLength(3000, o('maxLength', {
        max: 3000,
    }))
    public body: string;
}
