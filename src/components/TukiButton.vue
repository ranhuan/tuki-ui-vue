<template>
    <label class="btw" color="blue">
        <span>
            <slot></slot>
        </span>
        <input name="Submit" type="submit" value="LOGIN" class="login_button" />
    </label>
</template>
<style scoped>
label {
    margin: 0.2em;
    vertical-align: middle;
    position: relative;
    font-size: 1em;
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: rgba(0, 0, 0, 0.75);
    background: #fff;
    padding: 0;
    border: 1px rgba(0, 0, 0, 0.25) solid;
    border-radius: 0.25em;
    text-transform: capitalize;
    text-decoration: none;
    text-shadow: none;
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    height: 3em;
}

label[color="blue"] {
    background-color: #1e90ff;
    color: #fff;
    border-color: rgba(0, 0, 0, 0.1);
}

label>span {
    line-height: 3;
    padding: 0.5em 2.5em;
    text-align: center;
}

label>input {
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: 0 0;
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
</style>
