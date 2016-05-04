var app;
var mCount
var avatar = {};
var tweets = {};
var tCount = {};
var size = {};
var names = {};
var color = {};
var userDate  = {};
var img = {};
var r = {};
type=0;
  
OAuth.initialize('hQkWf-Woke6ArXBFHkxpDrJo2-Q')


OAuth.popup('twitter', {cache: true}).done(function(data) {

    
    app = data;
    
       
    app.get('https://api.twitter.com/1.1/account/verify_credentials.json').done(handleCredentials);      
    
    
});


function handleCredentials(data)
{
    r[0] = 0.1 * Math.log(data.followers_count);
    size[0] = data.followers_count;
    color[0] = data.profile_link_color;
    names[0] = data.screen_name;
    
    avatar[0] = data.profile_image_url
    
    
    q = ""
    mentions = []; 
    uniqueMentions = [];
    userDate[0] = data.created_at.substr(data.created_at.length-4, data.created_at.length)
     
    
    app.get("https://api.twitter.com/1.1/statuses/user_timeline.json").done(handleMentions);
}

function handleMentions(data)
{
    for(var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i]["entities"]["user_mentions"].length; j++) {
                    mentions.push(data[i]["entities"]["user_mentions"][j]["screen_name"])
                    q += data[i]["entities"]["user_mentions"][j]["screen_name"] +","                    
                }
        tweets[0] += "<p>" + ify.clean(data[i].text) + "</p>"
        console.log(data)
            }
                tCount[0] = data[0]["user"].statuses_count
                
            $.each(mentions, function(i, el){
                if($.inArray(el, uniqueMentions) === -1)       uniqueMentions.push(el); //tirar pronto nome
            });
            mCount = uniqueMentions.length
              
            
    
    app.get("https://api.twitter.com/1.1/users/lookup.json?screen_name=" + q).done(lookupMentions);
    
}

function lookupMentions(data)
{
    console.log(data)
                   
                for(i = 1; i <= mCount; i++) {
                   
                    r[i] = 0.1 * Math.log(data[i-1].followers_count);
                    size[i] = data[i-1].followers_count;
                    color[i] = data[i-1].profile_link_color;
                    avatar[i] = data[i-1].profile_image_url;
                    names[i] = data[i-1].screen_name
                    tCount[i] = data[i-1].statuses_count
                    userDate[i] = data[i-1].created_at.substr(data[i-1].created_at.length-4, data[i-1].created_at.length)
                     min = -3;
        max = 3;
                    
                }
    $(".active").html("<img src='" + avatar[type] + "'/>")
    $("#select").html("<a href='#'>" + names[type]) 
    $("#size").html(size[type]) 
    $("#tCount").html(tCount[type]) 
    $("#time").html(userDate[type]) 
    
    for(i = 1; i<= mCount; i++) {
        $(".dropdown-menu").append("<li><a style='color: #" + color[i] +  "' href='#" + i + "'>" + names[i]+"</li>")
    }
    
     app.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + names[type] + "&count=200").done(lookupTweets);
    
                planet()
               
    

}


    $(window).on('hashchange', function(e) {  
        
            type = window.location.hash.substr(1);
        
        app.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + names[type] + "&count=200").done(lookupTweets);
        
        
    })

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
    tweets[type] = ""
                 for(i = 1; i<=data.length; i++) {
                     
                     tweets[type] += "<p>" + ify.clean(data[i-1].text) + "</p>";
                     
                     
                 }
       
    
    
    
    $("#twits").html(tweets[type]) 
      
    
                 }
