
function network(args){
	this.layers=[];
	this.numberoflayers=args.length;
	this.reset=
	function(){
		for(var i=0;i<this.numberoflayers;i++){
			this.layers.push(new layer(args[i],args[i+1]));
			this.layers[i].reset();
		}
	}
	this.log=
	function(){
		console.log(this.layers);
	}
	this.backpropagate=
	function(args){
			var correct=[];
			for(var i=0;i<args.length;i++){
				correct[i]=args[i];
			}
	}
	this.evaluate=
	function(args){
		for(var i=0;i<this.layers[0].nodes.length;i++){
			this.layers[0].nodes[i].value=args[i];
		}
		for(var y=1;y<this.numberoflayers;y++){
			for(var x=0;x<this.layers[y].nodes.length;x++){
				for(var z=0;z<this.layers[y-1].nodes.length;z++){
					if(this.layers[y-1].nodes[z].value>0.5){
					this.layers[y].nodes[x].value+=this.layers[y-1].nodes[z].weights[x]*this.layers[y-1].nodes[z].value;
					}
				}
			}

		}
	}
	this.draw=
	function(){
		var c=document.getElementById("nautilusvisual");
		var ctx=c.getContext("2d");
		var w=c.width;
		var h=c.height;
		ctx.clearRect(0,0,w,h);
		for(var y=0;y<this.numberoflayers;y++){
			for(var x=0;x<this.layers[y].nodes.length;x++){
				ctx.beginPath();
				ctx.lineWidth=1;
				ctx.arc(w/(this.numberoflayers+1)*(y+1),h/(this.layers[y].nodes.length+1)*(x+1),w/this.numberoflayers/10,0,2*Math.PI);

				if(this.layers[y].nodes[x].value>0.5){
					ctx.stroke();
				}else{
					ctx.fill();
				}

				if(this.numberoflayers>y+1){
					for(var z=0;z<this.layers[y+1].nodes.length;z++){
						ctx.moveTo(w/(this.numberoflayers+1)*(y+1),h/(this.layers[y].nodes.length+1)*(x+1));
						ctx.lineTo(w/(this.numberoflayers+1)*(y+2),h/(this.layers[y+1].nodes.length+1)*(1+z));
						ctx.stroke();
					}
				}

			}
		}
	}
}
function layer(num,numlayer){
	this.nodes=[];
	this.reset=
	function(){
		for(var i=0;i<num;i++){
			this.nodes.push(new node(numlayer));
			this.nodes[i].reset();
		}
	}
}
function node(num){
	this.value=0;
	this.weights=[];
	this.reset=
	function(){
		for(var i=0;i<num;i++){
			this.weights.push(Math.random());
		}
	}
	this.activate=
	function(){
			this.value=this.activationfunc(this.value);
	}
	this.activationfunc=
	function(x){
		return ((Math.pow(Math.E,x)-Math.pow(Math.E,-x))/(Math.pow(Math.E,x)+Math.pow(Math.E,-x))+1)/2;
	}
	this.activationderiv=
	function(x){
		var h=0.00000000001;
		return (this.activationfunc(x+h)-this.activationfunc(x))/h
	}
}
