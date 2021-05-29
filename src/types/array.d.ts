declare interface Array<T> {
    find(cb: (value: T) => boolean): T | null

    // キーで探す
    findByKey(key: string, value: any): T | null

    // キーのIndexを返す
    findIndexByKey(key: string, value: any): number;

    // 置き換える
    replaceByKey(key: string, rep: any, add?: boolean): {
        update: '' | 'u' | 'a',
        array: Array<T>,
    };


    // 除外フィルタ
    rejectByKey(key: string, value: any): Array<T>;

    // 最初を取得
    first(): T;

    // 最後を取得
    last(): T;

    // 最後の要素か？
    isLast(idx: number): T;

    // 要素の範囲を超えているか？
    isOver(idx: number): T;

    // from
    from(concat?: Array<T> | T | null): Array<T>;
}

