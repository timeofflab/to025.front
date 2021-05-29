import {AExt} from "@/classes/components/ext/a-ext";
import {PostcodeUtil} from "~/classes/view/postcode-util";
import {$v} from "~/classes/utils/var-util";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import $ from 'jquery';

export class ExtEditPostcode extends AExt {

    public get extEdit(): ExtEdit {
        return $v.p(this.vue, 'extEdit');
    }

    public async onInputPostCode(e: any) {

        const postCode = PostcodeUtil.filter(e.target.value);
        if (PostcodeUtil.isPostcode(postCode)) {
            const address = await PostcodeUtil.getAddressByPostcode(postCode);
            console.log('address is ', address);
            if (!$v.isEmpty(address)) {
                await this.extEdit.onInput({
                    name: 'address',
                    value: address,
                });

                $('#inputAddress').trigger('focus');
            }
        }

        await this.extEdit.onInput({
            name: 'postCode',
            value: postCode,
        });
    }
}
