let election;

$(document).ready(function(){
    $(".results").hide();
});

let run_elec = () => {
    $(".results *").show();
    $(".results").hide();
    $("table").empty();
    let parsedCands = Papa.parse($("input").val());
    let parsedBallots = Papa.parse($("textarea").val());
    if(parsedBallots.errors.length + parsedCands.errors.length == 0){
        election = new SingleWinnerRace(parsedBallots.data.map(x => new Ballot(x)),parsedCands.data[0])
        election.elect();
        console.log(election.buildOutput());
        $("#res-target").append(election.makeTableHTML());
        $(".results").show();
        $(".alert-danger").hide();
    }else{
        $(".results").show();
        $(".alert-success").hide();
    }
}