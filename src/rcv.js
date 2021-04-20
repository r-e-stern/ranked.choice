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
        return c;
    };
    this.elect = () => {
        do{
            this.res.push(this.tally());
            this.ballots.forEach(x => x.elimCand(this.res.slice(-1)[0].slice(-1)[0][0]));
        }while(!checkWinTally(this.res.slice(-1)[0]));
        return this.buildOutput();
    };
    this.buildOutput = () => this.res[0].map(y => [y[0], ...this.res.map(x => x.reduce((a,c) => c[0]==y[0] ? c[1] : a, 0))])
                                        .sort((a,b) => b.slice(-1) - a.slice(-1));
    // adapted from https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array#answer-63080907
    this.makeTableHTML = () => `${this.buildOutput().reduce((c, o) => c += `<tr>${o.reduce((c, d, i) => (c += `<${i==0 ? "th  scope='row'" : "td"}>${d===0 ? "" : d}</td>`), '')}</tr>`, '')}`;
}

let checkWinTally = tally => {
    let s = 0;
    tally.forEach(x => s+=x[1]);
    return tally[0][1]>(s/2);
};