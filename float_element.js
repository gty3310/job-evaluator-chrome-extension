let html = `<div >
<style>
    @import url('https://fonts.googleapis.com/css?family=Raleway');
</style>
<div style="
    background-color: lightblue; 
        top: '10%';
        left: '50%';

        box-sizing: border-box;
        opacity: 0.5;

        outline: 0;
        position: fixed;
        right: 20px;
        bottom: 90px;
        display: block;

        width: 95px;
        height: 120px;

        border: 0;
        padding: 15px;
        border-radius: 25px;

        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 32px rgba(0, 0, 0, 0.16);
        transition: box-shadow 200ms ease;
        cursor: pointer;
        align-items: center;
        text-align: center;

        z-index: 9000;
" >
    <div id="score">
        <div style="
        font-family: 'Raleway', sans-serif !important;
            display: block;
            font-size: 17px;
            margin-top: 14px;
            margin-bottom: 14px;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
        ">
            60%
        </div>
        <div style="
        font-family: 'Raleway', sans-serif !important;
        
            display: block;
            font-size: 12px;
            margin-top: 12px;
            margin-bottom: 12px;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
        ">
            Keywords Matching
        </div>
    </div> 
</div> 
</div>`

var div = document.createElement( 'div' );

div.innerHTML = html;
document.body.appendChild( div );



