function Ballot(a){
    this.choices = a;
    this.rejectedChoices = [];
    this.curr = a[0];
    this.currIndex = 0;
    this.elimCand = elim => {
        this.rejectedChoices.push(elim);
        if(this.curr==elim){
            do{
                this.currIndex++;
                this.curr = (this.currIndex<=this.choices.length) ? a[this.currIndex] : "";
            }while(this.rejectedChoices.includes(this.curr));
        }
    };
}

function SingleWinnerRace(b,d){
    this.ballots = b, this.cands = d;
    this.res = [];
    this.tally = () => {
        let c = [], e = [];
        for(let k in this.ballots){
            let currVote = this.ballots[k].curr;
            if(!e.includes(currVote)){
                if(this.cands.includes(currVote)){
                    e.push(currVote);
                    c.push([currVote,1]);
                }
            }else{
                c.forEach(x => {if(x[0]==currVote){x[1]++}});
            }
        }
        c.sort((a,b) => b[1]-a[1]);
        console.log(this.ballots);
        return c;
    };
    this.elect = () => {
        do{
            this.res.push(this.tally());
            this.ballots.forEach(x => x.elimCand(this.res.slice(-1)[0].slice(-1)[0][0]));
        }while(!checkWinTally(this.res.slice(-1)[0]));
        console.log(buildOutput(this.res));
        return this.res;
    };
}

let checkWinTally = tally => {
    let s = 0;
    tally.forEach(x => s+=x[1]);
    return tally[0][1]>(s/2);
};

let buildOutput = r => {
    let arr = r[0].map(x => [x[0]]);
    // console.log(arr);
    for(let a in r){
        for(let b in arr){
            for(let c in r[a]){
                if(r[a][c][0]==arr[b][0]){
                    arr[b].push(r[a][c][1]);
                }
            }
        }
    }
    return arr;
};
