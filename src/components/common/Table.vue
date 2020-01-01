<template>
    <div>
        <table>
            <thead>
                <tr>
                    <td v-for="header in headers" :key="header.id">{{ header.value }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in datas" :key="data.index">
                    <td v-for="item in data" :key="item.index">{{ item.value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            header: [
                {
                    id: 1,
                    value: '标题1'
                },
                {
                    id: 2,
                    value: '标题2'
                },
                {
                    id: 3,
                    value: '标题3'
                }
            ],
            datas: [
                [
                    {
                        value: '标题1'
                    },
                    {
                        value: '标题2'
                    },
                    {
                        value: '标题3'
                    }
                ],
                [
                    {
                        value: '标题1'
                    },
                    {
                        value: '标题2'
                    },
                    {
                        value: '标题3'
                    }
                ],
                [
                    {
                        value: '标题1'
                    },
                    {
                        value: '标题2'
                    },
                    {
                        value: '标题3'
                    }
                ],
                [
                    {
                        value: '标题1'
                    },
                    {
                        value: '标题2'
                    },
                    {
                        value: '标题3'
                    }
                ]
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
</style>