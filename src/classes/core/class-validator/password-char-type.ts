import {
    registerDecorator,
    ValidationArguments, ValidationDecoratorOptions,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {PasswordCharValidator} from "@/classes/app/validator/password-char-validator";
import {_} from "~/classes/domain/lang/lang-label-util";

@ValidatorConstraint({name: "passwordCharType", async: true})
export class CompareConstraint implements ValidatorConstraintInterface {
    public async validate(value: any, args: ValidationArguments) {
        return PasswordCharValidator.validChar(value);
    }

    public defaultMessage(validationArguments?: ValidationArguments): string {
        return _('validate.passwordCharType', 'ex.6種類以上の文字を使用してください');
    }
}

export function PasswordCharType(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: CompareConstraint,
        } as ValidationDecoratorOptions);
    };
}
