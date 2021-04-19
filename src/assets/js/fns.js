"use strict"

function checkpw(pw) {
    return /^.{8,15}$/i.test(pw)
    &&/^.*[A-Z]+.*$/.test(pw)
    &&/^.*[a-z]+.*$/.test(pw)
    &&/^.*\d.*\d.*$/.test(pw) 
}

function getUid () {
    let uid = [];
    var hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (var i = 0; i < 36; i++) {
      uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    uid[14] = "4"
    uid[19] = hexDigits.substr((uid[19] & 0x3) | 0x8, 1)
    uid[8] = uid[13] = uid[18] = uid[23] = "-"
    let fuid = uid.join("")
    return fuid
  }
export { checkpw,getUid };