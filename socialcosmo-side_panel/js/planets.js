

var THREEx = THREEx || {}

THREEx.Planets	= {}

THREEx.Planets.baseURL	= './'

function planet(r, c, tCount, mCount) {
   var renderer	= new THREE.WebGLRenderer({
		antialias	: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.shadowMapEnabled	= true
	var type = -1;
	var onRenderFcts= [];
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100 );
	camera.position.z = 1;

    var light	= new THREE.DirectionalLight( 0xffffff , 1 )
	light.position.set(5,5,5)
    lights(light)
	scene.add( light );
    	//name, color2, r2, size2, tCount2, twit, x2, y2, z2
    var starSphere	= THREEx.Planets.createStarfield()
	scene.add(starSphere)
 type = window.location.hash.substr(1);
        $(".active").html("<a href='#0'>" + JSON.parse(localStorage.getItem("0"))[0])
        $("#select").html("select user")
        for(i = 1; i<= localStorage.getItem("mCount"); i++) {
            $(".dropdown-menu").append("<li><a style='color: #" + JSON.parse(localStorage.getItem(i))[1] +  "' href='#" + i + "'>" + JSON.parse(localStorage.getItem(i))[0]+"</li>")
        }
    
           $(window).on('hashchange', function(e) {  
               
                type = window.location.hash.substr(1);
               
               if(type == 0) {
                    var geometry	= new THREE.SphereGeometry(r, 32, 32)
                    var material	= THREEx.createAtmosphereMaterial()

                    material.uniforms.glowColor.value.set("#" + c)
                    material.uniforms.coeficient.value	= 0.8
                    material.uniforms.power.value		= 2.0
                    var mesh	= new THREE.Mesh(geometry, material );
                    mesh.scale.multiplyScalar(1.01);
                    scene.add( mesh )
                    mesh.name = 0;
               } else {
               
               scene.remove(scene.getObjectByName(0));
               }
              
                   $("#select").html("<a href='#'>" + JSON.parse(localStorage.getItem(type))[0]) 
                    $("#size").html(JSON.parse(localStorage.getItem(type))[3]) 
                    $("#tCount").html(JSON.parse(localStorage.getItem(type))[4]) 
               
                $("#select").html("<a href='#'>" + JSON.parse(localStorage.getItem(type))[0]) 
       $("#size").html(JSON.parse(localStorage.getItem(type))[3]) 
       $("#tCount").html(JSON.parse(localStorage.getItem(type))[4]) 
        $("#twits").append(JSON.parse(localStorage.getItem(type))[5]) 
           
               var selected = e.originalEvent.oldURL;
               selected = selected.substr(selected.length - 1)
               scene.remove(scene.getObjectByName(selected));
               
       
        
        mentions = JSON.parse(localStorage.getItem(type))
        c2 = mentions[1]
        r2 = mentions[2]
        x2 = mentions[6]
        y2 = mentions[7]
        z2 = mentions[8]
        var moon = THREEx.Planets.createMoon(r2, c2); //r2- radius of the neighbour planet, c2- color
            var geometry	= new THREE.SphereGeometry(r2, 32, 32)
	var material	= THREEx.createAtmosphereMaterial()
	material.uniforms.glowColor.value.set("#" + c2)
	material.uniforms.coeficient.value	= 0.8
	material.uniforms.power.value		= 2.0
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.scale.multiplyScalar(1.01);
        mesh.position.set(x2, y2, z2)
        mesh.name = type;
	scene.add( mesh )
       
    
     
   
  //.. work ..
});

        //name, color2, r2, size2, tCount2, twit, x2, y2, z2

    for(var i = 1; i <= mCount; i++){
        
           mentions = JSON.parse(localStorage.getItem(i))
        c2 = mentions[1]
        r2 = mentions[2]
        x2 = mentions[6]
        y2 = mentions[7]
        z2 = mentions[8]
        tCount2 = mentions[4]
        
        var moon = THREEx.Planets.createMoon(r2, c2); //r2- radius of the neighbour planet, c2- color
        moon.position.set(x2,y2,z2)
            scene.add(moon);

        
    }
    console.log(tCount2)
        for(var i = 0; i < mCount; i++){
        
           mentions = JSON.parse(localStorage.getItem(i))
        c2 = mentions[1]
        r2 = mentions[2]
        x2 = mentions[6]
        y2 = mentions[7]
        z2 = mentions[8]
        tCount2 = mentions[4]
        console.log(tCount2)
            for(var i = 0; i < tCount2; i++) {
           
            
        min = -2;
        max = 2;

        
        X = x2 + Math.random() * (max - min) + min
        Y = y2 + Math.random() * (max - min) + min
        Z = z2 + Math.random() * (max - min) + min
        
        var orbit = r2+0.2;
        
            var u = Math.random() 
            var v = Math.random() 
            var theta = 2 * Math.PI * u;
            var phi = Math.acos(2 * v - 1);
            X = x2 + (orbit * Math.sin(phi) * Math.cos(theta));
            Y = y2 + (orbit * Math.sin(phi) * Math.sin(theta));
            Z = z2 + (orbit * Math.cos(phi));
                
            
        var moon2 = THREEx.Planets.createTweet();
            
        moon2.position.set(X,Y,Z)
        moon2.scale.multiplyScalar(1/10)
        scene.add(moon2);
        }
        }
    
    
    
    
    for(var i = 0; i < tCount; i++){
        
         min = -r - 0.2;
        max = r+ 0.2;
        
        
            var orbit = r+0.2;
            var center = 0;
            var u = Math.random() 
            var v = Math.random() 
            var theta = 2 * Math.PI * u;
            var phi = Math.acos(2 * v - 1);
            X = center + (orbit * Math.sin(phi) * Math.cos(theta));
            Y = center + (orbit * Math.sin(phi) * Math.sin(theta));
            Z = center + (orbit * Math.cos(phi));
        
        
        
        var moon = THREEx.Planets.createTweet();
        moon.position.set(X,Y,Z)
        moon.scale.multiplyScalar(1/10)
        scene.add(moon);
    }
    
    
    
    var earthMesh = THREEx.Planets.createEarth(r, c);
    scene.add(earthMesh)
    
    
   
    
    $( "canvas" ).click(function() {
      
            window.location.hash = 1
        
        if(type >= 1) {
      window.location.hash = parseInt(type) + 1;
        } else {
           // window.location.hash = 0;
            
        }
    });
    
	var mouse	= {x : 0, y : 0}
	document.addEventListener('mousemove', function(event){
		mouse.x	= (event.clientX / window.innerWidth ) - 0.5
		mouse.y	= (event.clientY / window.innerHeight) - 0.5
	}, false)
	onRenderFcts.push(function(delta, now){
		camera.position.x += (mouse.x*5 - camera.position.x) * (delta*3)
		camera.position.y += (mouse.y*5 - camera.position.y) * (delta*3)
		camera.lookAt( scene.position )
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
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/galaxy_starfield.png')
	var material	= new THREE.MeshBasicMaterial({
		map	: texture,
		side	: THREE.BackSide
	})
	var geometry	= new THREE.SphereGeometry(70, 32, 32)
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}

THREEx.Planets.createEarth = function(r, profile_color) {
    
    var geometry = new THREE.SphereGeometry(r,32,32)
    var material = new THREE.MeshPhongMaterial({
        color: "#" + profile_color
    })
    var mesh = new THREE.Mesh(geometry, material)
    
    return mesh
    
}
THREEx.Planets.createTweet = function(profile_color) {
    var geometry = new THREE.SphereGeometry(0.1, 32 , 32)
    var material = new THREE.MeshPhongMaterial({
        color: "#" + profile_color
    })
    var mesh = new THREE.Mesh(geometry, material)
    
    return mesh
}

THREEx.Planets.createMoon = function(r, c) {
    var geometry = new THREE.SphereGeometry(r, 32 , 32)
    var material = new THREE.MeshPhongMaterial({
        color: "#" + 253412
    })
    
    var mesh = new THREE.Mesh(geometry, material)
    
    return mesh
}


function lights(light) { 
	light.castShadow	= true
	light.shadowCameraNear	= 0.01
	light.shadowCameraFar	= 15
	light.shadowCameraFov	= 45
	light.shadowCameraLeft	= -1
	light.shadowCameraRight	=  1
	light.shadowCameraTop	=  1
	light.shadowCameraBottom= -1
	// light.shadowCameraVisible	= true
	light.shadowBias	= 0.001
	light.shadowDarkness	= 0.2
	light.shadowMapWidth	= 1024
	light.shadowMapHeight	= 1024

}
