import {$v} from "~/classes/utils/var-util";
import {To025} from "~/classes/domain/to025";

const $O = To025.Project.DateUtil;
const DTAG = 'DateUtil';
const DC = 'T01';
describe('dateUtil', () => {
    $v.init();
    it('T01-01: - validFormat(23456) is T', () => {
        // console.log('%s｜%s-01｜validFormat', DTAG, DC);
        expect($O.validFormat('123456')).toBeTruthy();
    });

    it('T01-02: - validFormat(2345678) is T', () => {
        // console.log('%s｜%s-02｜validFormat(2345678)', DTAG, DC);
        expect($O.validFormat('12345678')).toBeTruthy();
    });

    // ---
    it('T01-11: - validDate(20200101) is T', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('20200101')).toBeTruthy();
    });

    it('T01-12: - validDate(200101) is T', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('200101')).toBeTruthy();
    });

    it('T01-14: - validDate() is F', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('')).toBeFalsy();
    });

    it('T01-15: - validDate(1) is F', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('1')).toBeFalsy();
    });

    it('T01-16: - validDate(aaa) is F', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('aaa')).toBeFalsy();
    });

    it('T01-17: - validDate(99999999) is F', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('99999999')).toBeFalsy();
    });

    it('T01-17 - validDate(99999999) is F', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('99999999')).toBeFalsy();
    });

    it('T01-18 - validDate(991331) is F', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('991331')).toBeFalsy();
    });

    it('T01-18 - validDate(991331) is F', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('210230')).toBeFalsy();
    });

    it('T01-18 - validDate(991331) is F', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('991331')).toBeFalsy();
    });

    it('T01-18 - validDate(210228) is F', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('210228')).toBeTruthy();
    });

    it('T01-19 - validDate(990101) is F', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('990101')).toBeTruthy();
    });

    it('T01-20 - validDate(21.07.30) is T', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('21.07.30')).toBeTruthy();
    });

    it('T01-21 - validDate(3021.07.30) is T', () => {
        // console.log('%s｜%s-04｜validDate', DTAG, DC);
        expect($O.validDate('3021.07.30')).toBeTruthy();
    });
});
