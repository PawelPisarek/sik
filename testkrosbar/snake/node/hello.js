///////////////////////////////////////////////////////////////////////////////
//
//  Copyright (C) 2014, Tavendo GmbH and/or collaborators. All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
//  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
//  POSSIBILITY OF SUCH DAMAGE.
//
///////////////////////////////////////////////////////////////////////////////

var autobahn = require('autobahn');

var connection = new autobahn.Connection({
   url: 'ws://127.0.0.1:8080/ws',
   realm: 'realm1'}
);

function main (session) {

    var gracz1;
    var gracz2;
    var gracz3;

    var WyslijTabliceGracza1 = function(args, kwargs, details) {


       gracz1=args[0];


        // publikuje tablice json gracza dla wyszystkich suskrybentow
        session.publish("io.crossbar.demo.pobierzTabliceGracza1", [gracz1]);


        return "zapisalem tablice gracza 1 " + gracz1;
    };

    var WyslijTabliceGracza2 = function(args, kwargs, details) {


        gracz2=args[0];


        // publikuje tablice json gracza dla wyszystkich suskrybentow
        session.publish("io.crossbar.demo.pobierzTabliceGracza2", [gracz2]);


        return "zapisalem tablice gracza 2 " + gracz2;
    };

    var WyslijTabliceGracza3 = function(args, kwargs, details) {


        gracz3=args[0];


        // publikuje tablice json gracza dla wyszystkich suskrybentow
        session.publish("io.crossbar.demo.pobierzTabliceGracza3", [gracz3]);


        return "zapisalem tablice gracza 3 " + gracz3;
    };


    var jeszczeraz = function(args, kwargs, details) {


        gracz1="";


        // publikuje tablice json gracza dla wyszystkich suskrybentow
        session.publish("io.crossbar.demo.pobierzTabliceGracza1", [gracz1]);


        return "usunolem gracza 1 2 i  3";
    };



    session.register('io.crossbar.demo.WyslijTabliceGracza1', WyslijTabliceGracza1);
    session.register('io.crossbar.demo.WyslijTabliceGracza2', WyslijTabliceGracza2);
    session.register('io.crossbar.demo.WyslijTabliceGracza3', WyslijTabliceGracza3);
    session.register('io.crossbar.demo.zacznijjesczeraz', jeszczeraz);

}

connection.onopen = function (session) {
    main(session);
};

connection.open();
