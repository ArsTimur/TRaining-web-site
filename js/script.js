window.addEventListener("DOMContentLoaded", function () {
  const tabs = require('./modules/tabs');
  const timer = require('./modules/timer');
  const cards = require('./modules/cards');
  const calc = require('./modules/calc');
  const forms = require('./modules/forms');
  const slider = require('./modules/slider');
  const modal = require('./modules/modal');


  tabs();
  timer();
  cards();
  calc();
  forms();
  slider();
  modal();
})
