
var zoom= 0;
var m
var x = {};
var y = {};
var z = {};
type = 0;


var THREEx = THREEx || {}

THREEx.Planets	= {}

THREEx.Planets.baseURL	= '/'

function planet() {
    
    
   var renderer	= new THREE.WebGLRenderer({
		antialias	: true
	}); 
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.shadowMapEnabled	= true
	var type = 0;
    type = window.location.hash.substr(1);
	var onRenderFcts= [];
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100 );
	camera.position.z = 5 + zoom;
    
    var light	= new THREE.DirectionalLight( 0xffffff , 1 )
	light.position.set(5,5,5)
	scene.add( light );
    var starSphere	= THREEx.Planets.createStarfield()
	scene.add(starSphere)
    
    
    if(r[0] == '-Infinity'){
          for(var j = 0;j <=Math.log( tCount[i]) && j <= 50; j++) {

        
                    var orbit = 0.5 + 0.5;
        
                    var u = Math.random() 
                    var v = Math.random() 
                    var theta = 2 * Math.PI * u;
                    var phi = Math.acos(2 * v - 1);
                    X = (orbit * Math.sin(phi) * Math.cos(theta));
                    Y = (orbit * Math.sin(phi) * Math.sin(theta));
                    Z = (orbit * Math.cos(phi));
                
            
                    var tweet = THREEx.Planets.createTweet(r[i]);
                    tweet.position.set(X,Y,Z)
                    tweet.scale.multiplyScalar(1/6)
                    scene.add(tweet);
                }
        
    }
    
    
            for(var i = 0; i <= mCount; i++){
                        min = -7;
                        max = 7;
                
                x[i] = Math.random() * (max - min) + min
                y[i] = Math.random() * (max - min) + min
                z[i] = Math.random() * (max - min) + min
                x[0] = 0
                y[0] = 0
                z[0] = 0
                
                if (i > 0){
                     for (var j = 0; j <= mCount; j++){
                        var d = distanceVector(x[i], y[i], z[i],x[j], y[j], z[j]);
                        var d1 = distanceVector (x[i], y[i], z[i], 0, 0, 0);
                        if (j != i){
                            while (d1 < r[0]+r[i]+0.5 || d < r[i]+ r[j] + 0.5){

                                   x[i] =   Math.random() * (m + m) - m ;
                                   y[i] =   Math.random() * (m + m) - m ;
                                   z[i] =   Math.random() * (m + m) - m ;
                                    d = distanceVector(x[i], y[i], z[i],x[j], y[j], z[j]);
                                    d1 = distanceVector (x[i], y[i], z[i], 0, 0, 0);
                               
                            }
                        }
                        else{
                             while (d1 < r[0]+r[i]+0.5){

                               

                                    x[i] = Math.random() * (max - min) + min
                                    y[i] = Math.random() * (max - min) + min
                                    z[i] = Math.random() * (max - min) + min

                                    d = distanceVector(x[i], y[i], z[i],x[j], y[j], z[j]);
                                    d1 = distanceVector (x[i], y[i], z[i], 0, 0, 0);
                            }
                        }
                    }
                
                }
                 min = 1;
                max = 7;
                img = Math.random() * (max - min) + min
                 
          if ( temp_c[i] >= 40) {
              temper[i] = "_1"
          } else if (temp_c[i] < 40 && temp_c[i] >= 30) {
              temper[i] = "_2"
          } else if (temp_c[i] < 30 && temp_c[i] >= 20) {
              temper[i] = "_3"
          } else if (temp_c[i] < 20 && temp_c[i] >= 10) {
              temper[i] = "_4"
          } else if (temp_c[i] < 10 && temp_c[i] >= 0) {
              temper[i] = "_5"
          } else if (temp_c[i] < 0 && temp_c[i] >= -10) {
              temper[i] = "_6"
          } else if (temp_c[i] < -10 && temp_c[i] >= -20) {
              temper[i] = "_7"
          } else if (temp_c[i] < -20 && temp_c[i] >= -30) {
              temper[i] = "_8"
          } else if (temp_c[i] <= -40) {
              temper[i] = "_9"
          } else {
              temper[i] = ""
          }
                var moon = THREEx.Planets.createPlanet(r[i], Math.round(img), temper[i]); 
                
                moon.position.set(x[i],y[i],z[i])
                scene.add(moon);
         
                for(var j = 0;j <=Math.log( tCount[i]) && j <= 50; j++) {

        
                    var orbit = r[i]+ 0.5;
        
                    var u = Math.random() 
                    var v = Math.random() 
                    var theta = 2 * Math.PI * u;
                    var phi = Math.acos(2 * v - 1);
                    X = x[i] + (orbit * Math.sin(phi) * Math.cos(theta));
                    Y = y[i] + (orbit * Math.sin(phi) * Math.sin(theta));
                    Z = z[i] + (orbit * Math.cos(phi));
                
            
                    var tweet = THREEx.Planets.createTweet(r[i]);
                    tweet.position.set(X,Y,Z)
                    tweet.scale.multiplyScalar(1/6)
                    scene.add(tweet);
                }
        }
    
     var geometry	= new THREE.SphereGeometry(r[0], 32, 32)
                    var material	= THREEx.createAtmosphereMaterial()

                    material.uniforms.glowColor.value.set("#" + color[0])
                    material.uniforms.coeficient.value	= 0.8
                    material.uniforms.power.value		= 2.0
                    var mesh	= new THREE.Mesh(geometry, material );
                    mesh.scale.multiplyScalar(1.01);
                    scene.add( mesh )
                    mesh.name = 0;
    
         
     $(window).on('hashchange', function(e) {  
               scene.remove(scene.getObjectByName(0));
                type = window.location.hash.substr(1);
        $(".active").html("<img onclick='twitter(\"" + names[type] + "\")' src='" + avatar[type] + "'/>")
    $("#select").html("<a href='#'>" + names[type]) 
    $("#size").html(size[type]) 
    $("#tCount").html(tCount[type]) 
    $("#time").html(userDate[type]) 
               var selected = e.originalEvent.oldURL;
               selected = selected.substr(selected.length - 1)
               scene.remove(scene.getObjectByName(selected));
               if(type == 0) {
                   
               
               scene.remove(scene.getObjectByName(selected));
                   
                    var geometry	= new THREE.SphereGeometry(r[0], 32, 32)
                    var material	= THREEx.createAtmosphereMaterial()

                    material.uniforms.glowColor.value.set("#" + color[0])
                    material.uniforms.coeficient.value	= 0.8
                    material.uniforms.power.value		= 2.0
                    var mesh	= new THREE.Mesh(geometry, material );
                    mesh.scale.multiplyScalar(1.01);
                    scene.add( mesh )
                    mesh.name = 0;
               } else {
               scene.remove(scene.getObjectByName(selected));
        
       
            var geometry	= new THREE.SphereGeometry(r[type], 32, 32)
	var material	= THREEx.createAtmosphereMaterial()
	material.uniforms.glowColor.value.set("#" + color[type])
	material.uniforms.coeficient.value	= 0.8
	material.uniforms.power.value		= 2.0
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(1.01);
        mesh.position.set(x[type], y[type], z[type])
        mesh.name = type;
	scene.add( mesh )
               }
   
  //.. work ..
});
    
    $( "canvas" ).click(function() {
      
        
        if(type >= 0 && type < mCount) {
      window.location.hash = parseInt(type) + 1;
        } else {
            window.location.hash = 0;
            
        }
    });
    
	var mouse	= {x : 0, y : 0}
	document.addEventListener('mousemove', function(event){
		mouse.x	= (event.clientX / window.innerWidth ) - 0.5
		mouse.y	= (event.clientY / window.innerHeight) - 0.5
	}, false)
    /*
    document.addEventListener('keydown', function(e) {
         switch (e.keyCode) {
        case 38:
            zoom++;
            console.log("VASOC")
            break;
        case 40:
            zoom--;
            break;
        }
        
    }, false);
    */
    
	onRenderFcts.push(function(delta, now){
		camera.position.x += (mouse.x*5 - camera.position.x) * (delta*3)
		camera.position.y += (mouse.y*5 - camera.position.y) * (delta*3)
		camera.lookAt( scene.position )
        //camera.position.z += zoom;
       
	})

	onRenderFcts.push(function(){
		renderer.render( scene, camera );		
	})

	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(deltaMsec/1000, nowMsec/1000)
		})
	})
}

THREEx.Planets.createStarfield	= function(){
    var geometry	= new THREE.SphereGeometry(70, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture('images/galaxy_starfield.png')
	var material	= new THREE.MeshBasicMaterial({
		map	: texture,
		side	: THREE.BackSide
	})
	
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createTweet = function(r) {
  var geometry	= new THREE.SphereGeometry(r, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture('images/moonmap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture('images/moonbump1k.jpg'),
		bumpScale: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh
}

THREEx.Planets.createPlanet = function(r,img,temper) {
   	var geometry	= new THREE.SphereGeometry(r, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture('images/p' + img + 'map1k' + temper+ '.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture('images/p' + img + 'bump1k.jpg'),
		bumpScale: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh
}

function distanceVector( X1, Y1, Z1, X2, Y2, Z2 )
{
    var dx = X1 - X2;
    var dy = Y1 - Y2;
    var dz = Z1 - Z2;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}


