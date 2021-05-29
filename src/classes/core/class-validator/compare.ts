import {
    registerDecorator,
    ValidationArguments, ValidationDecoratorOptions,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {$v} from "@/classes/utils/var-util";

@ValidatorConstraint({name: "compare", async: true})
export class CompareConstraint implements ValidatorConstraintInterface {
    public async validate(value: any, args: ValidationArguments) {

        const property = args.property;
        const target = String(property).replace(/_confirmation$/, '')
            .replace(/Confirmation$/, '');
        const cv = $v.p(args.object, target) || null;

        console.log('@Compare() > property=%s, confirmed=%s > v=%s : cv=%s',
            property,
            target,
            value,
            cv);

        if (!cv) {
            return true;
        }

        return (value === cv);
    }

    public defaultMessage(validationArguments?: ValidationArguments): string {
        console.log('defaultMessage > ', validationArguments);
        return `${$v.p(validationArguments, 'property')} compare`;
    }
}

export function Compare(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: CompareConstraint,
        } as ValidationDecoratorOptions);
    };
}
