app.factory('Utils', function() {
	return {
		formatAmount: function(nbr, precision){
			if (!nbr) return nbr;
			nbr_s = nbr.toString();
			nbr = Number(nbr_s.replace(',', '.'));
			var isNeg = nbr < 0 ? true : false;
			var decimal; var precisionFixed;
			if (precision || nbr_s.indexOf('.') !== -1) {
				nbr_prec = nbr.toFixed(precision);
				nbrs = nbr_prec.split('.');
				decimal = Math.abs(nbrs[0]).toString();
				precisionFixed = nbrs[1];
			} else {
				decimal = Math.abs(nbr).toString();
			}
			if(RegExp(/([0-9]{4,})/g).test(decimal)){
				var decimal_reversed = decimal.split('').reverse().join('');
				var triplets = decimal_reversed.split(RegExp(/([0-9][0-9][0-9])/g));
				var triplets_clean = [];
				triplets.forEach(function(triplet){
					if (triplet !== ""){
						triplets_clean.push(triplet);
					}
				});
				var decimal_separeted = triplets_clean.join(' ');
				var decimal_ordered = decimal_separeted.split('').reverse().join('');
				decimal = decimal_ordered.trim();
			}
			decimal = isNeg ? "-" + decimal : decimal;
			return (precision || nbr_s.indexOf('.') !== -1) ? decimal + "," + precisionFixed : decimal;
		},
		to_number: function(str){
			if (!str) return str;
			nbr_s = str.toString();
			nbr = Number(nbr_s.replace(/ /g, '').replace(',', '.'));
			return nbr;
		},
		absAmount: function(str){
			if (!str) return str;
			var nbr = this.to_number(str);
			nbr = (nbr < 0) ? nbr * -1 : nbr;
			return nbr;
		},
		selectAllItems: function(boxes) {
			if(!boxes && boxes.length <= 0) return;
			boxes.forEach(function(boxe){
				boxe.checked = boxes[0].checked;
			});
		},		
		selectItem: function(boxes) {
			if(!boxes && boxes.length <= 0) return;
			boxes[0].checked = true;
			boxes.forEach(function(boxe){
				boxes[0].checked = boxes[0].checked && boxe.checked; 
			});
		}
	};
});
