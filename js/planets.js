
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
	camera.position.z = 1;
    
    var light	= new THREE.DirectionalLight( 0xffffff , 1 )
	light.position.set(5,5,5)
	scene.add( light );
    var starSphere	= THREEx.Planets.createStarfield()
	scene.add(starSphere)
    
    

    
    
            for(var i = 0; i <= mCount; i++){
                        min = -7;
        max = 7;
                
                x[i] = Math.random() * (max - min) + min
                y[i] = Math.random() * (max - min) + min
                z[i] = Math.random() * (max - min) + min
                x[0] = 0
                y[0] = 0
                z[0] = 0

                var earthCloud	= THREEx.Planets.createEarthCloud(r[i])
                earthCloud.position.set(x[i],y[i],z[i])
	            scene.add(earthCloud)
                
                var moon = THREEx.Planets.createPlanet(r[i]); //r2- radius of the neighbour planet, c2- color
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
    
    
    
         
     $(window).on('hashchange', function(e) {  
               
                type = window.location.hash.substr(1);
         $(".active").html("<img src='" + avatar[type] + "'/>")
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
    var geometry	= new THREE.SphereGeometry(70, 32, 32)
	var texture	= THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/galaxy_starfield.png')
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
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/moonmap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/moonbump1k.jpg'),
		bumpScale: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh
}

THREEx.Planets.createPlanet = function(r, c) {
   	var geometry	= new THREE.SphereGeometry(r, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/earthmap1k.jpg'),
		bumpMap	: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/earthbump1k.jpg'),
		bumpScale: 0.002,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh
}


THREEx.Planets.createEarthCloud	= function(r){
	// create destination canvas
	var canvasResult	= document.createElement('canvas')
	canvasResult.width	= 1024
	canvasResult.height	= 512
	var contextResult	= canvasResult.getContext('2d')		

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {
		
		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas')
		canvasMap.width	= imageMap.width
		canvasMap.height= imageMap.height
		var contextMap	= canvasMap.getContext('2d')
		contextMap.drawImage(imageMap, 0, 0)
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas')
			canvasTrans.width	= imageTrans.width
			canvasTrans.height	= imageTrans.height
			var contextTrans	= canvasTrans.getContext('2d')
			contextTrans.drawImage(imageTrans, 0, 0)
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height)
			for(var y = 0, offset = 0; y < imageMap.height; y++){
				for(var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0]
					dataResult.data[offset+1]	= dataMap.data[offset+1]
					dataResult.data[offset+2]	= dataMap.data[offset+2]
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
				}
			}
			// update texture with result
			contextResult.putImageData(dataResult,0,0)	
			material.map.needsUpdate = true;
		})
		imageTrans.src	= THREEx.Planets.baseURL+'images/earthcloudmaptrans.jpg';
	}, false);
	imageMap.src	= THREEx.Planets.baseURL+'images/earthcloudmap.jpg';

	var geometry	= new THREE.SphereGeometry(r+0.01, 32, 32)
	var material	= new THREE.MeshPhongMaterial({
		map		: new THREE.Texture(canvasResult),
		side		: THREE.DoubleSide,
		transparent	: true,
		opacity		: 0.8,
	})
	var mesh	= new THREE.Mesh(geometry, material)
	return mesh	
}