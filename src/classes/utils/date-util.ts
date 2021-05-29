import moment from 'moment-timezone';
import {$v} from "./var-util";
import {DateFormat} from "@/configs/master-const";

const TAG = 'DateUtil';

export class DateUtil {

    public static dateFormatDMMMYYYY(d: string): string {
        // console.log('[%s.dateFormatDMMMYYYY] d=', TAG, d);
        return $v.dateFormat(d, 'D MMMM YYYY');
    }

    /**
     *
     * @param dt
     */
    public static dt2UtcIso(dt: string): string {

        if (!/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(dt)) {
            return dt;
        } else {
            dt += 'Z';
            dt = dt.replace(' ', 'T');
            return dt;
        }
    }

    /**
     *
     */
    public static dateTz(dt: any = null, tz: string = 'UTC'): moment.Moment {
        // console.log('$v.datetime() > %s', dt);
        return moment((dt || moment().format('YYYY-MM-DD 00:00:00.000')) as any).tz(tz);
    }

    /**
     *
     */
    public static date(dt: any = null): moment.Moment {
        // console.log('$v.datetime() > %s', dt);
        return moment((dt || moment().format('YYYY-MM-DD 00:00:00.000Z')) as any);
    }

    /**
     *
     */
    public static now(): moment.Moment {
        return $d.datetime().tz('UTC');
    }

    /**
     *
     */
    public static datetime(dt: any = null, format: string = DateFormat.FullTz): moment.Moment {
        if ($v.isString(dt) && /:[0-9]{2}$/.test(dt)) {
            dt = $d.dt2UtcIso(dt);
        }

        if (!!dt) {
            // console.log('datetime() - 1 - ', dt);
            return moment(dt, format);
        } else {
            // console.log('datetime() - 2');
            return moment().tz('UTC');
        }
    }

    /**
     *
     */
    public static datetimeFromUTC(dt: any = null): moment.Moment {
        return moment((dt || new Date()) as any).utc();
    }

    public static datetimeFormat(dt: string | moment.Moment | null = null,
                                 format: string | null = null,
    ): string {
        return $d.datetime(dt).format(format || DateFormat.FullTz);
    }

    /**
     *
     */
    public static dateFormat(dt: string | moment.Moment | null = null,
                             format: string | null = null,
    ): string {
        return $d.dateFormatTz(dt, format || 'YYYY-MM-DD', 'UTC');
    }

    public static datetimeFormatTz(dt: string | moment.Moment | null = null,
                                   format: string | null = null,
                                   tz: string = 'UTC',
    ): string {
        return $v.datetime(dt || $v.datetime()).tz(tz).format(format || DateFormat.FullTz);
    }

    /**
     *
     */
    public static dateFormatTz(dt: string | moment.Moment | null = null,
                               format: string | null = null,
                               tz: string = 'UTC'
    ): string {
        if (dt === '' || dt === null) {
            return $v.date().tz(tz).format(format || 'YYYY-MM-DD');
        } else {
            return $v.date(dt).tz(tz).format(format || 'YYYY-MM-DD');
        }
    }

    public static gt(a: moment.Moment, b: moment.Moment): boolean {
        return a.isAfter(b);
    }

    public static lt(a: moment.Moment, b: moment.Moment): boolean {
        return a.isBefore(b);
    }

}

export const $d = DateUtil;
