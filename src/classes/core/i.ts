export interface IViewSize {
    width: number;
    height: number;
}

export interface IKv {
    key: string;
    value: string;
}

export interface IApiMessage {
    result: boolean;
    ex?: any;
}

export interface IApiMessageSuccess extends IApiMessage {
    result: true;
}

export interface IApiMessageFail extends IApiMessage {
    result: false;
    code: string;
}
