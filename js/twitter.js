if (typeof(Storage) !== "undefined") {
//create an account in oauth.io
OAuth.initialize('hQkWf-Woke6ArXBFHkxpDrJo2-Q')
//this makes a window pop up to authorize our app
OAuth.popup('twitter', {cache: true}).done(function(twitter) {

    var q = "";
    twitter.get('https://api.twitter.com/1.1/account/verify_credentials.json').done(function(data) {   
        r = 0.1 * Math.log(data.followers_count);
        color = data.profile_link_color; 
        mentionsCount = data.status.entities.user_mentions.length
        localStorage.setItem("count", mentionsCount)
         localStorage.setItem("user", JSON.stringify([color, r,mentionsCount]));

            for(i = 0; i < mentionsCount; i++){ 
                if(i+1 < mentionsCount) {
                    q += data.status.entities.user_mentions[i].screen_name +","
                } else {
                    q += data.status.entities.user_mentions[i].screen_name 
                }
                
                localStorage.setItem("q", JSON.stringify([q]));
            }
        
            twitter.get("https://api.twitter.com/1.1/users/lookup.json?screen_name=" + q).done(function(data) { 
                for(i = 0; i < mentionsCount; i++) {
                    
                    r2 = 0.1 * Math.log(data[i].followers_count);
                    color2 = data[i].profile_link_color;
                    
                    localStorage.setItem(i, JSON.stringify([r2, color2]));
                }
               
                
        console.log(data)
                 })
          })
      
   twitter.get("https://api.twitter.com/1.1/statuses/user_timeline.json").done(function(data){
       
       localStorage.setItem("tCount", data.length)
       
   })
});
            user = JSON.parse(localStorage.getItem("user"))
            color = user[0]
            mCount = user[2]
            r = user[1]
            tCount = localStorage.getItem("tCount")
            
            planet(r, color, tCount, mCount)
            // Retrieve
            } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        } 

