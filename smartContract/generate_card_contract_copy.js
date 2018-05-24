"use strict";
// cardContractItem 数据结构构造函数
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
// cardContract 称之为合约
var CardContract = function(){
	LocalContractStorage.defineMapProperty(this,'cardContracts',{
		parse: function(text){
			return new cardContractItem(text); // 个人理解：只要调用 this.cardContracts.get(i); 就会返回一个完整的数据结构
		},
		stringify:function(o){
			return JSON.stringify(o);// 个人理解：只要调用 this.cardContracts.set(0); 就会在合约中 set 一个完整的字符串数据结构 !! 不能用 o.tostring!! , 必须用JSON.stringify
		}
	});
	LocalContractStorage.defineMapProperty(this,'nameMap'); // nameMap	
	LocalContractStorage.defineMapProperty(this,'walletMap'); // walletMap 添加数据来源使用的钱包地址	
	LocalContractStorage.defineProperty(this,'size'); // 合约属性：数据大小
}
CardContract.prototype = {
	init: function(){
		this.size = 0;
	},
	save:function(name , cardInfo){ // cardInfo
		if(name === ''){
			throw new Error('empty name');
		}
		var from = Blockchain.transaction.from;
		var index = this.size;
		// var cardInfo = JSON.parse(cardInfo); // 暂时未找到原因调用save   Call: SyntaxError: Unexpected token o in JSON at position 1
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
		// return [{"gao":"cong6"}];
		return cardItem;
	},
	// getCardList:function(){
     //    return JSON.stringify(this.cardContracts);
		// var res = this.cardContracts.get("gaocongtest");
        // return JSON.stringify([{"gao":"conghaha"}]);
	// },
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





