import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function Max(max: number, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: "max",
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

                    return max >= n;
                },
            },
        });
    };
}
