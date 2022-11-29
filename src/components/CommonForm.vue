<template>
    <el-form ref="form" label-width="100px" :model="form" :inline="inline" labelPosition='right'>
        <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
            <el-input
                style="width:210px"
                v-if="item.type==='input'"
                :placeholder="'请输入'+item.label"
                v-model="form[item.model]"
                :oninput="item.rule"
                :disabled="item.disabled"
            ></el-input>
            <el-switch
                v-if="item.type==='switch'"
                v-model="form[item.model]"
            ></el-switch>
            <el-date-picker
                style="width:210px"
                v-if="item.type==='date'"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="form[item.model]"
            ></el-date-picker>
            <el-select
                style="width:210px"
                v-if="item.type==='select'"
                placeholder="请选择"
                v-model="form[item.model]"
                :disabled="item.disabled"
            >
                <el-option
                    style="width:210px"
                    v-for="item in item.opts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-cascader
                style="width:210px"
                v-if="item.type==='area'"
                :options="options"
                v-model="form[item.model]"
                >
    </el-cascader>
        </el-form-item>
        <el-form-item><slot></slot></el-form-item>
    </el-form>
</template>

<script>
import { regionData } from 'element-china-area-data'
    export default{
        name:'CommonForm',
        props:{
            formLabel: Array,
            form: Object,
            inline: Boolean,
        },
        data(){
            return{
                options: regionData,
            }
        },
        methods: {
        }
    }
</script>