<script setup>
import {onMounted, ref} from "vue";
    import { useStore } from "vuex";
    import { toast } from "vue3-toastify";

    import YgoButton from "@/components/atom/YgoButton.vue";
    import { apiClient } from "@/common/index.js";
import Fighter from "@/pages/Candidate/Fighter/Fighter.vue";

    const store = useStore();

    const name = ref('');

    const fighterList = ref([]);

    const isActiveFocus = ref({
        nameActive: false,
    });

    const handleFocus = (target) => {
        isActiveFocus.value = {
            ...isActiveFocus.value,
            [target]: true,
        };
    }

    const handleBlur = (target) => {
        isActiveFocus.value = {
            ...isActiveFocus.value,
            [target]: false,
        };
    }

    const onRegister = async () => {
        const body = {
            userId : localStorage.getItem('userId'),
            name: name.value,
        };

        try {
            const response = await apiClient.post('/fighter/insert', body);

            if (response.status === 200) {
                toast.success('등록되었습니다.');
                await loadList();
            } else {
                console.log(response);
                toast.error('서버 오류가 발생하였습니다. 확인 후 다시 등록해주세요.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loadList = async () => {
        try {
            const response = await apiClient.get(`/fighter/list/${localStorage.getItem('userId')}`);

            if (response.status === 200) {
                fighterList.value = response.data;
            } else {
                console.log(response);
                toast.error('서버 오류가 발생하였습니다. 새로고침을 진행해주세요.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    onMounted(() => {
        loadList();
    })
</script>

<template>
    <div class="candidate-container">
        <div class="input-container">
            <div :class="isActiveFocus.nameActive ? `focus-wrapper wrapper` : `wrapper`">
                <label>닉네임</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        placeholder="닉네임을 입력하세요."
                        maxlength="50"
                        @focus="handleFocus(`nameActive`)"
                        @blur="handleBlur(`nameActive`)"
                        v-model="name"
                    />
                </div>
            </div>
            <div class="form-bottom">
                <div class="button-wrapper">
                    <YgoButton color="teal" :click-event="onRegister">등록</YgoButton>
                </div>
            </div>
        </div>
        <div class="list-container">
            <table>
                <colgroup>
                    <col width="*%" />
                    <col width="10%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>상태</th>
                        <th>수정</th>
                    </tr>
                </thead>
                <tbody>
                    <Fighter v-for="(item, index) in fighterList" :name="item.name" :status="item.status" :refresh="loadList" />
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
    .candidate-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 90vw;
        height: calc(100vh - 4rem);
        margin: 0 auto;

        .input-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            background: var(--bg-element2);

            padding-top: 1rem;
            padding-bottom: 1rem;

            .wrapper {
                width: 768px;
                margin-bottom: 1.5rem;

                label {
                    display: block;
                    margin-bottom: 1rem;
                    color: var(--text1);
                    line-height: 1.5;
                    font-weight: bold;
                    font-size: 1.125rem;
                    transition: all 0.125s ease-in 0s;
                }

                .input-wrapper {
                    display: flex;
                    justify-content: space-between;
                    -webkit-box-align: center;
                    align-items: center;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid var(--border2);

                    input {
                        display: block;
                        width: 100%;
                        background: transparent;
                        border: none;
                        outline: none;
                        color: var(--text2);
                        line-height: 1.5;
                        font-size: 1.5rem;
                        transition: all 0.125s ease-in 0s;
                    }

                    input:disabled {
                        color: var(--text3);
                    }
                }
            }

            .focus-wrapper {
                label {
                    color: var(--primary2);
                }

                .input-wrapper {
                    border-bottom: 1px solid var(--primary2);

                    input {
                        color: var(--primary2);
                    }
                }
            }

            .form-bottom {
                display: flex;
                flex-direction: row;
                justify-content: right;
                width: 768px;
                margin-top: 3rem;

                .button-wrapper {
                    button {
                        height: 3rem;
                        font-size: 1.5rem;
                        padding-left: 2rem;
                        padding-right: 2rem;
                        border-radius: 1.5rem;
                        word-break: keep-all;
                        transition: all 0.125s ease-in 0s;
                    }
                }
            }
        }

        .list-container {
            flex: 2;
            width: 100%;
            margin-top: 15px;

            table {
                width: 100%;
                text-align: center;

                background: var(--bg-element2);

                thead {
                    th {
                        vertical-align: bottom;
                        border-bottom: 1px solid var(--text1);
                        text-transform: uppercase;
                        font-size: 1.2rem;
                    }
                }

                tbody {
                    tr:nth-child(odd) {
                        background: var(--bg-element3);
                    }
                    tr:nth-child(even) {
                        background: var(--bg-element4);
                    }
                }
            }
        }
    }
</style>
