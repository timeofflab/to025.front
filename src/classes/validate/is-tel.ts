import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function IsTel(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: "isLongerThan",
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return /^[0-9]+$/.test(value) || (
                        /^[0-9]+-[0-9]+-[0-9]+$/.test(value)
                    );
                },
            },
        });
    };
}
