 //   Info:
 //   buildRequest( Param ,Zonename(optional) ,Source(optional) );
 //   buildRequest( arrayOptParamA ,arrayOptParamB(optional) ,arrayOptParamC(optional) );

//Example POST request: http://192.168.0.98:10025/

var net = require('net');     //  Moved to default, but kept in here for when used ass single script

var HOST = '192.168.0.98';
var PORT = 10025;                                 
                                                                                                                                
//Options parameter A (Basic)                //Options parameter B (ZoneName)     /Options parameter C (Source)               
arrayOptParamA = [];                         arrayOptParamB = [];                 arrayOptParamC = [];                
arrayOptParamA[0]  = 'source-selection';     arrayOptParamB[0] = 'Main Zone';     arrayOptParamC[0]  = 'AUX'         ;
arrayOptParamA[1]  = 'power-off'       ;     arrayOptParamB[1] = 'Zone2'    ;     arrayOptParamC[1]  = 'TV'          ;
arrayOptParamA[2]  = 'power-on'        ;                                          arrayOptParamC[2]  = 'Cable Sat'   ;
arrayOptParamA[3]  = 'mute-toggle'     ;                                          arrayOptParamC[3]  = 'STB'         ;
arrayOptParamA[4]  = 'mute-on'         ;                                          arrayOptParamC[4]  = 'Radio'       ;
arrayOptParamA[5]  = 'mute-off'        ;                                          arrayOptParamC[5]  = 'Game'        ;
arrayOptParamA[6]  = 'volume-down'     ;                                          arrayOptParamC[6]  = 'USB'         ;
arrayOptParamA[7]  = 'volume-up'       ;                                          arrayOptParamC[7]  = 'Disc'        ; 
arrayOptParamA[8]  = 'ok'              ;                                          arrayOptParamC[8]  = 'Media Server'; 
arrayOptParamA[9]  = 'home'            ;                                          arrayOptParamC[9]  = 'Home Network'; 
arrayOptParamA[10] = 'options'         ;                                          arrayOptParamC[10] = 'AM'          ; 
arrayOptParamA[11] = 'down'            ;                                          arrayOptParamC[11] = 'FM'          ; 
arrayOptParamA[12] = 'up'              ;                                          arrayOptParamC[12] = 'vTuner'      ; 
arrayOptParamA[13] = 'left'            ;                                          arrayOptParamC[13] = 'Bluetooth'   ; 
arrayOptParamA[14] = 'right'           ;                                          //arrayOptParamC[14] = 'iPod'        ;                                      
arrayOptParamA[15] = 'back'            ;                                          //arrayOptParamC[15] = 'Spotify'     ;                                      
arrayOptParamA[16] = 'forward'         ;                                                                               
arrayOptParamA[17] = 'pause'           ;                                                                               
arrayOptParamA[18] = 'play'            ;                                                                               
arrayOptParamA[19] = 'next'            ;                                                                               
arrayOptParamA[20] = 'previous'        ;                                                                               
arrayOptParamA[21] = 'sleep'           ;                                                                               
arrayOptParamA[22] = 'delay'           ;                                                                               
arrayOptParamA[23] = 'channel-up'      ;                                                                               
arrayOptParamA[24] = 'channel-down'    ;                                                                               
arrayOptParamA[25] = 'tuner-up'        ;                                                                               
arrayOptParamA[26] = 'tuner-down'      ;                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

function buildRequest(cmd, zone, param) {
     var text = '';
     var payload = '<?xml version="1.0" encoding="UTF-8"?> <harman> <avr> <common> <control> <name>' + cmd + '</name> <zone>' + zone + '</zone> <para>' + param + '</para> </control> </common> </avr> </harman>';
     zone = zone || 'Main Zone';
     param = param || ''
     //text += 'POST HK_APP HTTP/1.1\r\n';
     text += 'POST AVR HTTP/1.1\r\n';
     text += 'Host: :' + PORT + '\r\n';
     text += 'User-Agent: Harman Kardon AVR Remote Controller /2.0\r\n';
     text += 'Content-Length: ' + payload.length + '\r\n';
     text += '\r\n';
     text += payload;
     return text;
}


exports.SendCommand = function(cmd, zone, param){

  var client = new net.Socket();
  client.connect(PORT, HOST, function() {
    client.write(buildRequest(cmd,zone,param));
      console.log('CONNECTED TO: ' + HOST + ':' + PORT + ' Sending command: ' + cmd);
      client.destroy();     // Added Later
  });

}
