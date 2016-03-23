
//create an account in oauth.io
OAuth.initialize('hQkWf-Woke6ArXBFHkxpDrJo2-Q')
//this makes a window pop up to authorize our app
OAuth.popup('twitter', {cache: true}).done(function(twitter) {

    twitter.get('https://api.twitter.com/1.1/account/verify_credentials.json').done(function(data) {   
        console.log(data)
        
   })
    
                
twitter.get('https://api.twitter.com/1.1/followers/list.json').done(function(data) {
        
        console.log(data)    
    
    })

    twitter.get('http://api.wunderground.com/api/778255f9460ead52/geolookup/q/autoip.json').done(function (data) {
        console.log(data)
        twitter.get('http://api.wunderground.com/api/778255f9460ead52/forecast/q/'+ data.location.country_name + '/'+ data.location.city + '.json').done(function (data) {
                console.log(data);
            })

    })
});


