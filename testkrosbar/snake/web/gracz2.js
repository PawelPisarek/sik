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


    $(document).ready(function () {
    session.subscribe("io.crossbar.demo.pobierzTabliceGracza1",
        function (args) {
            var wspol = args[0];
            $(".wspozednie2Gracza1").text(JSON.stringify(wspol));
            paint();
        });
    session.subscribe("io.crossbar.demo.pobierzTabliceGracza2",
        function (args) {
            var wspol = args[0];
            $(".wspozednie2Gracza2").text(JSON.stringify(wspol));
        });
    session.subscribe("io.crossbar.demo.pobierzTabliceGracza3",
        function (args) {
            var wspol = args[0];
            $(".wspozednie2Gracza3").text(JSON.stringify(wspol));;
        });


        //Canvas stuff
        var canvas = $("#canvas")[0];
        var ctx = canvas.getContext("2d");
        var w = $("#canvas").width();
        var h = $("#canvas").height();

        //Lets save the cell width in a variable for easy control
        var cw = 10;

        $(".jeszczeraz").click(function () {
            session.call("io.crossbar.demo.zacznijjesczeraz").then(session.log);

        });


       function paint()
        {
            ctx.fillStyle = "white";   //wydluza weza
            ctx.fillRect(0, 0, w, h);


            ctx.strokeStyle = "black";
            ctx.strokeRect(0, 0, w, h);


           waz(".wspozednie2Gracza1");
        }

        function waz(tekst){

            var TablicaJsonPunktow = $(jQuery.parseJSON($(tekst).html())).each(function () {
                var x = this.x;
                var y = this.y;
            });
            for (var i = 0; i < TablicaJsonPunktow.length; i++) {
                var c = TablicaJsonPunktow[i];
                //Lets paint 10px wide cells
                paint_cell(c.x, c.y);
            }

        }

        function paint_cell(x, y) {
            ctx.fillStyle = "blue";
            ctx.fillRect(x * cw, y * cw, cw, cw);
            ctx.strokeStyle = "white";
            ctx.strokeRect(x * cw, y * cw, cw, cw);
        }



    })
}

connection.open();