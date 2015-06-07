// the URL of the WAMP Router (Crossbar.io)
//
var wsuri;
if (document.location.origin == "file://") {
    wsuri = "ws://127.0.0.1:8080/ws";

} else {
    wsuri = (document.location.protocol === "http:" ? "ws:" : "wss:") + "//" +
    document.location.host + "/ws";
}


// the WAMP connection to the Router
//
var connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
});


// fired when connection is established and session attached
//
connection.onopen = function (session, details) {
    main(session);

};

function main(session) {



    session.subscribe("io.crossbar.demo.pobierzTabliceGracza1",
        function (args) {
            var wspol = args[0];
            $(".wspozednie2Gracza1").text(JSON.stringify(wspol));

        });
    session.subscribe("io.crossbar.demo.pobierzTabliceGracza2",
        function (args) {
            var wspol = args[0];
            $(".wspozednie2Gracza2").text(JSON.stringify(wspol));;
        });
    session.subscribe("io.crossbar.demo.pobierzTabliceGracza3",
        function (args) {
            var wspol = args[0];
            $(".wspozednie2Gracza3").text(JSON.stringify(wspol));;
        });

    $(document).ready(function () {
        //Canvas stuff
        var canvas = $("#canvas")[0];
        var ctx = canvas.getContext("2d");
        var w = $("#canvas").width();
        var h = $("#canvas").height();

        //Lets save the cell width in a variable for easy control
        var cw = 10;
        var d;
        var score;

        //Lets create the snake now
        var snake_array; //an array of cells to make up the snake

        function init() {
            d = "down"; //default direction
            var wspolzedne = $(".wspozednie2Gracza1").html();

            var TablicaJsonPunktow = $(jQuery.parseJSON($(".wspozednie2Gracza1").html())).each(function () {
                var x = this.x;
                var y = this.y;
            });


//                if (wspolzedne=="" ||  wspolzedne==" ")
//                {
//
//                }
//                else
//                {
            snake_array=[];
            for (var i = TablicaJsonPunktow.length; i >= 0; i--) {
                //This will create a horizontal snake starting from the top left
//                       //--------------------------------------

                //tu jest zero a czemu to nie wiem


                ////////------------------------
                snake_array.push(TablicaJsonPunktow[0]);
            }
//                    snake_array=TablicaJsonPunktow;
//                }

            //create_food(); //Now we can see the food particle
            //finally lets display the score
//                score = 0;

            //Lets move the snake now using a timer which will trigger the paint function
            //every 60ms
            if (typeof game_loop != "undefined") clearInterval(game_loop);
            game_loop = setInterval(paint, 300);
        }

//            init();




        function paint() {

            ctx.fillStyle = "white";   //wydluza weza
            ctx.fillRect(0, 0, w, h);


            ctx.strokeStyle = "black";
            ctx.strokeRect(0, 0, w, h);


            var nx = snake_array[0].x;
            var ny = snake_array[0].y;

            if (d == "right") nx++;
            else if (d == "left") nx--;
            else if (d == "up") ny--;
            else if (d == "down") ny++;


            var wspolzedne = $(".wspozednie").html();

            $(".wspozednie").text(wspolzedne + '{"x":' + nx + ',"y":' + ny + '},');
            var str = $(".wspozednie").html();
            str = str.substring(0, str.length - 1);


            $(".wspozednie2Gracza1").text('[' + str.toString() + ']');


            var TablicaJsonPunktow = $(jQuery.parseJSON($(".wspozednie2Gracza1").html())).each(function () {
                var x = this.x;
                var y = this.y;
            });


            var wspol = TablicaJsonPunktow;

            session.call("io.crossbar.demo.WyslijTabliceGracza1", [wspol]).then(session.log, session.log);


            if (nx == -1 || nx == w / cw || ny == -1 || ny == h / cw || check_collision(nx, ny, snake_array)) {
                //restart game
                init();
                $(".wspozednie").text(" ");
                //Lets organize the code a bit now.
                return;
            }


            var tail = {x: nx, y: ny};
            score++;


            snake_array.unshift(tail); //puts back the tail as the first cell

            for (var i = 0; i < TablicaJsonPunktow.length; i++) {
                var c = TablicaJsonPunktow[i];
                //Lets paint 10px wide cells
                paint_cell(c.x, c.y);
            }


            var score_text = "Score: " + score;
            ctx.fillText(score_text, 5, h - 5);


        }


        $(".gracz1").click(function(){

            init();
        })
        $(".jeszczeraz").click(function () {
            session.call("io.crossbar.demo.zacznijjesczeraz").then(session.log);
//                $(".wspozednie").text(" ");




            //Lets organize the code a bit now.
            return;
        })

        $(document).keydown(function (e) {
            var key = e.which;
            //We will add another clause to prevent reverse gear
            if (key == "37" && d != "right") d = "left";
            else if (key == "38" && d != "down") d = "up";
            else if (key == "39" && d != "left") d = "right";
            else if (key == "40" && d != "up") d = "down";
            //The snake is now keyboard controllable
        })

        function paint_cell(x, y) {
            ctx.fillStyle = "blue";
            ctx.fillRect(x * cw, y * cw, cw, cw);
            ctx.strokeStyle = "white";
            ctx.strokeRect(x * cw, y * cw, cw, cw);
        }

        function check_collision(x, y, array) {
            //This function will check if the provided x/y coordinates exist
            //in an array of cells or not
            for (var i = 0; i < array.length; i++) {
                if (array[i].x == x && array[i].y == y)
                    return true;
            }
            return false;
        }


    })
}

//Lets add the keyboard controls now


// now actually open the connection
//
connection.open();