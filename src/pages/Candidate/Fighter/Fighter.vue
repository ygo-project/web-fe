<script setup>
import { toast } from "vue3-toastify";

import { apiClient } from "@/common/index.js";

const props = defineProps({
    name: String,
    status: String,
    user: String,
    refresh: Function,
});

const editFighterStatus = async (status) => {
    if (status === 'D') {
        if (!confirm('정말 삭제하시겠습니까?')) {
            return;
        }
    }

    const body = {
        userId: localStorage.getItem('userId'),
        name: props.name,
        status: status,
    };

    try {
        const response = await apiClient.patch('/fighter/update', body);

        if (response.status === 200) {
            toast.success('수정되었습니다.');
            await props.refresh();
        } else {
            console.log(response);
            toast.error('서버 오류가 발생하였습니다. 확인 후 다시 진행해주세요.');
        }
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <tr>
        <td>{{ name }}</td>
        <td>{{ status === 'A' ? '정상' : '정지' }}</td>
        <td>
            <button v-if="status === 'A'" class="btn red" @click="editFighterStatus('D')" >삭제</button>
            <button v-else class="btn teal" @click="editFighterStatus('A')" >복구</button>
        </td>
    </tr>
</template>

<style scoped>
    .btn {
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        height: 2rem;
        padding: 0 1.25rem;

        outline: none;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: bold;

        &.red {
            background: var(--destructive1);
            color: var(--button-text);

            &:hover {
                background: var(--destructive2);
                cursor: pointer;
            }
        }

        &.teal {
            background: var(--primary1);
            color: var(--button-text);

            &:hover {
                background: var(--primary2);
                cursor: pointer;
            }
        }
    }
</style>
