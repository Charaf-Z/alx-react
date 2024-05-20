const $ = require('jquery');
const _ = require('lodash');

let count = 0;

$('<p>Holberton Dashboard</p>').appendTo('body');
$('<p>Dashboard data for the students</p>').appendTo('body');
$('<button>Click here to get started</button>').appendTo('body');
$("<p id='count'></p>").appendTo('body');
$('<p>Copyright - Holberton School</p>').appendTo('body');

function updateCounter() {
  count++;
  $('#count').html(`${count} clicks on the button`);
}

$('button').on('click', _.debounce(updateCounter));
