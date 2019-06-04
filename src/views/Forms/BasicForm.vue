<template>
  <div>
    <a-form :layout="formLayout" :form="form">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">
            Horizontal
          </a-radio-button>
          <a-radio-button value="vertical">
            Vertical
          </a-radio-button>
          <a-radio-button value="inline">
            Inline
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-decorator="[
          'fieldA', 
          {
            initialValue: fieldA, 
            rules: [{required: true, min: 6, message: '必须大于五个字符'}]
          }
        ]" 
        placeholder="input placeholder" />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item
        :wrapper-col="buttonItemLayout.wrapperCol"
      >
        <a-button type="primary" @click="handleSubmit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data () {
    //组件底层，数据改变时，调用这个this,直接去更新当前这个组件，相当于this.$forceUpdate()
    this.form = this.$form.createForm(this);
    return {
      formLayout: 'horizontal',
      fieldA: 'hello',
      fieldB: '',
    };
  },
//   watch: {
//     fieldA: function(val) {
//       if(val.length <= 5) {
//         this.fieldStatus = "error";
//         this.fieldHelp = "必须大于五个字符"
//       } else {
//         this.fieldStatus = "";
//         this.fieldHelp = "";
//       }
//     }
//   },
  computed: {
    formItemLayout () {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      } : {};
    },
    buttonItemLayout () {
      const { formLayout } = this;
      return formLayout === 'horizontal' ? {
        wrapperCol: { span: 14, offset: 4 },
      } : {};
    },
  },
  mounted() {
    setTimeout(() => {
      this.form.setFieldsValue({fieldA: 'hello world'})
    }, 3000)
  },
  methods: {
    handleFormLayoutChange  (e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      //两个参数，一个是报错，一个值表单对应的值
      this.form.validateFields((err, value) => {
        //如果没有报错
        if(!err) {
          console.log(value);
        //   this.fieldA = value.fieldA;
          //如果想把form的值，同步更新组件，可以使用如下方法：往this上面赋值
          Object.assign(this, values)
        }
      })
//       if(this.fieldA.length <= 5) {
//     　　　this.fieldStatus = "error";
//     　　　this.fieldHelp = "必须大于五个字符"
//       } else {
//     　　　console.log({
// 　　　　　　fieldA: this.fieldA,
// 　　　　　　fieldB: this.fieldB
//     　　　})
//       }
    }
  },
};
</script>