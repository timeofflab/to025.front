import {
    registerDecorator,
    ValidationArguments, ValidationDecoratorOptions,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {PasswordCharValidator} from "@/classes/app/validator/password-char-validator";
import {_} from "~/classes/domain/lang/lang-label-util";

@ValidatorConstraint({name: "passwordChar", async: true})
export class CompareConstraint implements ValidatorConstraintInterface {
    public async validate(value: any, args: ValidationArguments) {
        return PasswordCharValidator.validChar(value);
    }

    public defaultMessage(validationArguments?: ValidationArguments): string {
        return _('validate.passwordChar', 'ex.英文字（a-z,A-Z）、数字(0-9)、記号をそれぞれ1文字以上含めてください');
    }
}

export function PasswordChar(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: CompareConstraint,
        } as ValidationDecoratorOptions);
    };
}
