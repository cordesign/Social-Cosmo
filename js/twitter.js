var app, user;
var mCount = 0;
var avatar = {};
var tweets = {};
var tCount = {};
var size = {};
var names = {};
var color = {};
var userDate  = {};
var img = {};
var r = {};
var city = {}
var country = {}
type=0;



function twitter(user) 
{
    window.location.hash = 0;
   
    $("#main").remove()
    $("#ui").css('opacity', '1');
    if(user) {
    var user = "screen_name=" + user;
    }
OAuth.initialize('hQkWf-Woke6ArXBFHkxpDrJo2-Q')


OAuth.popup('twitter', {cache: true}).done(function(data) {

    
    app = data;
    
       
  
    app.get('https://api.twitter.com/1.1/statuses/user_timeline.json?' + user + "&count=20").done(handleCredentials).fail(handleErro("Utilizador nao existe"));      
    
    
});

function handleErro(msg)
{
    return function()
    {
        alert(msg);
    }
    
}
function handleCredentials(data)
{
    
    if(data.length == 0)
        {
            alert('Utilizador nao existe!');
                
            }
        else {
            
             $("canvas").remove()
    r[0] = 0.1 * Math.log(data[0]["user"].followers_count);
    size[0] = data[0]["user"].followers_count;
    color[0] = data[0]["user"].profile_link_color;
    names[0] = data[0]["user"].screen_name;
    avatar[0] = data[0]["user"].profile_image_url
    
     string = data[0]["user"].location
     console.log(string)
         city[0] = ""
         country[0] = ""
            for(i = 0; i < string.length; i++){
                if(string[i] == ',') {
                    city[0] = string.slice(0, i)
                    country[0] = string.slice(i+2, string.length)
                } 
            }
            wunder(0,city[0],country[0])
            
    q = ""
    mentions = []; 
    uniqueMentions = [];
    userDate[0] = data[0]["user"].created_at.substr(data[0]["user"].created_at.length-4, data[0]["user"].created_at.length)
    
    
            
                    
           
        for(var i = 0; i < data.length; i++) {
          
                for (var j = 0; j < data[i]["entities"]["user_mentions"].length; j++) {
                   
                    mentions.push(data[i]["entities"]["user_mentions"][j]["screen_name"])
                    q += data[i]["entities"]["user_mentions"][j]["screen_name"] +","                    
                }
        tweets[0] += "<p>" + ify.clean(data[i].text) + "</p>"
             
                
            
            }
           
                tCount[0] = data[0]["user"].statuses_count
                
            $.each(mentions, function(i, el){
                if($.inArray(el, uniqueMentions) === -1 && el != names[0])       uniqueMentions.push(el); //tirar nome
            });
            
            
    
            mCount = uniqueMentions.length
              
            
    if(q.length > 0){
    app.get("https://api.twitter.com/1.1/users/lookup.json?screen_name=" + q).done(lookupMentions);
    } else {
        $(".active").html("<img href='#0' onclick='twitter(\"" + names[type] + "\")' src='" + avatar[type] + "'/>")
    $("#select").html("<a href='#'>" + names[type]) 
    $("#size").html(size[type]) 
    $("#tCount").html(tCount[type]) 
    $("#time").html(userDate[type]) 
    $(".dropdown-menu").html("");
        
        app.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + names[0]).done(lookupTweets)
        
        planet()
    }
    }
    
}
    

function lookupMentions(data)
{
  
                   
                for(i = 1; i <= mCount; i++) {
                   
                    r[i] = 0.1 * Math.log(data[i-1].followers_count);
                    size[i] = data[i-1].followers_count;
                    color[i] = data[i-1].profile_link_color;
                    avatar[i] = data[i-1].profile_image_url;
                    names[i] = data[i-1].screen_name
                    tCount[i] = data[i-1].statuses_count
                    userDate[i] = data[i-1].created_at.substr(data[i-1].created_at.length-4, data[i-1].created_at.length)


                    
                    
                    
                    
                    string = data[i-1].location
                    console.log(string)
                    
                    
            for(j = 1; j< string.length; j++){
                console.log(string)
                
                if(string[j-1] == ',') {
                    city[i] = string.slice(0, j-1)
                    console.log(city)
                    country[i] = string.slice(j+1, string.length)
            }
                
                    }    
                     wunder(i,city[i],country[i])  
                }
    
     $(".active").html("<img href ='#0' onclick='twitter(\"" + names[type] + "\")' src='" + avatar[type] + "'/>")
    $("#select").html("<a href='#'>" + names[type]) 
    $("#size").html(size[type]) 
    $("#tCount").html(tCount[type]) 
    $("#time").html(userDate[type])
    $("#temp").html(temp_c[type])
           
    $(".dropdown-menu").html("");
    
    for(i = 1; i<= mCount; i++) {
        
        $(".dropdown-menu").append("<li><a style='color: #" + color[i] +  "' href='#" + i + "'>" + names[i]+"</li>")
        
    }
     
    
    
     app.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + names[type] + "&count=20").done(lookupTweets);
    
                planet()
               

}



    $(window).on('hashchange', function(e) {  
        
            type = window.location.hash.substr(1);
        
        
        $("#temp").html(temp_c[type])
        
        app.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + names[type] + "&count=20").done(lookupTweets);
        
        
    })

function lookupTweets(data) {
    tweets[type] = ""
                 for(i = 1; i<=data.length; i++) {
                     
                     tweets[type] += "<p>" + ify.clean(data[i-1].text) + "</p>";
                     
                     
                 }
    
    
    
    $("#twits").html(tweets[type]) 
    
    
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
          return '<a class="twtr-atreply" href="#0" onclick="twitter(\'' + username + '\')">@' + username + '</a>';
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


    
    
}