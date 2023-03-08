var UserLat = 45.30158603788793, UserLon = 9.492292813300557
var DestLat = 45.30283644576596, DestLon = 9.487036582617982
var map, tile, marker;
var CC = 'a';
var RoutIsCreated = false;
var x;

var Events = {
        TorreZucchetti: [45.30158603788793, 9.492292813300557],
        BurgerKing: [45.30283644576596, 9.487036582617982],

        Magika: [45.374016315014124, 9.61051977086324, "Strada Statale Paullese, 26010 Bagnolo Cremasco CR", "5 aprile", "21:30-04:00", "Discoteche"],
        Mod: [45.31830351624849, 9.498765669214587, "Piazzale 3 Agosto, 269000 Lodi", "11 marzo", "00:00-04:00", "Discoteche"],

        AnticaSagraDiSanGiuseppe: [45.214756696143056, 9.572905928725252, "Piazza Matteotti, 26822 Brembio LO", "19 aprile", "14:30-19:00/21:00-00:00", "Giostre"],
        FestaPatronaleDiSennaLodigiana: [45.14603812072854, 9.593697009697033, "Via Giovanni Falcone, 26856 Senna Lodigiana LO", "26 marzo", "14:30-19:00/21:00-00:00", "Giostre"],
        LodiOnIce: [45.313214110856144, 9.498876353875238, "Piazzale Matteotti, 26900 Lodi", "24 novembre-21 gennaio", "08:00-19:00", "Giostre"],


        TeatroAlleVigne: [45.31522029392169, 9.50605692319689, "Via Cavour, 66, 26900 Lodi", "10 marzo", "21:00-...", "Teatro"],
        TeatroAlleVigne2: [45.31522029392169, 9.50605692319689, "Via Cavour, 66, 26900 Lodi", "12 marzo", "17:00-...", "Teatro"],

        Edit: [45.493974190395086, 9.180259225044937, "Via Bernina 1C, 20158 Milano", "9 marzo", "21:30-23:30", "Comici"],
        TeatroEdi: [45.43260800281792, 9.149846140382634, "Piazza Donne Partigiane, 20142 Milano", "2 aprile", "17:00-...", "Comici"],

        GianniMorandi: [45.40160050620323, 9.142251782712268, "Forum di Assago", "12 marzo", "21:00-...", "Musica"],
        Ultimo: [45.478619789584364, 9.12141245572294, "Stadio San Siro, Milano", "17 luglio", "21:00", "Musica"],

        LaPetrarca: [45.19219024952853, 9.438869444231393, "Viale Petrarca, 1", "", "Aperto dalle 18:00 fino alle 01:00", "Pubs And Bars"],
        TheBridge: [45.317851997058355, 9.507637041679184, "Via X Maggio, 26900 Lodi", "", "19:00-03:00", "Pubs And Bars"],
        WellingtonPub: [45.321290223372664, 9.510696913388696, "Via Felice Cavallotti, 17, 26900 Lodi LO", "", "19:00-02:00", "Pubs And Bars"]

};

function Contenitore() {
        map = L.map('mapid').setView([UserLat, UserLon], 16);
}

function DisegnaScuro() {
        tile = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
        L.tileLayer(tile, {
                maxZoom: 17,
                attribution: 'Map data © OpenStreetMap contributors, ' + 'CC-BY-SA, ' + 'Imagery © Mapbox',
        }).addTo(map);
}

function DisegnaChiaro() {
        tile = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';
        L.tileLayer(tile, {
                maxZoom: 17,
                attribution: 'Map data © OpenStreetMap contributors, ' + 'CC-BY-SA, ' + 'Imagery © Mapbox',
        }).addTo(map);
}

function CambioColore() {
        if (CC == 'b') {
                CC = 'a';
                DisegnaChiaro();
                document.getElementById('rr').innerHTML = "Cambia in Scuro";
        } else {
                DisegnaScuro();
                CC = 'b';
                document.getElementById('rr').innerHTML = "Cambia in Chiaro";
        }
}

function Routing() {
        x = L.Routing.control({

                waypoints: [
                        L.latLng(UserLat, UserLon),
                        L.latLng(DestLat, DestLon)
                ],
                addWaypoints: false,
                lineOptions: {
                        styles: [
                                { color: 'black', opacity: 1, weight: 1 },
                                { color: '#d978fa', opacity: 1, weight: 4 }
                        ]
                },
                createMarker: function (i, wp, nWps) {
                        return L.marker(wp.latLng, {
                                draggable: false
                        });
                }
        }).addTo(map);
        var padding = [50, 50];
        var bounds = L.latLngBounds(x.getWaypoints().map(function (waypoint) {
                return waypoint.latLng;
        }));
        map.fitBounds(bounds, { padding: padding });
}

function RemoveRouting() {
        x.remove();
}

function LocationSelecter(parameter) {
        switch (parameter) {
                case "TorreZucchetti":
                        DestLat = Events.TorreZucchetti[0];
                        DestLon = Events.TorreZucchetti[1];
                        break;
                case "BurgerKing":
                        DestLat = Events.BurgerKing[0];
                        DestLon = Events.BurgerKing[1];
                        break;
                case "Magika":
                        DestLat = Events.Magika[0];
                        DestLon = Events.Magika[1];
                        break;
                case "Mod":
                        DestLat = Events.Mod[0];
                        DestLon = Events.Mod[1];
                        break;
                case "AnticaSagraDiSanGiuseppe":
                        DestLat = Events.AnticaSagraDiSanGiuseppe[0];
                        DestLon = Events.AnticaSagraDiSanGiuseppe[1];
                        break;
                case "FestaPatronaleDiSennaLodigiana":
                        DestLat = Events.FestaPatronaleDiSennaLodigiana[0];
                        DestLon = Events.FestaPatronaleDiSennaLodigiana[1];
                        break;
                case "LodiOnIce":
                        DestLat = Events.LodiOnIce[0];
                        DestLon = Events.LodiOnIce[1];
                        break;
                case "TeatroAlleVigne":
                        DestLat = Events.TeatroAlleVigne[0];
                        DestLon = Events.TeatroAlleVigne[1];
                        break;
                case "TeatroAlleVigne2":
                        DestLat = Events.TeatroAlleVigne2[0];
                        DestLon = Events.TeatroAlleVigne2[1];
                        break;
                case "Edit":
                        DestLat = Events.Edit[0];
                        DestLon = Events.Edit[1];
                        break;
                case "TeatroEdi":
                        DestLat = Events.TeatroEdi[0];
                        DestLon = Events.TeatroEdi[1];
                        break;
                case "GianniMorandi":
                        DestLat = Events.GianniMorandi[0];
                        DestLon = Events.GianniMorandi[1];
                        break;
                case "Ultimo":
                        DestLat = Events.Ultimo[0];
                        DestLon = Events.Ultimo[1];
                        break;
                case "LaPetrarca":
                        DestLat = Events.LaPetrarca[0];
                        DestLon = Events.LaPetrarca[1];
                        break;
                case "TheBridge":
                        DestLat = Events.TheBridge[0];
                        DestLon = Events.TheBridge[1];
                        break;
                case "WellingtonPub":
                        DestLat = Events.WellingtonPub[0];
                        DestLon = Events.WellingtonPub[1];
                        break;
        }

        if (RoutIsCreated == false) {
                RoutIsCreated = true;
        } else {
                RemoveRouting();
        }
        Routing();
}
