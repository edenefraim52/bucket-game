var startBtn = document.getElementById("startGame");
var bucket = document.getElementById("bucket");
var nextNum = document.getElementById("nextNumber");
var next_number = 1;
var moving = false;
var game = document.getElementById("game");
var positionInfo = game.getBoundingClientRect();
var height = positionInfo.height;
var width = positionInfo.width;
var numbers = document.querySelector(".numbers");
var bucketBottom = parseInt(
  window.getComputedStyle(bucket).getPropertyValue("bottom")
);
var bucketLeft = parseInt(
  window.getComputedStyle(bucket).getPropertyValue("Left")
);

bucket.addEventListener("touchstart", initialClick, false);
bucket.addEventListener("mousedown", initialClick, false);

startBtn.onclick = function (bucketPosition) {
  $(startGame).hide();
  nextNum.innerHTML = `NEXT: ${next_number}`;
  generateNums();
};

function checkNextNum() {
  if (next_number == 10) {
    alert("YAY! YOU WON :)");
    location.reload();
    clearInterval(fallInterval);
    clearInterval(timeOut);
  } else {
    next_number++;
    nextNum.innerHTML = `NEXT: ${next_number}`;
  }
}

function move(e) {
  var x = e.clientX - width / 2;

  if (x < 0) x = 0;
  if (x > width - bucket.width - 5) x = width - bucket.width - 5;

  image.style.left = x + "px";
  return x;
}

function initialClick(e) {
  if (moving) {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("touchmove", move);
    moving = !moving;
    return;
  }

  moving = !moving;
  image = this;

  document.addEventListener("mousemove", move, false);
  document.addEventListener("touchmove", move, false);
}

function generateNums() {
  var numBottom = 40;
  var num1 = document.createElement("div");
  var num2 = document.createElement("div");
  var num3 = document.createElement("div");
  num1.setAttribute("class", "num1");
  num2.setAttribute("class", "num2");
  num3.setAttribute("class", "num3");
  numbers.appendChild(num1);
  numbers.appendChild(num2);
  numbers.appendChild(num3);

  num1.textContent = Math.floor(Math.random() * 10) + 1;
  num2.textContent = Math.floor(Math.random() * 10) + 1;
  num3.textContent = Math.floor(Math.random() * 10) + 1;

  function NumFallDown() {
    if (height + numBottom - 180 < bucketBottom) {
      if (bucket.offsetLeft != num1.offsetLeft) {
        numbers.removeChild(num1);
        numbers.removeChild(num2);
        numbers.removeChild(num3);
        clearInterval(fallInterval);
      }

      if (
        (num1.offsetLeft < bucketLeft && next_number == num1.textContent) ||
        (num2.offsetLeft < bucketLeft && next_number == num2.textContent) ||
        (num3.offsetLeft < bucketLeft && next_number == num3.textContent)
      ) {
        checkNextNum();
        clearInterval(fallInterval);
      }
    }

    numBottom = numBottom - 3;
    num1.style.bottom = numBottom + "px";
    num2.style.bottom = numBottom + "px";
    num3.style.bottom = numBottom + "px";
  }

  var fallInterval = setInterval(NumFallDown, 20);
  var timeOut = setTimeout(generateNums, 2000);
}
