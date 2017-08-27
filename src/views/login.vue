<template>
    <div data-v-41e4f2c7="" class="modal sign-in">
        <!---->
        <div data-v-41e4f2c7="" class="modal-content">
            <div data-v-41e4f2c7="" class="modal-header">
                <!---->
                <h3 data-v-41e4f2c7="">登录简书</h3>
                <a data-v-41e4f2c7="" class="close-btn" @click='close'>
                    <i data-v-41e4f2c7="" class="iconfont ic-close"></i>
                </a>
            </div>
            <div data-v-41e4f2c7="" class="modal-body">
                <form data-v-41e4f2c7="">
                    <div data-v-41e4f2c7="" class="input-prepend">
                        <i data-v-41e4f2c7="" class="iconfont ic-user"></i> <input v-model="sign_in_id" data-v-41e4f2c7="" type="text" placeholder="手机或邮箱"></div>
                    <div data-v-41e4f2c7="" class="input-prepend">
                        <i data-v-41e4f2c7="" class="iconfont ic-password"></i> <input v-model='password' data-v-41e4f2c7="" type="password" placeholder="密码"></div>
                    <div data-v-41e4f2c7="" class="input-prepend last">
                        <i data-v-41e4f2c7="" class="iconfont ic-verify"></i> <input v-model='captcha_code' data-v-41e4f2c7="" type="image_captchas" placeholder="请输入图片中的文字">
                        <div data-v-41e4f2c7="" @click='refresh_verify' class="captcha" :style="{'backgroundImage': 'url('+ verifyImage  +')'}"></div>
                    </div>
                    <a data-v-41e4f2c7="" @click='login'>登录</a>
                </form>
                <div data-v-41e4f2c7="" class="more-sign">
                    <h6 data-v-41e4f2c7="">社交帐号直接登录</h6>
                    <ul data-v-41e4f2c7="">
                        <!---->
                        <li data-v-41e4f2c7="">
                            <a data-v-41e4f2c7="" href="http://www.jianshu.com/users/auth/qq_connect" class="qq">
                                <i data-v-41e4f2c7="" class="iconfont ic-qq_connect"></i>
                            </a>
                        </li>
                        <li data-v-41e4f2c7="">
                            <a data-v-41e4f2c7="" href="http://www.jianshu.com/users/auth/weibo" class="weibo">
                                <i data-v-41e4f2c7="" class="iconfont ic-weibo"></i>
                            </a>
                        </li>
                        <li data-v-41e4f2c7="">
                            <a data-v-41e4f2c7="" href="http://www.jianshu.com/users/auth/douban" class="douban">
                                <i data-v-41e4f2c7="" class="iconfont ic-douban"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'api/axios'

export default {
    data() {
        return {
            verifyImage: '',
            sign_in_id: '',
            password: '',
            captcha_id: '',
            captcha_code: ''
        }
    },
    mounted() {
        this.refresh_verify()
    },
    methods: {
        refresh_verify() {
            var me = this
            this.$http.get('/mobile/captchas/image')
                .then(x => {
                    this.verifyImage = x.data.image
                    this.captcha_id = x.data.id
                })
        },
        close() {
            this.$router.push('/')
        },
        login() {
            axios.post('mobile/sessions', {
                captcha_id: this.captcha_id,
                password: this.password,
                captcha: {
                    code: this.captcha_code,
                    id: this.captcha_code
                }
            })
        }
    }
}
</script>

<style>

</style>
