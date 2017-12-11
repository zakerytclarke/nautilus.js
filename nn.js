
function network(args){
	this.layers=[];
	this.numberoflayers=args.length;
	this.reset=
	function(){
		for(i=0;i<this.numberoflayers;i++){
			this.layers.push(new layer(args[i],args[i+1]));
			this.layers[i].reset();
		}
	}
}
function layer(num,numlayer){
	this.nodes=[];
	this.reset=
	function(){
		for(i=0;i<num;i++){
			this.nodes.push(new node(numlayer));
			this.nodes[i].reset();
		}
	}
}
function node(num){
	this.weights=[];
	this.reset=
	function(){
		for(i=0;i<num;i++){
			this.weights.push(0);
		}
	}
}
