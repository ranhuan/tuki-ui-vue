<template>
    <div class="calendar_wrp">
        <span>{{ label }}</span>
        <input type="text" readonly value="2023/09/01 - 2023/09/30">
        <section></section>
    </div>
</template>
<script setup lang="ts">
defineProps(['label'])
</script>
<style scoped>
.calendar_wrp{display:flex;align-items:center;position:relative;background:#fff;border:1px rgba(0,0,0,.25) solid;border-radius:.25em;}
.calendar_wrp>span{padding:0 1em;line-height:1.5;border-right:1px rgba(0,0,0,.1) solid;color:rgba(0,0,0,.5);white-space:nowrap;}
.calendar_wrp>input{background:none;border:none;border-radius:0;width:100%;min-width:15em;height:3em;margin:-1px 0;padding:0;text-align:center;outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;flex:auto;}
.calendar_wrp>input.full{min-width:24em;}
.calendar_wrp>input.date-time{min-width:13em;}
.calendar_wrp>input.date-only{min-width:10em;}
.calendar_wrp.dropdown_right .calendar{left:inherit;right:0;}
.calendar_wrp .calendar{display:flex;position:absolute;top:100%;left:0;z-index:100;margin:.5em -1px;background:#fff;border:1px rgba(0,0,0,.25) solid;border-radius:.25em;box-shadow:rgba(0,0,0,.1) 0 0 2em;}
.calendar_wrp .calendar .part{padding:1.5em;flex:1;position:relative;display:flex;flex-direction:column;}
.calendar_wrp .calendar .part~.part{box-shadow:inset rgba(0,0,0,.1) 1px 0 0;}
.calendar_wrp .calendar .part~.part:before{content:"arrow_forward";display:block;font-size:1.5em;width:2em;height:2em;line-height:2;position:absolute;left:0;top:0;margin:1em -1em;text-align:center;background:#fff;color:rgba(0,0,0,.5);}
.calendar_wrp .calendar .year_month{display:flex;align-items:center;justify-content:center;margin:0 -.5em;}
.calendar_wrp .calendar .year_month>*{margin:0 .5em;flex:auto;}
.calendar_wrp .calendar .year_month .select_wrp select{min-width:inherit;width:100%;}
.calendar_wrp .calendar .daylist{display:flex;flex-wrap:wrap;margin:1.5em auto 0;width:21em;flex:auto;align-content:flex-start;}
.calendar_wrp .calendar .daylist.head{opacity:.25;font-style:italic;flex:0 0 1.5em;}
.calendar_wrp .calendar .daylist li{width:14.286%;text-align:center;}
.calendar_wrp .calendar .daylist a{display:block;color:currentColor;height:3em;line-height:3;border-radius:2em;transition:.3s;}
.calendar_wrp .calendar .daylist li.current a{color:#fff;background:dodgerblue;}
.calendar_wrp .calendar .daylist a:hover,
.calendar_wrp .calendar .daylist li.current a:hover{background:rgba(0,0,0,.25);}
.calendar_wrp .calendar .time{display:flex;align-items:center;justify-content:flex-end;margin:1em -.5em 0;}
.calendar_wrp .calendar .time>*{margin:0 .5em;flex:1;}
.calendar_wrp .calendar .time .select_wrp select{min-width:inherit;width:100%;}
.calendar_wrp .calendar .time .text_wrp input{min-width:inherit;width:100%;}
</style>
