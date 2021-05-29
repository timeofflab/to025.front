import {$v} from "~/classes/utils/var-util";
import TxtUtil from "~/classes/view/txt-util";

describe('TxtUtil', () => {
    const DTAG = 'TxtUtil';
    $v.init();
    it('T1000: - encEntities', () => {

        const e = TxtUtil.encEntities('<script>');
        console.log('[%s.T1000]', DTAG, e);
        expect(e).toEqual('&#x3C;script&#x3E;');
    });

    it('T2000: - encEntities', () => {

        const e = TxtUtil.encEntitiesURI('<script>');
        console.log('[%s.T2000]', DTAG, e);
        expect(e).toEqual('%26%23x3C%3Bscript%26%23x3E%3B');
    });

    it('T3000: - encEntities', () => {
        const e = TxtUtil.decEntities('&#x3C;script&#x3E;');
        console.log('[%s.T3000]', DTAG, e);
        expect(e).toEqual('<script>');
    });

    it('T4000: - encEntities', () => {

        const e = TxtUtil.decEntitiesURI('%26%23x3C%3Bscript%26%23x3E%3B');
        console.log('[%s.T4000]', DTAG, e);
        expect(e).toEqual('<script>');
    });
});
