var app;
var mCount, tCount, user;
  
OAuth.initialize('eEbjYcFK9aW8RzozGMH9cTwAhPo')

OAuth.popup('twitter', {cache: true}).done(function(data) {
    app = data;
    
    app.get('https://api.twitter.com/1.1/account/verify_credentials.json').done(handleCredentials);      
    
    
});


function handleCredentials(data)
{
    r = 0.1 * Math.log(data.followers_count);
    color = data.profile_link_color;
    name = data.name;
    
    q = ""
    mentions = []; 
    uniqueMentions = [];
    
    app.get("https://api.twitter.com/1.1/statuses/user_timeline.json").done(handleMentions);
}

function handleMentions(data)
{
    for(var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i]["entities"]["user_mentions"].length; j++) {
                    mentions.push(data[i]["entities"]["user_mentions"][j]["screen_name"])
                    q += data[i]["entities"]["user_mentions"][j]["screen_name"] +","
                    localStorage.setItem("q", q);
                    localStorage.setItem("tCount", data.length)
                }
            }
                
            $.each(mentions, function(i, el){
                if($.inArray(el, uniqueMentions) === -1) uniqueMentions.push(el); //tirar pronto nome
            });
            
            localStorage.setItem("mCount", uniqueMentions.length)
            localStorage.setItem("user", JSON.stringify([name, color, r]));
    
    app.get("https://api.twitter.com/1.1/users/lookup.json?screen_name=" + localStorage.getItem("q")).done(lookupMentions);
}

function lookupMentions(data)
{
                    mCount = localStorage.getItem("mCount")
                for(i = 0; i < mCount; i++) {
                    console.log(data)
                    r2 = 0.1 * Math.log(data[i].followers_count);
                    color2 = data[i].profile_link_color;
                    name = data[i].name;
                    
                     min = -3;
        max = 3;

        
        x2 = Math.random() * (max - min) + min
        y2 = Math.random() * (max - min) + min
        z2 = Math.random() * (max - min) + min
        
                    localStorage.setItem(i, JSON.stringify([name, r2, color2, x2, y2, z2]));
                } 
                user = JSON.parse(localStorage.getItem("user"))
                color = user[1]
                r = user[2]
                mCount = localStorage.getItem("mCount")
                tCount = localStorage.getItem("tCount")
                planet(r, color, tCount, mCount)
}