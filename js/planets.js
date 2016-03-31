var THREEx = THREEx || {}

THREEx.Planets	= {}

THREEx.Planets.baseURL	= '../'

function planet(r, c, tCount, mCount) {
   var renderer	= new THREE.WebGLRenderer({
		antialias	: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.shadowMapEnabled	= true
	
	var onRenderFcts= [];
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100 );
	camera.position.z = 1;

    var light	= new THREE.DirectionalLight( 0xffffff , 1 )
	light.position.set(5,5,5)
	scene.add( light );
    	
    var starSphere	= THREEx.Planets.createStarfield()
	scene.add(starSphere)
    
    for(var i = 0; i < mCount; i++){
        
        min = -3;
        max = 3;

        
        X = Math.random() * (max - min) + min
        Y = Math.random() * (max - min) + min
        Z = Math.random() * (max - min) + min
            
        mentions = JSON.parse(localStorage.getItem(i))
        r2 = mentions[0]
        c2 = mentions[1]
        var moon = THREEx.Planets.createMoon(r2, c2); //r2- radius of the neighbour planet, c2- color
        moon.position.set(X,Y,Z)
        scene.add(moon);
    }
    
    for(var i = 0; i < tCount; i++){
        
        min = -1;
        max = 1;

        
        X = Math.random() * (max - min) + min
        Y = Math.random() * (max - min) + min
        Z = Math.random() * (max - min) + min
            
        var moon = THREEx.Planets.createTweet();
        moon.position.set(X,Y,Z)
        moon.scale.multiplyScalar(1/10)
        scene.add(moon);
    }
    
    
    
    var earthMesh = THREEx.Planets.createEarth(r, c);
    scene.add(earthMesh)
    
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
        color: "#" + c
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

//planet(0.5, 0x0084b4, 10)
