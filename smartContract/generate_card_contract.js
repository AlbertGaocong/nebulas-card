"use strict";
var cardContractItem = function(text){
	if(text){
		var obj = JSON.parse(text);
		this.name = obj.name;
		this.mobile = obj.mobile;
		this.companyName = obj.companyName;
		this.job = obj.job;
		this.email = obj.email;
		this.briefIntroduction = obj.briefIntroduction;
	}else{
		this.name = '';
		this.mobile = '';
		this.companyName = '';
		this.job = '';
		this.email = '';
		this.briefIntroduction = '';
	}
}
cardContractItem.prototype = {
	toString: function(){
		return JSON.stringify(this);
	}
}
var CardContract = function(){
	LocalContractStorage.defineMapProperty(this,'cardContracts',{
		parse: function(text){
			return new cardContractItem(text);
		},
		stringify:function(o){
			return JSON.stringify(o);
		}
	});
	LocalContractStorage.defineMapProperty(this,'nameMap');
	LocalContractStorage.defineMapProperty(this,'walletMap');
	LocalContractStorage.defineProperty(this,'size');
}
CardContract.prototype = {
	init: function(){
		this.size = 0;
	},
	save:function(name , cardInfo){
		if(name === ''){
			throw new Error('empty name');
		}
		var from = Blockchain.transaction.from;
		var index = this.size;
		this.nameMap.set(index,name);
		this.walletMap.set(index,from);
		this.cardContracts.set(name,cardInfo);
		this.size +=1;
	},
	getCard:function(name){
		name = name.trim();
		if(name === ''){
			throw new Error('empty name');
		}
		var cardItem = this.cardContracts.get(name);
		if(!cardItem){
			throw new Error('card is not exist');
		}
		return cardItem;
	},
    getCardList:function(){
		var size = this.size;
		var result = [];
		for(var i=0; i< this.size; i++){
			var name = this.nameMap.get(i);
			var auth = this.walletMap.get(i);
			var card = this.cardContracts.get(name);
			var obj = {
				name: name,
				auth: auth,
				card: card
			};
			result.push(obj);
		}
		return result;
	}
}
module.exports  = CardContract;





