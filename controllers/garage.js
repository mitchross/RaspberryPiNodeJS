var exec = require('child_process').exec, child;

exports.startGarageDoorLoop = function()
{
   openOrCloseDoor( 'gpio write 7 0' );

   setTimeout(function(){
       openOrCloseDoor('gpio write 7 1');
     }, 1000);
}

function openOrCloseDoor( gpioCommandIn )
{

  child = exec( gpioCommandIn,
      function (error, stdout, stderr) {
        if(stdout!==''){
          console.log('---------stdout: ---------\n' + stdout);
        }
        if(stderr!==''){
          console.log('---------stderr: ---------\n' + stderr);
        }
        if (error !== null) {
          console.log('---------exec error: ---------\n[' + error+']');
        }
      });

}