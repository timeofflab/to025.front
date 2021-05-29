import {Equals, IS_EMAIL, IsEmail, IsMACAddress, IsNotEmpty, IsNumber, Length, MaxLength} from "class-validator";
import {To985ValidatorUtil} from "~/classes/domain/to985/to985-validator-util";

const o = To985ValidatorUtil.o;

export class To985FormContact {
    @IsNotEmpty(o('req'))
    @MaxLength(100, o('maxLength', {
        max: 100,
    }))
    public name: string;

    @IsNotEmpty(o('req'))
    @IsEmail(o('isEmail'))
    @MaxLength(256, o('maxLength', {
        max: 256
    }))
    public email: string;

    @IsNotEmpty(o('req'))
    @MaxLength(100, o('maxLength', {
        max: 100,
    }))
    public title: string;

    @IsNotEmpty(o('req'))
    @MaxLength(100, o('maxLength', {
        max: 3000,
    }))
    public body: string;

    @Equals('1', o('accept'))
    public acceptTerms: number;
}
