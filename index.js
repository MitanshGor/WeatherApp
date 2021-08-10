
var apikey;

var url;
var respData;

var polData=[];
var pollutionUrl;

var alertData=[];
var alertUrl;


var list=["latitude","longitude",
        "country","city",
        "rise","set",
        "parameter","desciption","icon",
        "min","current","max",
        "pressure","visibility","humidity",
        "speed","degree","cloud",
        "CO","NO",
        "NO2","O3","SO2",
        "PM25","PM10",
        "NH3",
        "Name","Event","startDate","endDate","Description"]
var values;

function setDate(d)
{
    
    d=new Date(d*1000);
   return 	d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
}

document.addEventListener('DOMContentLoaded', function() {
    apikey= "3265874a2c77ae4a04bb96236a642d2f";
    document.getElementById("invalid").style.display="none";
    


    document.getElementById("heading1").style.display="none";
    document.getElementById("heading2").style.display="none";
    document.getElementById("heading3").style.display="none";
    
    document.getElementById("alerts").style.display="none";
    document.getElementById("pollution").style.display="none";
    document.getElementById("weather").style.display="none";
    
    document.getElementById("invalid").style.display="none";

     url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;


}, false);


// function setWeatherData()
// {
//     document.getElementById[list[1]]
// }
// function setPollutionData()
// {

// }
// function setAlertData()
// {

// }
// function setMapData()
// {

// }


async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    respData = await resp.json();


    
    pollutionUrl=(lat,long)=>`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${apikey}`;
    const lista=await fetch(pollutionUrl(respData["coord"]["lat"],respData["coord"]["lon"]) , { origin: "cors" });
    polData = await lista.json();


    alertUrl=(lat,long)=>`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apikey}`;
    const listaa=await fetch(alertUrl(respData["coord"]["lat"],respData["coord"]["lon"]) , { origin: "cors" });
    alertData = await (listaa).json();

    console.log("-----------------------------------------------------------")
    console.log(respData);
    console.log(polData);
    console.log(alertData);
    console.log("-----------------------------------------------------------")
    

    if(respData['cod']==200)
    {





        document.getElementById("heading1").style.display="block";
        document.getElementById("heading2").style.display="block";
        document.getElementById("heading3").style.display="block";
        
        document.getElementById("alerts").style.display="block";
        document.getElementById("pollution").style.display="block";
        document.getElementById("weather").style.display="block";
        
        document.getElementById("invalid").style.display="none";
   
        console.log("-------------------------- values : ")
        
        values=[
            respData["coord"]["lat"],respData["coord"]["lon"],
            respData["sys"]["country"]?respData["sys"]["country"]:"",respData["name"],
            setDate(respData["sys"]["sunrise"]),setDate(respData["sys"]["sunset"]),
            respData["weather"][0]["main"],respData["weather"][0]["description"],"https://openweathermap.org/img/wn/"+respData["weather"][0]["icon"]+"@2x.png" , 
            respData["main"]["temp_min"] , respData["main"]["temp"] , respData["main"]["temp_max"], 
            respData["main"]["pressure"], respData["main"]["humidity"], respData["visibility"],
            respData["wind"]["speed"],respData["wind"]["deg"],respData["clouds"]["all"],
            polData["list"][0]["components"]["co"]+"μg/m3" , polData["list"][0]["components"]["no"]+"μg/m3",
            polData["list"][0]["components"]["no2"]+"μg/m3" , polData["list"][0]["components"]["o3"]+"μg/m3", polData["list"][0]["components"]["s02"]+"μg/m3",
            polData["list"][0]["components"]["pm2_5"]+"μg/m3", polData["list"][0]["components"]["pm10"]+"μg/m3",
            polData["list"][0]["components"]["nh3"]+"μg/m3",
            alertData["alerts"]?alertData["alerts"][0]["sender_name"]:"",
            alertData["alerts"]?alertData["alerts"][0]["event"]+" "+(alertData["alerts"][0]["tag"]?+" ( "+alertData["alerts"][0]["tag"][0]+" ) ":"") +"":"",
            alertData["alerts"]?setDate(alertData["alerts"][0]["start"]):"",
            alertData["alerts"]?setDate(alertData["alerts"][0]["start"]):"",
            alertData["alerts"]?alertData["alerts"][0]["description"]:"No Description"
        ]

        console.log("-------------------------- values : "+values.length)
        console.log(values)

        if( !alertData["alerts"])
        {
            document.getElementById("alerts").style.display="none";
            document.getElementById("heading3").style.display="none";
        }
        for(var i=0;i<31;i++)
        {
            if(list[i]!="icon")
            {
                document.getElementById(list[i]).innerHTML=values[i]
            }
            else{
                console.log(list[i])
                document.getElementById(list[i]).src=values[i]
            }
        }
   
    }
    else if(respData['cod']==404)
    {
        document.getElementById("heading1").style.display="none";
        document.getElementById("heading2").style.display="none";
        document.getElementById("heading3").style.display="none";
        
        document.getElementById("alerts").style.display="none";
        document.getElementById("pollution").style.display="none";
        document.getElementById("weather").style.display="none";
        
        document.getElementById("invalid").style.display="flex";





    }

    // addWeatherToPage(respData);
}


document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const city = document.getElementById("locationName").value;
    console.log("spfivnalsfgnlasfjgnlasfng")
    if (city) {
   
         getWeatherByLocation(city);
         console.log("spfivnalsfgnlasfjgnlasfng CITY")
    
        
        document.getElementById("heading1").style.display="block";
        document.getElementById("heading2").style.display="block";
        document.getElementById("heading3").style.display="block";
        
        document.getElementById("alerts").style.display="block";
        document.getElementById("pollution").style.display="block";
        document.getElementById("weather").style.display="block";
        
        document.getElementById("invalid").style.display="none";
        
    
    }
    else{
        console.log("spfivnalsfgnlasfjgnlasfng")
    
        document.getElementById("heading1").style.display="none";
        document.getElementById("heading2").style.display="none";
        document.getElementById("heading3").style.display="none";
        
        document.getElementById("alerts").style.display="none";
        document.getElementById("pollution").style.display="none";
        document.getElementById("weather").style.display="none";
        
        document.getElementById("invalid").style.display="flex";
        
        
    }
});
