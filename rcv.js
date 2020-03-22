function Ballot(a){
    this.rejectedChoices = [];
    this.choices = a;
    this.currIndex = 0;
    this.weight = 1;
    this.currChoice = a[0];
    this.triggerNextChoice = function(elim){
        this.rejectedChoices.push(elim);
        if(this.currChoice==elim){
            this.nextChoice();
        }
    };
    this.nextChoice = function(){
        var valid = false;
        while(!valid){
            this.currIndex++;
            if(this.currIndex<=this.choices.length){
                this.currChoice = a[this.currIndex];
            }else{
                this.currChoice = "";
            }
            if(!this.rejectedChoices.includes(this.currChoice)){
                valid = true;
            }
        }
    };
    this.splitBallot = function(percent){
        this.weight = this.weight*(1-percent);
        var c = new Ballot(a.slice(0));
        c.rejectedChoices = this.rejectedChoices.slice(0);
        c.currIndex = this.currIndex;
        c.weight = this.weight * percent;
        c.currChoice = this.currChoice;
        this.triggerNextChoice = function(elim){};
        return c;
    }
}

function Race(b,d){
    this.ballots = b;
    this.candidates = d;
    this.results = [];
}

function SingleWinnerRace(b,d){
    Race.call(this,b,d);
    this.tally = function(){
        var c = [];
        var e = [];
        for(var k in this.ballots){
            if(!e.includes(this.ballots[k].currChoice)){
                if(this.candidates.includes(this.ballots[k].currChoice)){
                    e.push(this.ballots[k].currChoice);
                    c.push([this.ballots[k].currChoice,1]);
                }
            }else{
                for(var o in c){
                    if(c[o][0]==this.ballots[k].currChoice){
                        c[o][1]++;
                    }
                }
            }
        }
        c.sort(function(a,b){return b[1]-a[1];});
        console.log(c);
        return c;
    };
    this.elect = function(){
        var winner = false;
        while(!winner){
            this.results.push(this.tally());
            if(checkWinTally(this.results.slice(-1)[0])){
                winner = true;
            }
            for(var a in this.ballots){
                this.ballots[a].triggerNextChoice(this.results.slice(-1)[0].slice(-1)[0][0]);
            }
        }
        return this.results;
    };
}

function checkWinTally(tally){
    var s = 0;
    for(var a in tally){
        s+=tally[a][1];
    }
    return tally[0][1]>(s/2);
}

function buildResArray(res){
    var arr = [];
    for(var a in res[0]){
        arr.push([res[0][a][0]]);
    }
    for(var a in res){
        for(var b in arr){
            for(var c in res[a]){
                if(res[a][c][0]==arr[b][0]){
                    arr[b].push(res[a][c][1]);
                }
            }
        }
    }
    return arr;
}
