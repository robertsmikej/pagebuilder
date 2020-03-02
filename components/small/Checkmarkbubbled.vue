<template>
    <div class='checkmark'>
        <div class="checkmark__inner"></div>
    </div>
</template>

<script>
export default {
    props: {
        datas: Object,
        theme: Object
    }
}
</script>

<style>
:root {
    --check-circle-color: green;
    --check-check-color: #00aeef;
    --check-hollow-color: #FFF;
}
.checkmark {
    position: relative;
    margin: 16px 6px;
    width: 40px;
    height: 40px;
    background: var(--check-circle-color);
    border-radius: 50%;
}
.checkmark::before {
    content: "";
    width: 80%;
    height: 12%;
    position: absolute;
    top: 20%;
    left: 52%;
    background: var(--check-check-color);
    transform: rotate(-45deg);
    z-index: 1;
}
.checkmark::after {
    content: "";
    width: 30%;
    height: 12%;
    position: absolute;
    top: 40%;
    left: 44%;
    background: var(--check-check-color);
    transform: rotate(45deg);
    z-index: 1;
}
.checkmark__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.checkmark__inner::before {
    content: "";
    width: 94%;
    height: 30%;
    position: absolute;
    top: 16%;
    left: 42%;
    background: var(--check-hollow-color);
    transform: rotate(-45deg);
}
.checkmark__inner::after {
    content: "";
    width: 46%;
    height: 30%;
    position: absolute;
    top: 30%;
    left: 34%;
    background: var(--check-hollow-color);
    border-radius: 20% 50% 5% 30%;
    transform: rotate(45deg);
}

</style>