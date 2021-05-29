import {ILangBag} from '@/classes/domain/lang/i-lang-bag';

export interface IMessageBag {
  key: string;
  langs: ILangBag[];
};
