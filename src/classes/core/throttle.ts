export default class Throttle {
    /**
     *
     * @param wait
     * @returns {Throttle}
     */
    public static create(wait: number = 1500): Throttle {
        return new Throttle(wait);
    }

    private cnt: number = 0;
    private time: number;
    private wait: number;

    constructor(wait: number = 1500) {
        this.cnt = 0;
        this.wait = wait;
        this.time = Date.now();
    }

    public async throttleAsync(fn: () => Promise<void>) {
        if (this.cnt != 0) {
            return false;
        }
        this.cnt = 1;
        await fn();
        setTimeout(() => {
            this.cnt = 0;
        }, this.wait);

        return true;
    }

    public async delayAsync(fn: () => Promise<void>, wait: number = 1500) {
        setTimeout(async () => {
            await this.throttleAsync(fn);
        }, wait);
    }

    public async debounceAsync(fn: () => Promise<void>) {
        await this.throttleAsync(async () => {
            setTimeout(async () => {
                await fn();
            }, this.wait);
        });
    }

    public throttle(fn: () => void): boolean {
        if (this.cnt != 0) {
            return false;
        }
        this.cnt = 1;
        fn();
        setTimeout(() => {
            this.cnt = 0;
        }, this.wait);

        return true;
    }

    public delay(fn: () => void, wait: number = 1500) {
        setTimeout(() => {
            this.throttle(fn);
        }, wait);
    }

    public debounce(fn: () => void) {
        this.throttle(() => {
            setTimeout(() => {
                fn();
            }, this.wait);
        });
    }
}
