import he from 'he';

const TAG = 'TxtUtil';

export default class TxtUtil {
    public static encEntitiesURI(txt: string): string {
        return encodeURIComponent(he.encode(txt));
    }

    public static decEntitiesURI(txt: string): string {
        return he.decode(decodeURIComponent(txt));
    }

    public static encEntities(txt: string): string {
        return he.encode(txt);
    }

    public static decEntities(txt: string): string {
        return he.decode(txt);
    }

    /**
     * タグを消す
     */
    public static deleteTag(txt: string): string {
        return txt.replace(/<[\/]?[^>]+>/g, '');
    }

    /**
     * タグ記号(属性用)
     */
    public static escapeTagAttr(txt: string): string {
        return self.encEntities(txt);
    }

    /**
     * タグ記号
     */
    public static escapeTag(txt: string): string {
        return txt
            .replace(/\\/g, ' ')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    /*
        大文字だけか小文字だけか返す
    */
    public static detectCase(value: string): any {

        if (!value) {
            return
        }

        // 最後が 's の場合、他が大文字だったら大文字あつかい
        if (value.slice(-2) == '\'s') {

            const s = value.slice(0, -2);
            if (s.match(/^[A-Z0-9\s]+$/)) {
                return '-upper';
            }
        }

        //すべて大文字と数字だけ
        else if (value.match(/^[A-Z0-9\s]+$/)) {
            return '-upper';
        } else if (value.match(/^[a-z0-9\s]+$/)) {
            return '-lower';
        }

        return '';
    }

}

const self = TxtUtil;
