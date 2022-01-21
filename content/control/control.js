var ctx, kontroller, rektangel, loop;

ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = 500;
ctx.canvas.width = 900;

rektangel = {

  height: 32,
  jumping:true,
  width: 32,
  x: 144, 
  x_fart: 0,
  y: 0,
  y_fart: 0

};

kontroller = {

  left:false,
  hoyre:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// venstre key
        kontroller.left = key_state;
      break;
      case 38:// opp key
        kontroller.up = key_state;
      break;
      case 39:// høyre key
        kontroller.hoyre = key_state;
      break;

    }

  }

};


loop = function() {

if (kontroller.up && rektangel.jumping == false) {
    rektangel.y_fart -= 28;
    rektangel.jumping = true;
  }

if (kontroller.left) {
  rektangel.x_fart -= 0.5;
  }

if (kontroller.hoyre) {
  rektangel.x_fart += 0.5;
  }

rektangel.y_fart += 1.5;// gravitasjon
rektangel.x += rektangel.x_fart;
rektangel.y += rektangel.y_fart;
rektangel.x_fart *= 0.9;// friksjon
rektangel.y_fart *= 0.9;// friksjon (luft)

  // hvis rektangel faller forbi nedre grense 
if (rektangel.y > 500 - 16 - 32) {
  rektangel.jumping = false;
  rektangel.y = 500 - 16 - 32;
  rektangel.y_fart = 0;
}

// hvis rektangel går forbi left grense
if (rektangel.x < -32) {
  rektangel.x = 900;
} else if (rektangel.x > 900) {// hvis rektangel går forbi hoyre grense
  rektangel.x = -32;
}

ctx.fillStyle = "#202020"; // 
ctx.fillRect(0, 0, 900, 500);// x, y, width, height
ctx.fillStyle = "#ff00f0";// hex for rød
ctx.beginPath();
ctx.rect(rektangel.x, rektangel.y, rektangel.width, rektangel.height);
ctx.fill();

// kaller oppdater når siden er klar for tegne igjen
window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", kontroller.keyListener)
window.addEventListener("keyup", kontroller.keyListener);
window.requestAnimationFrame(loop);
