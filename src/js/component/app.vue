<template>
    <div class="body-container">
            <h4 class="text-center title">Bilibili 清洁者</h4>
            <div class="input-container">
                <input placeholder="用户名称" class="name-input" @keyup.enter="submit" v-model="newUpName"/>
                <div class="submit-container"  @click="submit">
                    <span class="submit-label">添加</span>
                </div>
            </div>
            <div class="table-container">
                <table class="table table-striped">
                <thead>
                    <tr>
                    <th>名称</th>
                    <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list">
                        <td class="table-name">{{ item }}</td>
                        <td><a @click="remove($index)" href="#" class="delete">删除</a></td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div class="feedback text-center">寒枫：c360785655@gmail.com</div>
    </div>
</template>

<script>
    import '../../css/bootstrap.min.css'

    export default {
        data() {
            return {
                newUpName: '',
                list: []
            }
        },

        created: function() {
            //加载
            let list = this.list;
            chrome.storage.sync.get('list', function(items) {
                for (let item of items.list) {
                    list.push(item);
                }
            });
        },

        methods: {
            //添加屏蔽列表项
            submit: function() {
                this.newUpName = this.newUpName.trim();
                if (this.newUpName == '')
                    return;
                //去重
                let isExisted = false;
                for (let item of this.list) {
                    if (item == this.newUpName)
                        isExisted = true;
                }
                if (!isExisted) {
                    this.list.push(this.newUpName);
                    this.newUpName = '';
                    this.saveChanges(this.list);
                }
            },
            //保存修改，类型为可同步类型
            saveChanges: function(list) {
                // 使用 Chrome 扩展程序的存储 API 保存它。
                chrome.storage.sync.set({
                    'list': list
                }, function() {
                    console.log('设置已保存');
                });
                //调用全局的clean函数，进行清理
                clean();
            },
            //移除屏蔽列表项
            remove: function(index) {
                this.list.splice(index, 1);
                console.log('delete');
                this.saveChanges(this.list);
            }
        }
    }
</script>

<style lang="sass" scoped>
    body,
    button,
    input,
    select,
    textarea,
    h1,
    h2,
    h3,
    span,
    h4,
    h5,
    h6 {
        font-family: Microsoft YaHei, '宋体', Tahoma, Helvetica, Arial, "\5b8b\4f53", sans-serif;
    }
    
    .body-container {
        width: 300px;
        min-height: 500px;
        .text-center {
            text-align: center;
        }
        .title {
            padding-top: 20px;
            padding-bottom: 20px;
            margin: 0;
            background: #3498db;
            font-weight: bold;
            color: white;
        }
        .input-container {
            margin-top: 10px;
            .name-input {
                width: 150px;
                margin-left: 55px;
                height: 25px;
            }
            .submit-container {
                cursor: pointer;
                width: 40px;
                height: 25px;
                display: inline-block;
                background: #3498db;
                overflow: hidden;
                position: absolute;
                .submit-label {
                    line-height: 25px;
                    height: 25px;
                    font-size: 11px;
                    padding: 5px;
                    color: white;
                    background: #3498db;
                }
            }
        }
        .table-container {
            margin-top: 10px;
            .table-name {
                max-width: 250px;
            }
        }
        .feedback {
            color: #CCCCCC;
            margin: 10px;
            font-size: 12px;
        }
    }
</style>