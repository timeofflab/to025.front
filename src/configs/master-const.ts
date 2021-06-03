import {To000Version} from "~/configs/version";
import {EnvUtil} from "~/classes/utils/env-util";

export enum OfficialBlogArticleType {
    Article = 'article',
    Whisper = 'whisper',
}

export enum Stability {
    // 正常
    Stable = 0,
    // サーバーエラー
    ServerError = 10,
    // サーバー不安定
    ServerUnstable = 11,
    // 通信エラー
    ConnectError = 20,
    // 通信不安定
    ConnectUnstable = 21,
    // Authentication
    Session = 401,
}

export enum AppMode {
    Production = 'production',
    Develop = 'develop',
}

export enum AppType {
    Wait = 'wait',
    Official = 'official',
    Mail = 'mail',
}

// sync:API - CSRFTokenのタイプ
export enum CSRFType {
    PostLogin = '1100',
    PostPasswordReset = '1101',
    PostContact = '3000',
    PostSponsor = '3001',
    PostShipping = '3002',
}

export enum DeviceState {
    NoLogin = 'noLogin', // 未ログイン
    Ready = 'ready',    // ログイン｜待機
    Ticket = 'ticket'   // ログイン｜発券中
}

export enum PasswordStrength {
    Weak = 'weak',
    Normal = 'normal',
    Strong = 'strong',
}

export enum AuthType {
    Owner = 'owner',
}

export enum EditMode {
    Add = 0,
    Edit = 1,
}

export enum Locale {
    Ja = 'ja',
    En = 'en',
}

export enum SignupPhase {
    Id = 'id',
    Password = 'password',
    Work = 'work',
    Info = 'info',
    Thanks = 'thanks',
}

export enum DateFormat {
    FullTz = '',
    Full = 'YYYY-MM-DD HH:mm:ss',
    D = 'YYYY-MM-DD',
    DTJp = 'YYYY年MM月DD日 HH時mm分',
    DJpTn = 'YYYY年MM月DD日 HH:mm',
}

export const MasterConst = {
    App: {
        Version: To000Version.Version,
        Build: To000Version.Build,
        Mode: [
            AppMode.Production,
            AppMode.Develop,
        ] as AppMode[],
        LangDefault: Locale.Ja,
        Lang: [
            Locale.Ja,
            // Locale.En,
        ],
        // 言語システム対象外URL
        NoLangPath: [
            /^\/error/,
            /^\/joint/,
            /^\/ex/,
        ],
        // 開発URL
        DevelopPath: [
            /^\/dev/,
        ],
        Domain: {
            Official: [
                'paradeartist.com',
                'www.paradeartist.com',
            ],
        },
    },
    To025: {
        App: {
            Auth: {
                UserAuthToken: 'X-To025-Auth-Token',
                AdminAuthToken: 'X-To006-Auth-Token',
            },
            FilePurpose: {
                PresentationProjectPageImg: 10,
            },
        },
    },
    Connection: {
        Error: 900,
    },
    Date: {
        FULL: 'YYYY-MM-DD HH:mm:ss',
        DTJ: 'YYYY年MM月DD HH:mm:ss',
        Y4MDJHM: 'YYYY年MM月DD日 HH:mm',
        HM: 'HH:mm',
    },
    Times: [
        0, 5, 10, 15, 20, 30, 45, 60,
    ],
    WorkTypes: [
        'hospital',
        'pharmacy',
        'eat',
        'beauty',
        'other',
    ],
    Device: {
        State: {
            NoLogin: DeviceState.NoLogin,
            Ready: DeviceState.Ready,
            Ticket: DeviceState.Ticket,
        },
    },
    Ticket: {
        No: 30,
        NewIntervalSec: 180, // 新規チケットの表示時間(Sec)
    },
    Form: {
        FormErrors: [
            '_system',
            '_csrf',
            'captcha'
        ],
        Basic: {
            Password: {
                Rule: /[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]/,
                CharType: 6,
                Max: 100,
                Min: 12,
            },
        }
    },
    My: {
        // my/の処理タイマー(ms)
        IndexTimer: 5000,
        // デバイス画面タイマー
        DeviceTimer: 2000,
        // ユーザー画面のタイマー
        UserTimer: 3000,
    },
    Service: {
        Signup: {
            Phases: [
                SignupPhase.Id,
                SignupPhase.Password,
                SignupPhase.Work,
                SignupPhase.Info,
                SignupPhase.Thanks,
            ],
        },
    },
    Auth: {
        LocalStorageKey: 'appAuth',
        KeepaliveTimer: 60,
        KeepaliveInterval: 60,
        KeepaliveLimit: 60,
    },
    Cmd: {
        Popup: {
            TicketEdit: {
                Submit: 'popup.ticketEdit.submit',
            },
            TicketMemoEdit: {
                Submit: 'popup.ticketMemoEdit.submit',
            },
        },
    },
    Blog: {},
};

