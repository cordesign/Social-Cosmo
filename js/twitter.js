if (typeof(Storage) !== "undefined") {
  
    OAuth.initialize('hQkWf-Woke6ArXBFHkxpDrJo2-Q')
    OAuth.popup('twitter', {cache: true}).done(function(app) {

    app.get('https://api.twitter.com/1.1/account/verify_credentials.json').done(function(data) {  
        
        r = 0.1 * Math.log(data.followers_count);
        color = data.profile_link_color; 

        var q = ""
        var mCount, tCount, user
        var mentions = []; 
        var uniqueMentions = [];
                
        app.get("https://api.twitter.com/1.1/statuses/user_timeline.json").done(function(data) { 
                
            for(var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i]["entities"]["user_mentions"].length; j++) {
                    mentions.push(data[i]["entities"]["user_mentions"][j]["screen_name"])
                    q += data[i]["entities"]["user_mentions"][j]["screen_name"] +","
                    sessionStorage.setItem("q", q);
                    sessionStorage.setItem("tCount", data.length)
                }
            }
                
            $.each(mentions, function(i, el){
                if($.inArray(el, uniqueMentions) === -1) uniqueMentions.push(el);
            });
            
            sessionStorage.setItem("mCount", uniqueMentions.length)
            
sessionStorage.setItem("user", JSON.stringify([color, r,mCount]));
  user = JSON.parse(sessionStorage.getItem("user"))
            color = user[0]
            r = user[1]
            mCount = sessionStorage.getItem("mCount")
        tCount = sessionStorage.getItem("tCount")
                  
        planet(r, color, tCount, mCount)
            
        })
    })
        
    app.get("https://api.twitter.com/1.1/users/lookup.json?screen_name=" + sessionStorage.getItem("q")).done(function(data) { 
        mCount = sessionStorage.getItem("mCount")
        for(i = 0; i < mCount; i++) {
            console.log(data)
            r2 = 0.1 * Math.log(data[i].followers_count);
            color2 = data[i].profile_link_color;
                    
            sessionStorage.setItem(i, JSON.stringify([r2, color2]));
        } 

    }) 
       });

    // Retrieve
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
} 

