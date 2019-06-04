<template>
    <div>
        <a-form layout="horizontal" :form="form">
            <a-form-item 
            label="付款账户" 
            :labelCol="formItemLayout.labelCol" 
            :wrapperCol="formItemLayout.wrapperCol">
            {{step.payAccount}}         
            </a-form-item>
               <a-form-item 
            label="付款密码" 
            :labelCol="formItemLayout.labelCol" 
            :wrapperCol="formItemLayout.wrapperCol">
            <a-input v-decorator="['password',
            { 
                initialValue: step.password,
                rules:[{required: true,message: '请输入付款密码'}]
            }]"  
            type="password"               
            placeholder='请输入付款密码'>
            </a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="handleSubmit">提交</a-button>
                <a-button style="margin-left:8px;" @click="onPrev">上一步</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
export default {
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
    computed: {
        step: function() {
            /* 通过store.state来获取状态对象 */
            return this.$store.state.form.step
        }
    },
    methods: {
        handleSubmit() {
            /* 先从this中把需要的取出来，省略写很多字符串 */
            const { form, $store, step } = this;
            form.validateFields((err, values) => {
                if(!err) {
                    // /* 通过store.commit来 触发状态变更,还不需要dispatch(不需要提交一个异步的数据),只是存储到vuex的state字段中*/
                    // $store.commit({
                    //     type: "form/saveStepFormData",
                    //     padload: values
                    // });

                    /* Action通过store.dispatch方法来触发 */
                    $store.dispatch({
                        type: 'form/submitStepForm',
                        payload: { ...step, ...values } //也需要传入第一步的信息step
                    })
                    /* vuex已做跳转 */
                    // $router.push("/form/step-form/confirm")
                }
            })
              console.log(this.$store.state.form.step)
        },
        onPrev() {
            /* 跳转到第一步 */
            this.$router.push("/form/step-form/info")
        }
    }

}
</script>

<style></style>
