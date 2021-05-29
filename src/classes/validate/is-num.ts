import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function IsNum(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: "isNum",
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return /^[-]?[0-9]+$/.test(value);
                },
            },
        });
    };
}
