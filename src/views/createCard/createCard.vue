<template>
    <div class="wrap">
        <div class="up">
            <div class="createcard">创建个人名片</div>
            <ul class="up-ul">

                <li class="mobile">
                    <div class="input-c">
                        <input type="text" v-model='name' placeholder="请输入姓名">
                        <!-- <input id='codebtn' :disabled="disabled" type="button"  :value="value" @click="getCode"> -->
                    </div>
                </li>
                <li class="code">
                    <div class="input-c">
                        <input type="text" v-model='mobileNumber' placeholder="请输入手机号">
                    </div>
                </li>
                <li class="code">
                    <div class="input-c">
                        <input type="text" v-model='companyName' placeholder="请输入公司名字">
                    </div>
                </li>
                <li class="code">
                    <div class="input-c">
                        <input type="text" v-model='job' placeholder="请输入公司职位">
                    </div>
                </li>
                <li class="code">
                    <div class="input-c">
                        <input type="text" v-model='email' placeholder="请输入邮箱地址">
                    </div>
                </li>
                <li class="code">
                    <div class="input-c">
                        <input type="text" v-model='briefIntroduction' placeholder="请输入个人简介">
                    </div>
                </li>

            </ul>
        </div>
        <div class="down">
            <div class="suced-reg-login" @click.enter="createCard">
                <div class="sced">
                    创建
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import {Toast} from 'mint-ui'
    export default {
        mounted: function () {
            // this.$store.commit('BANNER', '这是banner');
        },
        data () {
            return {
                name: '',
                mobileNumber: '',
                companyName:'',
                job:'',
                email:'',
                briefIntroduction:''
            }
        },
        computed: mapState([

        ]),
        methods:{
            isValidPhone(phone){
                if( phone == '' ){
                    return false;
                }
                phone = parseInt(phone)
                var mbReg = /^1[3,4,5,7,8][0-9]{9}$/;
                return mbReg.test(phone) ? true : false;
            },
            createCard(){
                var resu = this.isValidPhone(this.mobileNumber);;
                console.log(this.mobileNumber);
                console.log(resu);
                if(!this.isValidPhone(this.mobileNumber)){
                    Toast({
                        position: "middle",
                        message: '请输入正确的手机号',
                        duration: 800
                    });
                    return;
                }
                if(this.name == ''){
                    Toast({
                        position: "middle",
                        message: '请输入名字',
                        duration: 800
                    });
                    return;
                }
                if(this.companyName == ''){
                    Toast({
                        position: "middle",
                        message: '请输入公司',
                        duration: 800
                    });
                    return;
                }
                if(this.job == ''){
                    Toast({
                        position: "middle",
                        message: '请输入职位',
                        duration: 800
                    });
                    return;
                }
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if(!reg.test(this.email)){
                    Toast({
                        position: "middle",
                        message: '请输入正确的邮箱',
                        duration: 800
                    });
                    return;
                }
                if(this.email == ''){
                    Toast({
                        position: "middle",
                        message: '请输入邮箱',
                        duration: 800
                    });
                    return;
                }
                if(this.briefIntroduction == ''){
                    Toast({
                        position: "middle",
                        message: '请输入简介',
                        duration: 800
                    });
                    return;
                }
//                let dappAddress = dappAddress;
                let nebPay = new NebPay();
                let callFunction = "save";
                let callArgs = [this.name,{
                    "name":this.name,
                    "mobile":this.mobileNumber,
                    "companyName":this.companyName,
                    "job":this.job,
                    "email":this.email,
                    "briefIntroduction":this.briefIntroduction

                }];
                nebPay.call(dappAddress, "0", callFunction, JSON.stringify(callArgs), {
                callback: this.cbCallDapp
                });

            },
            cbCallDapp(resp){
                console.log('**** 一下返回信息getCard');
                var res = JSON.parse(resp.result);

                console.log(res);
            }
        }
        // ,
        // components: {}
    }
</script>
<style lang="scss" rel="stylesheet/scss"  scoped>
    .wrap{
        /*padding-top: 3rem;*/
        /*background: #303d52;*/
    .up{
    .createcard{
        color: #fff;
        text-align: center;
        font-size: 35px;
        padding-top: 15px;
    }
    .up-ul{
        list-style:none;
        margin: 0;
        padding: 0;

        padding-top: 30px;
    // border: 1px solid red;

    li{
        display: flex;
    // align-items: center;
    // padding-left: 20px;
    // border-bottom: 1px solid green;
    .wr-img{
    // border: 1px solid red;
    // box-sizing:border-box;
        padding-top:15px;
    img{
        width: 1rem;
        height: 1rem;
    // border: 1px solid red;
    }
    }
    .input-c{
    // border: 1px solid green;
        width: 10rem;
    // margin-left: 10px;
        display: flex;
        justify-content: center;

    input{
        margin: 0 ;
        padding-left: .2rem ;
        width: 7rem;
        height: .5rem;
        line-height: .5rem;
        border-radius: 5px;
        font-size: .2rem;
    // outline:none;
        margin-bottom: .1rem;
        /*border: 1px solid red;*/
        /*background: #faffbd;*/

    }
    input[type='button']{
        width: 2rem;
        height: 1rem;
        margin-left: 22px;
        font-size: 10px;
        border-radius: 6px;
        background: #fe6498;
        border: none;
        color: #fff;
    }
    input:disabled{
        color: #f4f4f4;
        background: gray;
        opacity: .5;
    }

    }
    }
    }
    }
    .down{
        /*margin-top: 1rem;*/

    .suced-reg-login{
        width: 3rem;
        margin:0 auto;
        background: #4ba4fb;
        border-radius: 6px;
        border: 1px solid #86dc67;
    .sced{
        height: .4rem;
        line-height: .5rem;
        color: #e7e9ef;
        font-size:26px;
        font-weight: bold;
        text-align: center;
    }
    }

    }
    }
    // input placeholder 样式
       ::-webkit-input-placeholder { /* WebKit browsers */
           color: #cccccc;
       }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #cccccc;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #cccccc;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #cccccc;
    }
</style>