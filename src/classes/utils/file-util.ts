export class FileUtil {
    public static detectExtension(filename: string): string {
        const seg = String(filename).split('.');
        return seg.length === 0 ? '???' : String(seg.last());
    }
}
