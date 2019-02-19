// After content has loaded

window.onload = function(){ 

    document.getElementById('chartEuNonEu').addEventListener('click', function (x){
     
        if(x.target && x.target.id == "2") {
            document.getElementById("chartEuSectors").setAttribute("visible", true);
            document.getElementById("screen").setAttribute("animation","property: position; loop: false; to: -6 3 -12;" );
            document.getElementById("btnBackmain").setAttribute("visible", true);

        } else if (x.target && x.target.id == "1") {
            document.getElementById("chartNonEuSectors").setAttribute("visible", true);
            document.getElementById("screen").setAttribute("animation","property: position; loop: false; to: 18 3 -12;" );
            document.getElementById("btnBackmain").setAttribute("visible", true);
        }
    });

    document.getElementById('chartEuSectors').addEventListener('click', function (){
            document.getElementById("chartEuCountries").setAttribute("visible", true);
            document.getElementById("screen").setAttribute("animation","property: position; loop: false; to: -5 3 -32.5;" );
            document.getElementById("btnBackmain").setAttribute("visible", false);
            document.getElementById("btnBackEu").setAttribute("visible", true);
        
    });

    document.getElementById('chartNonEuSectors').addEventListener('click', function (){

            document.getElementById("chartNonEuCountries").setAttribute("visible", true);
            document.getElementById("screen").setAttribute("animation","property: position; loop: false; to: 18 3 -32;" );
            document.getElementById("btnBackmain").setAttribute("visible", false);
            document.getElementById("btnBackNEu").setAttribute("visible", true);

    });

    document.getElementById("btnBackmain").addEventListener('click', function (){
        document.getElementById("screen").setAttribute("animation","property: position; loop: false; to: 0 3 7;" );
        document.getElementById("btnBackmain").setAttribute("visible", false);
    });

    document.getElementById("btnBackEu").addEventListener('click', function (){
        document.getElementById("screen").setAttribute("animation","property: position; loop: false; to: -6 3 -12;" );
        document.getElementById("btnBackEu").setAttribute("visible", false);
        document.getElementById("btnBackmain").setAttribute("visible", true);
    });

    document.getElementById("btnBackNEu").addEventListener('click', function (){
        document.getElementById("screen").setAttribute("animation","property: position; loop: false; to: 18 3 -12;" );
        document.getElementById("btnBackNEu").setAttribute("visible", false);
        document.getElementById("btnBackmain").setAttribute("visible", true);
    });



    
}

function moveCamera(xyz_arr) {
    var camera = document.getElementById('camera');
    camera.setAttribute('animation', {
        'x': xyz_arr[0], 
        'y': xyz_arr[1], 
        'z': xyz_arr[2]
    });
}