import $ from 'jquery';
import _ from 'lodash';
import './body.css';

$('body').append('<button>Click here to get started</button>');
$('body').append("<p id='count'></p>");

let counter = 0;
function updateCounter() {
  $('#count').text(`${++counter} clicks on the button`);
}

$('button').on('click', _.debounce(updateCounter, 500));
