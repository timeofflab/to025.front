export interface ISelectGroup {
    label: string;
    children?: ISelect[];
}

export interface ISelect {
    value: any;
    label: string;
    children?: ISelect[];   // ある場合はSelectGroup
}
