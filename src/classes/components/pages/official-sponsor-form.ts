import {IsEmail, IsNotEmpty, IsOptional, IsUrl, MaxLength} from "class-validator";
import {vo} from "~/classes/app/validator/validator-helper";
import {IsTel} from "~/classes/validate/is-tel";

export class OfficialSponsorForm {

    public _csrf: string;
    public captcha: string;

    @MaxLength(100, vo('maxLength', {max: 100}))
    @IsNotEmpty(vo('req'))
    public companyName: string;

    @MaxLength(100, vo('maxLength', {max: 100}))
    @IsNotEmpty(vo('req'))
    public contactName: string;

    @MaxLength(100, vo('maxLength', {max: 100}))
    @IsEmail({}, vo('isEmail'))
    @IsNotEmpty(vo('req'))
    public email: string;

    // お申込内容
    @MaxLength(100, vo('maxLength', {max: 100}))
    @IsNotEmpty(vo('reqSelect'))
    public adPlan: string;

    @IsOptional()
    public adPlanA: string;
    @IsOptional()
    public adPlanB: string;
    @IsOptional()
    public adPlanC: string;

    // 契約期間
    @IsNotEmpty(vo('req'))
    public period: number;

    // コメント
    @MaxLength(1000, vo('maxLength', {max: 300}))
    @IsOptional()
    public comment: string;

    // 社名・屋号
    @MaxLength(22, vo('maxLength', {max: 22}))
    @IsNotEmpty(vo('req'))
    public adProductName: string;

    // リンクまたはお問合せ先
    @IsOptional()
    public adLogoFile: string;

    // 社名・屋号
    @MaxLength(30, vo('maxLength', {max: 30}))
    @IsNotEmpty(vo('req'))
    public adMessage: string;

    // リンクまたはお問合せ先
    @MaxLength(30, vo('maxLength', {max: 30}))
    @IsNotEmpty(vo('req'))
    public adContactType: string;

    // リンク先｜URL
    @MaxLength(200, vo('maxLength', {max: 200}))
    @IsUrl()
    @IsNotEmpty(vo('req'))
    public adContactUrl: string;

    // リンク先｜TEL
    @MaxLength(20, vo('maxLength', {max: 20}))
    @IsTel(vo('isTel'))
    @IsNotEmpty(vo('req'))
    public adContactTel: string;

    // リンク先｜Email
    @MaxLength(50, vo('maxLength', {max: 50}))
    @IsEmail({}, vo('isEmail'))
    @IsNotEmpty(vo('req'))
    public adContactEmail: string;

    // 広告ポリシー同意
    @IsNotEmpty(vo('accept'))
    public adPolicyAccept: string;

    // 利用規約同意
    @IsNotEmpty(vo('accept'))
    public termsAccept: string;

    // プライバシーポリシー同意
    @IsNotEmpty(vo('accept'))
    public privacyPolicyAccept: string;
}
