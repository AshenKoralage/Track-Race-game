$(function () {

    var anim_id;
    var container = $('#container');
    var track1 = $('#track-1');
    var track2 = $('#track-2');
    var track3 = $('#track-3');
    var mycar = $('#myCar');
    var car1 = $('#OtherCar1');
    var car2 = $('#OtherCar2');
    var car3 = $('#OtherCar3');
    var restart_game = $('#restart_game');
    var restart = $('#restart');
    var score = $('#count');


    var con_left = parseInt(container.css('left'));
    var con_width = parseInt(container.css('width'));
    var con_height = parseInt(container.css('height'));
    var car_width = parseInt(mycar.css('width'));
    var car_height = parseInt(mycar.css('height'));

    var gameOver = false;
    var move_right = false;
    var move_left = false;
    var score_counter = 1;

    var speed = 2;
    var line_speed = 5;

    $(document).on('keydown', function (e) {
        if (gameOver === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            }
        }
    });

    $(document).on('keyup', function(e) {
        if (gameOver === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            }
        }
    });



    function left() {
        if (gameOver === false && parseInt(mycar.css('left')) > 0) {
            mycar.css('left', parseInt(mycar.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (gameOver === false && parseInt(mycar.css('left')) < con_width - car_width) {
            mycar.css('left', parseInt(mycar.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    anim_id = requestAnimationFrame(repeat);
    function repeat() {
        if (collision(mycar, car1) || collision(mycar, car2) || collision(mycar, car3)) {
            stop_the_game();
            return;
        }

        score_counter++;

        if (score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 10);
        }
        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
        }
        car_down(car1);
        car_down(car2);
        car_down(car3);

        line_down(track1);
        line_down(track2);
        line_down(track3);

        anim_id = requestAnimationFrame(repeat);

    }

    function car_down(mycar) {
        var car_current_top = parseInt(mycar.css('top'));
        if (car_current_top > con_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (con_width - car_width));
            mycar.css('left', car_left);
        }
        mycar.css('top', car_current_top + speed);
    }
    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > con_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }
    restart.click(function() {
        location.reload();
    });

    function stop_the_game() {
        gameOver = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);

        restart_game.slideDown();
        restart.focus();
    }


    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

});