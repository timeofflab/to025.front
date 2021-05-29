import {IErrorBag} from "~/store/edit";

export class ErrorUtil {

    public static create(name: string, messages: string[]): IErrorBag {
        return {
            name,
            messages,
        };
    }

    public static one(name: string, message: string = 'error'): IErrorBag {
        return self.create(name, [message]);
    }

    public static oneArray(name: string, message: string = 'error'): IErrorBag[] {
        return [self.create(name, [message])];
    }
}

const self = ErrorUtil;
