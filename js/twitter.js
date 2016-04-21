var app;
var mCount, tCount, user;
  
OAuth.initialize('cEqJYbWSBFatbZu-UWFggR1XKc4')


OAuth.popup('twitter', {cache: true}).done(function(data) {

    
    app = data;
    
       
    app.get('https://api.twitter.com/1.1/account/verify_credentials.json').done(handleCredentials);      
    
    
});


function handleCredentials(data)
{
    r = 0.1 * Math.log(data.followers_count);
    size = data.followers_count;
    color = data.profile_link_color;
    name = data.screen_name;
    
    q = ""
    mentions = []; 
    uniqueMentions = [];
    
    $("#time").append(data.created_at.substr(data.created_at.length-4, data.created_at.length))
    
    app.get("https://api.twitter.com/1.1/statuses/user_timeline.json").done(handleMentions);
}

function handleMentions(data)
{
    for(var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i]["entities"]["user_mentions"].length; j++) {
                    mentions.push(data[i]["entities"]["user_mentions"][j]["screen_name"])
                    q += data[i]["entities"]["user_mentions"][j]["screen_name"] +","
                    localStorage.setItem("q", q);
                    
                    
                }
            }
                tCount = data[0]["user"].statuses_count
            $.each(mentions, function(i, el){
                if($.inArray(el, uniqueMentions) === -1) uniqueMentions.push(el); //tirar pronto nome
            });
            localStorage.setItem("mCount", uniqueMentions.length)
            localStorage.setItem("0", JSON.stringify([name, color, r, size, tCount,time]));
            $("#tCount").html(JSON.parse(localStorage.getItem("0"))[4]) 
    
    app.get("https://api.twitter.com/1.1/users/lookup.json?screen_name=" + localStorage.getItem("q")).done(lookupMentions);
    
}

function lookupMentions(data)
{
    console.log(data)
                    mCount = localStorage.getItem("mCount")
                for(i = 0; i < mCount; i++) {
                   
                    r2 = 0.1 * Math.log(data[i].followers_count);
                    size2 = data[i].followers_count;
                    color2 = data[i].profile_link_color;
                    name = data[i].screen_name;
                    
                    twit = data[i].description;
                    tCount2 = data[i].statuses_count
                    console.log(tCount2)
                     min = -3;
        max = 3;

        
        x2 = Math.random() * (max - min) + min
        y2 = Math.random() * (max - min) + min
        z2 = Math.random() * (max - min) + min
        
                    localStorage.setItem(i+1, JSON.stringify([name, color2, r2, size2, tCount2, twit, x2, y2, z2]));
                    
                } 
    
                user = JSON.parse(localStorage.getItem("0"))
                color = user[1]
                r = user[2]
                size = user[3]
                mCount = localStorage.getItem("mCount")
                planet(r, color, tCount, mCount)
                $("#size").append(size);

        
    $(window).on('hashchange', function(e) {  
        
            type = window.location.hash.substr(1);
        
        app.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + JSON.parse(localStorage.getItem(type))[0] + "&count=200").done(lookupTweets);
        
        
    })
    

}

ify =  {
      link: function(tweet) {
        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
        });
      },

      at: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
        });
      },

      list: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
        });
      },

      hash: function(tweet) {
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
        });
      },

      clean: function(tweet) {
        return this.hash(this.at(this.list(this.link(tweet))));
      }
    } // ify


function lookupTweets(data) {
                 console.log(data)
                 $("#twits").html("<p></p>")
                 for(i = 0; i<data.length; i++) {
                     
                     $("#twits").append("<p>" + ify.clean(data[i].text) + "</p>")
                     
                 }
                    type = window.location.hash.substr(1);
               
                   $("#select").html("<a href='#'>" + JSON.parse(localStorage.getItem(type))[0]) 
                    $("#size").html(JSON.parse(localStorage.getItem(type))[3]) 
                    $("#tCount").html(JSON.parse(localStorage.getItem(type))[4]) 
               date = data[type].created_at;
                $("#time").html(date.substr(date.length-4,date.length))
    
                 }
