import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function Min(min: number, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: "min",
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {

                    const n = Number(value);

                    if (isNaN(n)) {
                        return false;
                    }

                    return min <= n;
                },
            },
        });
    };
}
