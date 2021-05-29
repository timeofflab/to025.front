import {IMessageBag} from '@/classes/domain/lang/i-message-bag';
import {ILangBag} from '@/classes/domain/lang/i-lang-bag';

export class MessageRepository {

  private static _instance: MessageRepository;

  private _repository: IMessageBag[];
  private _lang: string = 'ja';

  private constructor() {
  }

  public static get i(): MessageRepository {
    if (!MessageRepository._instance) {
      MessageRepository._instance = new MessageRepository();
    }

    return MessageRepository._instance;
  }

  public _(key: string, def: string = '', lang: string = this._lang): string | null {
    const l = this.l(key, lang);
    return l ? l.message : def;
  }

  public l(key: string, lang: string = this._lang): ILangBag | null {
    const mb = this.message(key);
    return (!mb) ? null : mb.langs.find((_: ILangBag) => (_.lang == lang)) || null;
  }

  public message(key: string): IMessageBag | null {
    return this._repository.find((_: IMessageBag) => (_.key === key)) || null;
  }

  get repository(): IMessageBag[] {
    return this._repository;
  }

  set repository(value: IMessageBag[]) {
    this._repository = value;
  }

  public get lang(): string {
    return this._lang;
  }

  public set lang(value: string) {
    this._lang = value;
  }
}
