<template>
    <div>
        <a-form layout="horizontal" :form="form">
            <a-form-item 
            label="付款账户" 
            :labelCol="formItemLayout.labelCol" 
            :wrapperCol="formItemLayout.wrapperCol">
            <a-input v-decorator="['payAccount',
            {
                initialValue: step.payAccount,
                rules:[{required: true,message: '请输入付款账号'}]
            }]"                 
            placeholder='请输入付款账号'>
            </a-input>
            </a-form-item>

            <a-form-item 
            label="收款账户" 
            :labelCol="formItemLayout.labelCol" 
            :wrapperCol="formItemLayout.wrapperCol">
            <ReceiverAccount
            v-decorator="['receiveAccount',
            {
                initialValue: step.receiveAccount,
                rules:[
                {
                    required: true,
                    message: '请输入收款账号',
                    validator: (rule, value,callback) => {
                        if(value && value.number) {
                            callback()
                        }else {
                            callback(false)
                        }
                    }}]
            }]"                 
            placeholder='请输入收款账号'>
            </ReceiverAccount>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="handleSubmit">下一步</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import ReceiverAccount from "../../../components/ReceiverAccount"
export default {
    components: {
      ReceiverAccount
    },
    data() {
        /* create一个Form实例 */
        this.form = this.$form.createForm(this)
        return {
            formItemLayout: {
                labelCol: {span: 4},
                wrapperCol: {span: 14}
            },
        }
    },
    /* store的状态是响应式的，所以在组件中调用store中间的状态，仅需要在计算属性中返回即可 */
    computed: {
        step() {
            /* 通过store.state来获取状态对象 */
            return this.$store.state.form.step;
        }
    },
    methods: {
        handleSubmit() {
            /* 先从this中把需要的取出来，省略写很多字符串 */
            const { form, $router, $store } = this;
            form.validateFields((err, values) => {
                if(!err) {
                    /* 对象风格的提交方式，载荷是一个对象(可以包含多个字段并且记录的mutation会更易读) */
                    /* 通过store.commit来 触发状态变更,还不需要dispatch(不需要提交一个异步的数据),只是存储到vuex的state字段中*/
                    $store.commit({
                        type: "form/saveStepFormData",
                        payload: values
                    });
                    /* 跳转到第二步 */
                    $router.push("/form/step-form/confirm")
                }
            })
        }
    }

}
</script>

<style></style>
