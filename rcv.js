function Ballot(a){
    this.choices = a;
    this.rejectedChoices = [];
    this.currIndex = 0;
    this.currChoice = a[0];
    this.triggerNextChoice = elim => {
        this.rejectedChoices.push(elim);
        if(this.currChoice==elim){
            this.nextChoice();
        }
    };
    this.nextChoice = () => {
        do{
            this.currIndex++;
            this.currChoice = (this.currIndex<=this.choices.length) ? a[this.currIndex] : "";
        }while(this.rejectedChoices.includes(this.currChoice));
    };
}

function SingleWinnerRace(b,d){
    this.ballots = b, this.candidates = d;
    this.results = [];
    this.tally = () => {
        let c = [], e = [];
        for(let k in this.ballots){
            if(!e.includes(this.ballots[k].currChoice)){
                if(this.candidates.includes(this.ballots[k].currChoice)){
                    e.push(this.ballots[k].currChoice);
                    c.push([this.ballots[k].currChoice,1]);
                }
            }else{
                c.forEach(x => {if(x[0]==this.ballots[k].currChoice){x[1]++}});
            }
        }
        c.sort((a,b) => b[1]-a[1]);
        console.log(this.ballots);
        return c;
    };
    this.elect = () => {
        do{
            this.results.push(this.tally());
            this.ballots.forEach(x => triggerNextChoice(this.results.slice(-1)[0].slice(-1)[0][0]));
        }while(!checkWinTally(this.results.slice(-1)[0]));
        console.log(buildResArray(this.results));
        return this.results;
    };
}

let checkWinTally = tally => {
    let s = 0;
    tally.forEach(x => s+=x[1]);
    return tally[0][1]>(s/2);
};

let buildResArray = res => {
    let arr = res[0].map(x => [x[0]]);
    // console.log(arr);
    for(let a in res){
        for(let b in arr){
            for(let c in res[a]){
                if(res[a][c][0]==arr[b][0]){
                    arr[b].push(res[a][c][1]);
                }
            }
        }
    }
    return arr;
};
