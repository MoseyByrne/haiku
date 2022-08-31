import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { haikuChecker } from './haikuChecker.js';

$(document).ready(function(){
  $("form#haikuChecker").submit(function(event){
    event.preventDefault();
    let poem = [];
    poem[0] = $("#line1").val();
    poem[1] = $("#line2").val();
    poem[2] = $("#line3").val();

    const isHaiku = haikuChecker(poem);
    
    if(isHaiku) {
      $(".result").html("<br>It is a haiku!<br>Syllables five seven five<br>Thank you for playing :^)");
    } else {
      $(".result").html("<br>Is not a haiku<br>maybe try again or just<br>go take a good nap");
    }

  });
});