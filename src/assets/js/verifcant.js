import { Notify } from "vant";
import Vue from "vue";
Vue.use(Notify)
class ValidForm{
    valid(o){
        for(var key in o){
            if(!o[key].reg.test(o[key].value)){
                Notify({
                    type:'warning',
                    message:o[key].erroMsg
                });
                return false
            }
        }
        return true
    }
}

export const validForm = new ValidForm();