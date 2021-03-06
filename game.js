var save=JSON.parse(localStorage.getItem('massSave'))
var offlineProgress=JSON.parse(localStorage.getItem('massSaveProgress'))
var player={
    mass:new Decimal(12),
    mC1:10,
    mN1:0,
    mT1:1,
    denot:"a",
}
var time=new Date().getTime()
var deno={
    a:" atomic mass units",
    g:" gram",
    k:" kilogram",
    t:" tonne"
}
if(save!=null){
    player=save
    console.log(save,player)
    player.mass=new Decimal(parseFloat(player.mass))
    if(offlineProgress!=null){
        player.mass=Decimal.mul(Decimal.div(Decimal.mul(player.mN1,player.mT1),1000),Decimal.minus(time,offlineProgress))
    }
}
function hardReset(){
    localStorage.clear()
    location.reload()
}
function buyM1(){
    if(player.mass.gte(player.mC1) && (player.mass.minus(player.mC1)).gte(2)){
        player.mass=Decimal.minus(player.mass,player.mC1)
        player.mC1=Decimal.plus(Decimal.mul(player.mC1,2),Decimal.floor(Decimal.log10(player.mC1)),player.mC1)
        player.mN1=Decimal.plus(player.mN1,1)
        if(player.mN1%2===0){
            player.mT1=player.mT1*(2**Decimal.floor(Decimal.log10(player.mass)))
        }    
    }else{
        return "no"
    }
    return "no"
}
var update=setInterval(function(){
    player.mass=Decimal.plus(player.mass,Decimal.div(Decimal.mul(player.mN1,player.mT1),100))
    if(player.denot=="a"){
        document.getElementById("mA").textContent="Mass: "+player.mass.toFixed(2)+deno.a
    }else if(player.denot=="g"){
        document.getElementById("mA").textContent="Mass: "+player.mass.toFixed(2)+deno.g
    }else if(player.denot=="k"){
        document.getElementById("mA").textContent="Mass: "+player.mass.toFixed(2)+deno.k
    }else if(player.denot=="t"){
        document.getElementById("mA").textContent="Mass: "+player.mass.toFixed(2)+deno.t
    }
    document.getElementById("mN1").textContent=player.mN1+"\xa0\xa0\xa0\xa0"
    document.getElementById("mT1").textContent=player.mT1+"x"
    document.getElementById('mC1').textContent="Cost: "+player.mC1
    document.getElementById('ps').textContent=Decimal.mul(player.mN1,player.mT1)+deno.a
    localStorage.setItem('massSave',JSON.stringify(player))
    localStorage.setItem('massSaveProgress',JSON.stringify(new Date().getTime()))
    time=new Date().getTime()
    if(time!=parseInt(localStorage.getItem('massSaveProgress'))){
        player.mass=Decimal.mul(Decimal.div(Decimal.mul(player.mN1,player.mT1),1000),Decimal.minus(time,offlineProgress))
    }
},10)
